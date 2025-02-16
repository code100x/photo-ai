import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { BACKEND_URL } from "@/app/config";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY!);
const apiUrl = BACKEND_URL;

// Create an event bus for credit updates
export const creditUpdateEvent = new EventTarget();

export function usePayment() {
  const [stripeLoading, setStripeLoading] = useState(false);
  const [razorpayLoading, setRazorPayLoading] = useState(false);
  const { toast } = useToast();
  const { getToken } = useAuth();
  const router = useRouter();

  const handlePayment = async (
    plan: "basic" | "premium",
    isAnnual: boolean,
    method: "stripe" | "razorpay"
  ) => {
    try {
      if (method === "stripe") {
        setStripeLoading(true);
      } else {
        setRazorPayLoading(true);
      }
      console.log("Initiating payment:", { plan, isAnnual, method });

      const token = await getToken();
      if (!token) {
        throw new Error("Not authenticated");
      }

      const response = await fetch(`${apiUrl}/payment/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ plan, isAnnual, method }),
        credentials: "include",
      });

      const data = await response.json();
      console.log("Payment response:", data);

      if (!response.ok) {
        throw new Error(data.message || "Payment failed");
      }

      if (method === "stripe" && data.sessionId) {
        const stripe = await stripePromise;
        if (!stripe) throw new Error("Stripe failed to load");

        const { error } = await stripe.redirectToCheckout({
          sessionId: data.sessionId,
        });

        if (error) {
          console.error("Stripe redirect error:", error);
          throw error;
        }
      } else if (method === "razorpay" && data.id) {
        const options = {
          key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
          amount: data.amount,
          currency: data.currency || "INR",
          name: "PhotoAI",
          description: `${plan} Plan - ${isAnnual ? "Annual" : "Monthly"}`,
          order_id: data.id,
          handler: async (response: any) => {
            try {
              const verifyResponse = await fetch(
                `${apiUrl}/payment/razorpay/verify`,
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                  },
                  body: JSON.stringify({
                    ...response,
                    plan,
                  }),
                  credentials: "include",
                }
              );

              const verifyData = await verifyResponse.json();
              if (!verifyResponse.ok) {
                throw new Error(
                  verifyData.message || "Payment verification failed"
                );
              }

              // Dispatch credit update event
              creditUpdateEvent.dispatchEvent(new Event("creditUpdate"));

              toast({
                title: "Payment Successful",
                description: "Your subscription has been activated",
              });

              router.push("/dashboard");
            } catch (error) {
              console.error("Payment verification error:", error);
              toast({
                title: "Payment Failed",
                description: "Please try again",
                variant: "destructive",
              });
            }
          },
        };

        const rzp = new (window as any).Razorpay(options);
        rzp.open();
      }
    } catch (error) {
      console.error("Payment error:", error);
      toast({
        title: "Payment Failed",
        description:
          error instanceof Error ? error.message : "Please try again",
        variant: "destructive",
      });
    } finally {
      setStripeLoading(false);
      setRazorPayLoading(false);
    }
  };

  return {
    handlePayment,
    stripeLoading,
    razorpayLoading,
  };
}
