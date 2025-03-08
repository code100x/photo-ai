import { prismaClient } from "db";
import { Router } from "express";
import { adminMiddleware } from "../middleware";
import { packSchema } from "common/types";

export const router: Router = Router();

// Fetch all packs
router.get("/bulk", async (req, res) => {
  try {
    const packs = await prismaClient.packs.findMany();
    res.status(200).json({ packs });
  } catch (error) {
    res.status(500).json({ error: "Error fetching packs" });
  }
});

// Fetch a pack by ID
router.get("/:id", async (req, res) => {
  try {
    const pack = await prismaClient.packs.findUnique({
      where: {
        id: req.params.id,
      },
      include: {
        prompts: true,
      },
    });

    if (!pack) {
      res.status(404).json({ error: "Pack not found" });
      return;
    }

    res.status(200).json({ pack });
  } catch (error) {
    res.status(500).json({ error: "Error fetching pack" });
  }
});

// Create a new pack
router.post("/",adminMiddleware, async (req, res) => {
  try {
    const parsedata = packSchema.safeParse(req.body);
    if (!parsedata.success) {
      res.status(400).json({ error: parsedata.error });
      return;
    }

    const newPack = await prismaClient.packs.create({
      data: {
        name: parsedata.data.name,
        description: parsedata.data.description,
        imageUrl1: parsedata.data.imageUrl1,
        imageUrl2: parsedata.data.imageUrl2,
        prompts: {
          create: parsedata.data.prompts.map((prompt) => ({
            prompt: prompt.prompt,
          })),
        },
      },
    });

    res.status(201).json({ pack: newPack });
  } catch (error) {
    res.status(500).json({ error: "Error creating pack" });
  }
});

// Update a pack by ID
router.put("/:id",adminMiddleware, async (req, res) => {
  try {
    const parsedata = packSchema.safeParse(req.body);
    if (!parsedata.success) {
      res.status(400).json({ error: parsedata.error });
      return;
    }
    const updatedPack = await prismaClient.packs.update({
      where: {
        id: parsedata.data.id,
      },
      data: {
        name: parsedata.data.name,
        description: parsedata.data.description,
        imageUrl1: parsedata.data.imageUrl1,
        imageUrl2: parsedata.data.imageUrl2,
        prompts: {
          upsert: parsedata.data.prompts.map((prompt) => ({
            where: { id: prompt.id },
            update: { prompt: prompt.prompt },
            create: { prompt: prompt.prompt },
          })),
        },
      },
    });

    res.status(200).json({
      pack: updatedPack,
    });
  } catch (error) {
    res.status(500).json({ error: "Error updating pack" });
  }
});

// Delete a pack by ID
router.delete("/:id",adminMiddleware, async (req, res) => {
  try {
    await prismaClient.packs.delete({
      where: {
        id: req.params.id,
      },
    });

    res.status(204).json({ message: "Pack deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error deleting pack" });
  }
});
