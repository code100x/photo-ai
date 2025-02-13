import Stripe from 'stripe';
import Razorpay from 'razorpay';
import { prismaClient } from 'db';
import crypto from 'crypto';

const isDevelopment = process.env.NODE_ENV !== 'production';

// Initialize payment services with fallbacks for development
const stripe = process.env.STRIPE_SECRET_KEY 
  ? new Stripe(process.env.STRIPE_SECRET_KEY)
  : undefined;

const razorpay = (process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET) 
  ? new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    })
  : undefined;

export class PaymentService {
  static async createStripeSession(userId: string, plan: string, isAnnual: boolean = false) {
    if (isDevelopment && !stripe) {
      await this.createMockSubscription(userId, plan);
      return {
        id: `mock_session_${Date.now()}`,
        url: `${process.env.FRONTEND_URL}/dashboard?session_id=mock_session_${Date.now()}`,
      };
    }

    if (!stripe) {
      throw new Error('Stripe is not configured');
    }

    const baseAmount = plan === "basic" ? 5000 : 10000;
    let amount = baseAmount;
    
    if (isAnnual) {
      // Apply 20% discount for annual plans
      amount = Math.round(baseAmount * 12 * 0.8);
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `${plan.charAt(0).toUpperCase() + plan.slice(1)} Plan${isAnnual ? ' (Annual)' : ' (Monthly)'}`,
            },
            unit_amount: amount,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.FRONTEND_URL}/dashboard?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/pricing`,
      metadata: {
        userId,
        plan,
        isAnnual: isAnnual.toString(),
      },
    });
    return session;
  }

  static async createRazorpayOrder(amount: number, userId: string, plan: string, isAnnual: boolean = false) {
    if (isDevelopment && !razorpay) {
      await this.createMockSubscription(userId, plan);
      return {
        id: `order_${Date.now()}`,
        amount: amount * 100,
        currency: 'INR',
      };
    }

    if (!razorpay) {
      throw new Error('Razorpay is not configured');
    }

    let finalAmount = amount;
    if (isAnnual) {
      // Apply 20% discount for annual plans
      finalAmount = Math.round(amount * 12 * 0.8);
    }

    const order = await razorpay.orders.create({
      amount: finalAmount * 100, // Convert to smallest currency unit
      currency: 'INR',
      receipt: `receipt_${Date.now()}`,
      notes: {
        userId,
        plan,
        isAnnual: isAnnual.toString(),
      },
    });
    return order;
  }

  static async verifyStripePayment(sessionId: string) {
    if (isDevelopment && !stripe) {
      return true;
    }

    if (!stripe) {
      throw new Error('Stripe is not configured');
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId);
    return session.payment_status === 'paid';
  }

  static verifyRazorpaySignature(orderId: string, paymentId: string, signature: string) {
    if (isDevelopment && !razorpay) {
      return true;
    }

    if (!process.env.RAZORPAY_KEY_SECRET) {
      throw new Error('Razorpay key secret is not configured');
    }

    const generated_signature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(`${orderId}|${paymentId}`)
      .digest('hex');
    return generated_signature === signature;
  }

  private static async createMockSubscription(userId: string, plan: string) {
    await prismaClient.subscription.create({
      data: {
        userId,
        plan,
        paymentId: `mock_payment_${Date.now()}`,
        orderId: `mock_order_${Date.now()}`,
        status: 'active',
      },
    });
  }
} 