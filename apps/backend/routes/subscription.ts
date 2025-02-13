import express from "express";
import { authMiddleware } from "../middleware";
import { prismaClient } from "db";

const router = express.Router();

router.get("/status/:userId", authMiddleware, async (req, res) => {
  try {
    const subscription = await prismaClient.subscription.findFirst({
      where: {
        userId: req.params.userId,
        status: "active",
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    
    res.json({ active: !!subscription });
  } catch (error) {
    console.error("Subscription status error:", error);
    res.status(500).json({ active: false });
  }
});

export default router; 