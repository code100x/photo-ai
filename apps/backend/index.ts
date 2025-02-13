import { fal } from "@fal-ai/client";
import express from "express";
import { TrainModel, GenerateImage, GenerateImagesFromPack } from "common/types";
import { prismaClient } from "db";
import { S3Client } from "bun";
import { FalAIModel } from "./models/FalAIModel";
import cors from "cors";
import { authMiddleware } from "./middleware";
import Razorpay from "razorpay";
import dotenv from "dotenv";
import { generatedSignature } from "./utils";

dotenv.config()

const PORT = process.env.PORT || 8080;

const falAiModel = new FalAIModel();

const app = express();
app.use(cors());
app.use(express.json());

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || "testkey",
  key_secret: process.env.RAZORPAY_KEY_SECRET || "test-secret"
})

app.post("/razorpay/verify", authMiddleware, async (req, res) => {
  const { orderCreationId, razorpayPaymentId, razorpaySignature } = req.body;

  const signature = generatedSignature(orderCreationId, razorpayPaymentId);

  if (signature !== razorpaySignature) {
    console.error("Signature mismatch!");

    try {
      await prismaClient.payment.update({
        where: { providerId: orderCreationId},
        data: { status: 'failed', updatedAt: new Date() }
      });

      res.status(401).json({ message: 'Payment verification failed', isOk: false });
    } catch (error) {
      console.error("Error updating payment status:", error);
      res.status(500).json({ message: 'Failed to update payment status' });
    }
    return;
  }

  try {
    await prismaClient.payment.update({
      where: { providerId: orderCreationId },
      data: { status: 'paid', updatedAt: new Date() }
    });

    const payment = await prismaClient.payment.findUnique({ where: { providerId: orderCreationId } });
    if (payment) {
      await prismaClient.user.update({
        where: { id: req.userId },
        data: { credits: { increment: payment.amount } }
      });

      const creditLogs = await prismaClient.creditLog.create({
        data : {
          userId : req.userId!,
          amount : payment.amount,
          type : "credit"
        }
      })  
    }
    
    res.status(200).json({ message: 'Payment verified successfully', isOk: true });
  } catch (error) {
    console.error("Error in payment verification:", error);
    res.status(500).json({ message: 'Failed to verify payment', isOk: false });
  }
});

app.post("/razorpay/create-order", authMiddleware, async (req, res) => {
  const { amount, currency, receipt } = req.body;

  if (!amount || !currency || !receipt) {
    res.status(400).json({ error: "Missing required fields" });
    return;
  }

  try {
    const options = {
      amount: amount * 100,
      currency: currency,
      receipt: receipt.toString(),
      payment_capture: 1
    };

    const order = await razorpay.orders.create(options);
    console.log("Created order:", order);

    const payment = await prismaClient.payment.create({
      data: {
        userId: req.userId!, 
        amount: amount,
        currency: currency,
        provider: 'razorpay',
        providerId: order.id,
        receipt: receipt,
        status: 'pending',
      },
    });

    res.status(200).json({ order, payment });
  } catch (error) {
    console.error("Razorpay Error:", error);
    res.status(500).json({ error: "Payment order creation failed" });
  }
});

app.get("/pre-signed-url", async (req, res) => {
  const key = `models/${Date.now()}_${Math.random()}.zip`;
  const url = S3Client.presign(key, {
    method: "PUT",
    accessKeyId: process.env.S3_ACCESS_KEY,
    secretAccessKey: process.env.S3_SECRET_KEY,
    endpoint: process.env.ENDPOINT,
    bucket: process.env.BUCKET_NAME,
    expiresIn: 60 * 5,
    type: "application/zip"
  })

  res.json({
    url,
    key
  })
})

app.post("/ai/training", authMiddleware, async (req, res) => {
  const parsedBody = TrainModel.safeParse(req.body)
  console.log(req.userId);
  if (!parsedBody.success) {
    res.status(411).json({
      message: "Input incorrect"
    })
    return
  }

  const { request_id, response_url } = await falAiModel.trainModel(parsedBody.data.zipUrl, parsedBody.data.name);

  const data = await prismaClient.model.create({
    data: {
      name: parsedBody.data.name,
      type: parsedBody.data.type,
      age: parsedBody.data.age,
      ethinicity: parsedBody.data.ethinicity,
      eyeColor: parsedBody.data.eyeColor,
      bald: parsedBody.data.bald,
      userId: req.userId!,
      zipUrl: parsedBody.data.zipUrl,
      falAiRequestId: request_id,
    }
  })

  res.json({
    modelId: data.id
  })
})

app.post("/ai/generate", authMiddleware, async (req, res) => {
  const parsedBody = GenerateImage.safeParse(req.body)

  if (!parsedBody.success) {
    res.status(411).json({

    })
    return;
  }

  const model = await prismaClient.model.findUnique({
    where: {
      id: parsedBody.data.modelId
    }
  })

  if (!model || !model.tensorPath) {
    res.status(411).json({
      message: "Model not found"
    })
    return;
  }

  console.log("ji there")
  const { request_id, response_url } = await falAiModel.generateImage(parsedBody.data.prompt, model.tensorPath);

  const data = await prismaClient.outputImages.create({
    data: {
      prompt: parsedBody.data.prompt,
      userId: req.userId!,
      modelId: parsedBody.data.modelId,
      imageUrl: "",
      falAiRequestId: request_id
    }
  })

  res.json({
    imageId: data.id
  })
})

app.post("/pack/generate", authMiddleware, async (req, res) => {
  const parsedBody = GenerateImagesFromPack.safeParse(req.body)

  if (!parsedBody.success) {
    res.status(411).json({
      message: "Input incorrect"
    });
    return; // Ensure the function exits here
  }

  const prompts = await prismaClient.packPrompts.findMany({
    where: {
      packId: parsedBody.data.packId
    }
  });

  const model = await prismaClient.model.findFirst({
    where: {
      id: parsedBody.data.modelId
    }
  });

  if (!model) {
    res.status(411).json({
      "message": "Model not found"
    });
    return; // Ensure the function exits here
  }

  let requestIds: { request_id: string }[] = await Promise.all(prompts.map((prompt) => falAiModel.generateImage(prompt.prompt, model.tensorPath!)));

  const images = await prismaClient.outputImages.createManyAndReturn({
    data: prompts.map((prompt, index) => ({
      prompt: prompt.prompt,
      userId: req.userId!,
      modelId: parsedBody.data.modelId,
      imageUrl: "",
      falAiRequestId: requestIds[index].request_id
    }))
  });

  res.json({
    images: images.map((image) => image.id)
  });
});

app.get("/pack/bulk", async (req, res) => {
  const packs = await prismaClient.packs.findMany({})

  res.json({
    packs
  })
})

app.get("/image/bulk", authMiddleware, async (req, res) => {
  const ids = req.query.ids as string[]
  const limit = req.query.limit as string ?? "100";
  const offset = req.query.offset as string ?? "0";

  const imagesData = await prismaClient.outputImages.findMany({
    where: {
      id: { in: ids },
      userId: req.userId!,
      status: {
        not: "Failed"
      }
    },
    orderBy: {
      createdAt: 'desc'
    },
    skip: parseInt(offset),
    take: parseInt(limit)
  })

  res.json({
    images: imagesData
  })
})

app.get("/models", authMiddleware, async (req, res) => {
  const models = await prismaClient.model.findMany({
    where: {
      OR: [{ userId: req.userId }, { open: true }]
    }
  })

  res.json({
    models
  })
})

app.post("/fal-ai/webhook/train", async (req, res) => {
  const requestId = req.body.request_id as string;

  const result = await fal.queue.result("fal-ai/flux-lora", {
    requestId
  });

  const { imageUrl } = await falAiModel.generateImageSync(result.data.diffusers_lora_file.url)

  await prismaClient.model.updateMany({
    where: {
      falAiRequestId: requestId
    },
    data: {
      trainingStatus: "Generated",
      //@ts-ignore
      tensorPath: result.data.diffusers_lora_file.url,
      thumbnail: imageUrl
    }
  })

  res.json({
    message: "Webhook received"
  })
})

app.post("/fal-ai/webhook/image", async (req, res) => {
  console.log("fal-ai/webhook/image")
  console.log(req.body)
  // update the status of the image in the DB
  const requestId = req.body.request_id;

  if (req.body.status === "ERROR") {
    res.status(411).json({})
    prismaClient.outputImages.updateMany({
      where: {
        falAiRequestId: requestId
      },
      data: {
        status: "Failed",
        imageUrl: req.body.payload.images[0].url
      }
    })
    return;
  }

  await prismaClient.outputImages.updateMany({
    where: {
      falAiRequestId: requestId
    },
    data: {
      status: "Generated",
      imageUrl: req.body.payload.images[0].url
    }
  })

  res.json({
    message: "Webhook received"
  })
})



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});