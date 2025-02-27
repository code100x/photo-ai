import { prismaClient } from "db";
import { Router } from "express";
import { Webhook } from "svix";
import { fal } from "@fal-ai/client";
import { FalAIModel } from "../models/FalAIModel";

export const router = Router();

const IMAGE_GEN_CREDITS = 1;
const TRAIN_MODEL_CREDITS = 20;

const falAiModel = new FalAIModel();

/**
 * POST api/webhook/clerk
 * Clerk will hit this endpoint when user is created, updated or deleted
 */
router.post("/clerk", async (req, res) => {
  const SIGNING_SECRET =
    process.env.SIGNING_SECRET 

  if (!SIGNING_SECRET) {
    throw new Error(
      "Error: Please add SIGNING_SECRET from Clerk Dashboard to .env"
    );
  }

  const wh = new Webhook(SIGNING_SECRET);
  const headers = req.headers;
  const payload = req.body;

  const svix_id = headers["svix-id"];
  const svix_timestamp = headers["svix-timestamp"];
  const svix_signature = headers["svix-signature"];

  if (!svix_id || !svix_timestamp || !svix_signature) {
    res.status(400).json({
      success: false,
      message: "Error: Missing svix headers",
    });
    return;
  }

  let evt: any;

  try {
    evt = wh.verify(JSON.stringify(payload), {
      "svix-id": svix_id as string,
      "svix-timestamp": svix_timestamp as string,
      "svix-signature": svix_signature as string,
    });
  } catch (err) {
    console.log("Error: Could not verify webhook:", err.message);
    res.status(400).json({
      success: false,
      message: err.message,
    });
    return;
  }

  const { id } = evt.data;
  const eventType = evt.type;

  try {
    switch (eventType) {
      case "user.created":
      case "user.updated": {
        await prismaClient.user.upsert({
          where: { clerkId: id },
          update: {
            name: `${evt.data.first_name ?? ""} ${evt.data.last_name ?? ""}`.trim(),
            email: evt.data.email_addresses[0].email_address,
            profilePicture: evt.data.profile_image_url,
          },
          create: {
            clerkId: id,
            name: `${evt.data.first_name ?? ""} ${evt.data.last_name ?? ""}`.trim(),
            email: evt.data.email_addresses[0].email_address,
            profilePicture: evt.data.profile_image_url,
          },
        });
        break;
      }

      case "user.deleted": {
        await prismaClient.user.delete({
          where: { clerkId: id },
        });
        break;
      }

      default:
        console.log(`Unhandled event type: ${eventType}`);
        break;
    }
  } catch (error) {
    console.error("Error handling webhook:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
    return;
  }
  res.status(200).json({ success: true, message: "Webhook received" });
  return;
});

/**
 * POST api/webhook/fal-ai/train
 * Fal AI wil hit this endpoint when training is done
 */

router.post("/fal-ai/train", async (req, res) => {
  const { requestId } = req.body;

  const result = await fal.queue.result("fal-ai/flux-lora", {
    requestId,
  });

  const { imageUrl } = await falAiModel.generateImageSync(
    //@ts-ignore
    result.data.diffusers_lora_file.url
  );

  await prismaClient.model.updateMany({
    where: {
      falAiRequestId: requestId,
    },
    data: {
      trainingStatus: "Generated",
      //@ts-ignore
      tensorPath: result.data.diffusers_lora_file.url,
      thumbnail: imageUrl,
    },
  });
  res.json({
    message: "Webhook received",
  });
});

/**
 * POST api/webhook/fal-ai/image
 * Fal AI wil hit this endpoint when image is generated
 */

router.post("/fal-ai/image", async (req, res) => {
  const { requestId } = req.body;

  await prismaClient.outputImages.updateMany({
    where: {
      falAiRequestId: requestId,
    },
    data: {
      status: "Generated",
      imageUrl: req.body.payload.images[0].url,
    },
  });

  res.status(200).json({
    message: "Webhook received",
  });
});
