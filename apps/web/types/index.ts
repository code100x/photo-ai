export enum PlanType {
  basic = "basic",
  premium = "premium",
}

export interface PaymentResponse {
  sessionId?: string;
  url?: string;
  id?: string;
  amount?: number;
  currency?: string;
  success?: boolean;
  message?: string;
}

export interface RazorpayResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

export interface SubscriptionStatus {
  plan: PlanType;
  createdAt: string;
  credits: number;
}

export enum TransactionStatus {
  SUCCESS = "SUCCESS",
  FAILED = "FAILED",
  PENDING = "PENDING",
}

export interface Transaction {
  id: string;
  userId: string;
  amount: number;
  currency: string;
  paymentId: string;
  orderId: string;
  plan: PlanType;
  isAnnual: boolean;
  status: TransactionStatus;
  createdAt: string;
  updatedAt: string;
}
