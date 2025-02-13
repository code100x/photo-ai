import express from "express";
import { authMiddleware } from "../middleware";
import { PaymentService } from "../services/payment";
import { prismaClient } from "db";

const router = express.Router();

router.post("/create-session", authMiddleware, async (req, res) => {
  try {
    const { plan, userId, method } = req.body;
    
    if (method === "stripe") {
      const session = await PaymentService.createStripeSession(userId, plan);
      res.json({ sessionId: session.id, url: session.url });
    } else {
      const amount = plan === "basic" ? 5000 : 10000;
      const order = await PaymentService.createRazorpayOrder(amount, userId, plan);
      res.json({
        id: order.id,
        amount: order.amount,
        currency: order.currency,
      });
    }
  } catch (error) {
    console.error("Payment creation error:", error);
    res.status(500).json({ message: "Error creating payment session" });
  }
});

router.post("/verify-stripe", authMiddleware, async (req, res) => {
  try {
    const { sessionId } = req.body;
    const isValid = await PaymentService.verifyStripePayment(sessionId);
    res.json({ success: isValid });
  } catch (error) {
    console.error("Stripe verification error:", error);
    res.status(500).json({ success: false });
  }
});

router.post("/verify-razorpay", authMiddleware, async (req, res) => {
  try {
    const {
      razorpay_payment_id,
      razorpay_order_id,
      razorpay_signature,
      plan,
    } = req.body;

    const isValid = PaymentService.verifyRazorpaySignature(
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature
    );

    if (isValid) {
      await prismaClient.subscription.create({
        data: {
          userId: req.userId,
          plan,
          paymentId: razorpay_payment_id,
          orderId: razorpay_order_id,
          status: "active",
        },
      });
      res.json({ success: true });
    } else {
      res.status(400).json({ success: false });
    }
  } catch (error) {
    console.error("Razorpay verification error:", error);
    res.status(500).json({ success: false });
  }
});

router.get("/status/:userId", async (req, res) => {
  try {
    const subscription = await prismaClient.subscription.findFirst({
      where: {
        userId: req.params.userId,
        status: "active",
      },
    });
    res.json({ hasPaid: !!subscription });
  } catch (error) {
    res.status(500).json({ hasPaid: false });
  }
});

export default router; 