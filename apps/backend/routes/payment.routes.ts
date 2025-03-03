import express from "express";

import { authMiddleware } from "../middleware";
import {
  createPayment,
  getAuthorizedUserCredits,
  getSubscription,
  getUserCreditsByUserId,
  stripeWebhookHandler,
  verifyPayment,
  verifyRazorpay,
  verifyStripe,
} from "../controllers/payment.controller";

const router = express.Router();

router.post("/create", authMiddleware, createPayment);

router.post("/stripe/verify", authMiddleware, verifyStripe);

router.post("/razorpay/verify", authMiddleware, verifyRazorpay);

router.get("/subscription/:userId", getSubscription);

router.get("/credits/:userId", getUserCreditsByUserId);

// Add this route to get user credits
router.get("/credits", authMiddleware, getAuthorizedUserCredits);

// Add Stripe webhook handler
router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  stripeWebhookHandler
);

// Add this new verification endpoint
router.post("/verify", verifyPayment);

export default router;
