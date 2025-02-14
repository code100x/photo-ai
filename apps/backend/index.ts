import { fal } from "@fal-ai/client";
import express from "express";
import { TrainModel, GenerateImage, GenerateImagesFromPack } from "common/types";
import { prismaClient } from "db";
import { S3Client } from "bun";
import { FalAIModel } from "./models/FalAIModel";
import cors from "cors";
import { authMiddleware } from "./middleware";

const PORT = process.env.PORT || 8080;

const falAiModel = new FalAIModel();

const app = express();
app.use(cors());
app.use(express.json());

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
    const {request_id, response_url} = await falAiModel.generateImage(parsedBody.data.prompt, model.tensorPath);

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
        })
        return;
    }
    
    const prompts = await prismaClient.packPrompts.findMany({
        where: {
            packId: parsedBody.data.packId
        }
    })

    const model = await prismaClient.model.findFirst({
      where: {
        id: parsedBody.data.modelId
      }
    })

    if (!model) {
      return res.status(411).json({
        "message": "Model not found"
      })
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
    })

    res.json({
        images: images.map((image) => image.id)
    })
    
})

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

app.get("/models", authMiddleware, async(req, res) => {
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