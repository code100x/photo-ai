import Stripe from "stripe";
import Razorpay from "razorpay";
import { prismaClient } from "db";
import crypto from "crypto";
import { PlanType } from "@prisma/client";

// Validate environment variables
const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;
const RAZORPAY_KEY_ID = process.env.RAZORPAY_KEY_ID;
const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET;

if (!STRIPE_SECRET_KEY) {
  console.error("Missing STRIPE_SECRET_KEY");
}

if (!RAZORPAY_KEY_ID || !RAZORPAY_KEY_SECRET) {
  console.error("Missing Razorpay credentials");
}

// Initialize payment providers
const stripe = STRIPE_SECRET_KEY
  ? new Stripe(STRIPE_SECRET_KEY, {
      apiVersion: "2025-01-27.acacia",
    })
  : null;

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

// Define plan prices (in rupees)
export const PLAN_PRICES = {
  basic: {
    monthly: 4000, // ₹1
    annual: 40000, // ₹10
  },
  premium: {
    monthly: 8000, // ₹1,999
    annual: 80000, // ₹19,990
  },
} as const;

// Define credit amounts per plan
export const CREDITS_PER_PLAN = {
  basic: 500,
  premium: 1000,
} as const;

export async function createTransactionRecord(
  userId: string,
  amount: number,
  currency: string,
  paymentId: string,
  orderId: string,
  plan: PlanType,
  isAnnual: boolean,
  status: "PENDING" | "SUCCESS" | "FAILED" = "PENDING" // Default to PENDING
) {
  try {
    return await withRetry(() =>
      prismaClient.transaction.create({
        data: {
          userId,
          amount,
          currency,
          paymentId,
          orderId,
          plan,
          isAnnual,
          status,
        },
      })
    );
  } catch (error) {
    console.error("Transaction creation error:", error);
    throw error;
  }
}

export async function createStripeSession(
  userId: string,
  plan: "basic" | "premium",
  isAnnual: boolean,
  email: string
) {
  try {
    if (!stripe) {
      throw new Error("Stripe is not configured");
    }

    console.log("Creating Stripe session:", { userId, plan, isAnnual, email });

    // Validate plan type
    if (!PLAN_PRICES[plan]) {
      throw new Error("Invalid plan type");
    }

    // Get the correct price
    const price = PLAN_PRICES[plan][isAnnual ? "annual" : "monthly"];
    console.log("Selected price:", price);

    // Create the checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: `${plan.charAt(0).toUpperCase() + plan.slice(1)} Plan`,
              description: `${isAnnual ? "Annual" : "Monthly"} subscription`,
            },
            unit_amount: price,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.FRONTEND_URL}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/payment/cancel`,
      customer_email: email,
      metadata: {
        userId,
        plan,
        isAnnual: String(isAnnual),
      },
    });

    // Create initial pending transaction record
    await createTransactionRecord(
      userId,
      price,
      "usd",
      session.payment_intent as string,
      session.id,
      plan,
      isAnnual,
      "PENDING"
    );

    console.log("Stripe session created:", session);
    return session;
  } catch (error) {
    console.error("Stripe session creation error:", error);
    throw error;
  }
}

export async function getStripeSession(sessionId: string) {
  if (!stripe) {
    throw new Error("Stripe is not configured");
  }
  return await stripe.checkout.sessions.retrieve(sessionId);
}

export async function createRazorpayOrder(
  userId: string,
  plan: keyof typeof PLAN_PRICES,
  isAnnual: boolean
) {
  try {
    // Log credentials check
    console.log("Razorpay Credentials:", {
      keyId: process.env.RAZORPAY_KEY_ID?.substring(0, 6) + "...",
      secretExists: !!process.env.RAZORPAY_KEY_SECRET,
    });

    // Calculate amount
    const baseAmount = isAnnual
      ? PLAN_PRICES[plan].annual
      : PLAN_PRICES[plan].monthly;
    const amountInPaise = baseAmount * 100;

    console.log("Creating order with amount:", amountInPaise);

    // Create order
    const orderData = {
      amount: amountInPaise,
      currency: "INR",
      receipt: `rcpt_${Date.now()}`,
      notes: {
        userId,
        plan,
        isAnnual: String(isAnnual),
      },
    };

    // Use promisified version
    const order = await new Promise((resolve, reject) => {
      razorpay.orders.create(orderData, (err: any, result: any) => {
        if (err) {
          console.error("Order creation error:", err);
          reject(err);
          return;
        }
        resolve(result);
      });
    });

    // Use actual order id and payment id
    await createTransactionRecord(
      userId,
      baseAmount,
      "INR",
      "", // Payment ID will be updated after payment is completed
      (order as any).id, // Use the actual order ID
      plan,
      isAnnual,
      "PENDING"
    );

    console.log("Order created:", order);

    // Return complete payment config
    return {
      key: process.env.RAZORPAY_KEY_ID,
      amount: amountInPaise,
      currency: "INR",
      name: "PhotoAI",
      description: `${plan.toUpperCase()} Plan ${isAnnual ? "(Annual)" : "(Monthly)"}`,
      order_id: (order as any).id,
      prefill: {
        name: "",
        email: "",
      },
      notes: {
        userId,
        plan,
        isAnnual: String(isAnnual),
      },
      theme: {
        color: "#000000",
      },
    };
  } catch (error) {
    console.error("Razorpay Error:", {
      error,
      message: error instanceof Error ? error.message : "Unknown error",
    });
    throw error;
  }
}

export async function verifyStripePayment(sessionId: string) {
  if (!stripe) {
    throw new Error("Stripe is not configured");
  }

  const session = await stripe.checkout.sessions.retrieve(sessionId);
  const { userId, plan, isAnnual } = session.metadata as {
    userId: string;
    plan: PlanType;
    isAnnual: string;
  };

  // Find existing pending transaction
  const existingTransaction = await prismaClient.transaction.findFirst({
    where: {
      orderId: session.id,
      userId: userId,
      status: "PENDING",
    },
  });

  if (!existingTransaction) {
    throw new Error("No pending transaction found for this session");
  }

  // Update the transaction status
  await prismaClient.transaction.update({
    where: {
      id: existingTransaction.id,
    },
    data: {
      status: session.payment_status === "paid" ? "SUCCESS" : "FAILED",
    },
  });

  return session.payment_status === "paid";
}

export const verifyRazorpaySignature = async ({
  paymentId,
  orderId,
  signature,
  userId,
  isAnnual,
  plan,
}: {
  paymentId: string;
  orderId: string;
  signature: string;
  userId: string;
  plan: PlanType;
  isAnnual: boolean;
}) => {
  try {
    if (!RAZORPAY_KEY_SECRET) {
      throw new Error("Razorpay secret key not configured");
    }

    const body = orderId + "|" + paymentId;
    const expectedSignature = crypto
      .createHmac("sha256", RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex");

    const isValid = expectedSignature === signature;
    console.log("Signature verification:", { isValid, orderId, paymentId });

    const order = await razorpay.orders.fetch(orderId);
    const amount = order.amount;
    const currency = order.currency;

    // Find existing pending transaction
    const existingTransaction = await prismaClient.transaction.findFirst({
      where: {
        orderId: orderId,
        userId: userId,
        status: "PENDING",
      },
    });

    if (!existingTransaction) {
      throw new Error("No pending transaction found for this order");
    }

    // Update the transaction status
    await prismaClient.transaction.update({
      where: {
        id: existingTransaction.id,
      },
      data: {
        paymentId,
        status: isValid ? "SUCCESS" : "FAILED",
      },
    });

    return isValid;
  } catch (error) {
    console.error("Signature verification error:", error);
    throw error;
  }
};

// Add retry logic for database operations
async function withRetry<T>(
  operation: () => Promise<T>,
  retries = 3,
  delay = 1000
): Promise<T> {
  try {
    return await operation();
  } catch (error) {
    if (
      retries > 0 &&
      error instanceof Error &&
      error.message.includes("Can't reach database server")
    ) {
      console.log(`Retrying operation, ${retries} attempts left`);
      await new Promise((resolve) => setTimeout(resolve, delay));
      return withRetry(operation, retries - 1, delay * 2);
    }
    throw error;
  }
}

export async function addCreditsForPlan(userId: string, plan: PlanType) {
  try {
    const credits = CREDITS_PER_PLAN[plan];
    console.log("Adding credits:", { userId, plan, credits });

    return await withRetry(() =>
      prismaClient.userCredit.upsert({
        where: { userId },
        update: { amount: { increment: credits } },
        create: {
          userId,
          amount: credits,
        },
      })
    );
  } catch (error) {
    console.error("Credit addition error:", error);
    throw error;
  }
}

export async function createSubscriptionRecord(
  userId: string,
  plan: PlanType,
  paymentId: string,
  orderId: string,
  isAnnual: boolean = false
) {
  try {
    return await withRetry(() =>
      prismaClient.$transaction(async (prisma) => {
        console.log("Creating subscription:", {
          userId,
          plan,
          paymentId,
          orderId,
          isAnnual,
        });

        const subscription = await prisma.subscription.create({
          data: {
            userId,
            plan,
            paymentId,
            orderId,
          },
        });

        await addCreditsForPlan(userId, plan);
        return subscription;
      })
    );
  } catch (error) {
    console.error("Subscription creation error:", error);
    throw error;
  }
}

export const PaymentService = {
  createStripeSession,
  createRazorpayOrder,
  verifyRazorpaySignature,
  getStripeSession,
  createSubscriptionRecord,
  addCreditsForPlan,
};
