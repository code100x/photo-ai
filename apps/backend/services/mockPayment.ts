type PaymentOrder = {
  id: string;
  amount: number;
  currency: string;
  receipt: string;
};

export class MockPaymentService {
  static orders = new Map<string, PaymentOrder>();

  static async createOrder(amount: number, currency: string): Promise<PaymentOrder> {
    const orderId = `order_${Date.now()}`;
    const order = {
      id: orderId,
      amount,
      currency,
      receipt: `receipt_${Date.now()}`,
    };
    this.orders.set(orderId, order);
    return order;
  }

  static async verifyPayment(orderId: string, paymentId: string): Promise<boolean> {
    // In development, always return true
    return true;
  }
} 