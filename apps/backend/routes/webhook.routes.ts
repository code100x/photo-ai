import { Router } from "express";
import { clerkWebhookHandler } from "../controllers/webhook.controller";

const router = Router();

/**
 * POST api/webhook/clerk
 * Clerk webhook endpoint
 */
router.post("/clerk", clerkWebhookHandler);

export default router;
