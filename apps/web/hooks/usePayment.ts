import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { BACKEND_URL } from "@/app/config";
import { RazorpayResponse } from "@/types";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY!);
const apiUrl = BACKEND_URL;

// Create an event bus for credit updates
export const creditUpdateEvent = new EventTarget();

export function usePayment() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { getToken } = useAuth();

  const handlePayment = async (plan: "basic" | "premium", p0: boolean, p1: string) => {
    try {
      setIsLoading(true);
      const token = await getToken();
      if (!token) throw new Error("Not authenticated");

      const response = await fetch(`${apiUrl}/payment/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ plan, method: "razorpay" }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Payment failed");

      await loadRazorpayScript();

      const options = {
        key: data.key,
        amount: String(data.amount),
        currency: data.currency,
        name: data.name,
        description: data.description,
        order_id: data.order_id,
        handler: function (response: RazorpayResponse) {
          // Redirect to verify page with all necessary parameters
          const params = new URLSearchParams({
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature,
            plan: plan,
            amount: String(data.amount),
          });
          window.location.href = `/payment/verify?${params.toString()}`;
        },
        modal: {
          ondismiss: function () {
            window.location.href = "/payment/cancel";
          },
        },
        theme: {
          color: "#000000",
        },
      };

      const razorpay = new (window as any).Razorpay(options);
      razorpay.open();
    } catch (error) {
      toast({
        title: "Payment Error",
        description: "Failed to initialize payment",
        variant: "destructive",
      });
      window.location.href = "/payment/cancel";
    } finally {
      setIsLoading(false);
    }
  };

  return {
    handlePayment,
    isLoading,
  };
}

// Helper function to load Razorpay SDK
function loadRazorpayScript(): Promise<void> {
  return new Promise((resolve) => {
    if (document.getElementById("razorpay-sdk")) {
      resolve();
      return;
    }
    const script = document.createElement("script");
    script.id = "razorpay-sdk";
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => resolve();
    document.body.appendChild(script);
  });
}
