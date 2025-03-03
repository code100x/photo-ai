"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { BACKEND_URL } from "@/app/config";
import { useAuth } from "@clerk/nextjs";
import {
  Shield,
  CheckCircle,
  XCircle,
  Loader2,
  ArrowRight,
  RefreshCcw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { creditUpdateEvent } from "@/hooks/usePayment";

export function VerifyContent() {
  const [status, setStatus] = useState<"verifying" | "success" | "failed">(
    "verifying"
  );
  const [errorMessage, setErrorMessage] = useState<string>("");
  const searchParams = useSearchParams();
  const router = useRouter();
  const { toast } = useToast();
  const { getToken } = useAuth();

  useEffect(() => {
    const verifyRazorpayPayment = async () => {
      try {
        const paymentId = searchParams.get("razorpay_payment_id");
        const orderId = searchParams.get("razorpay_order_id");
        const signature = searchParams.get("razorpay_signature");
        const plan = searchParams.get("plan"); // Get plan from URL
        const amount = searchParams.get("amount"); // Get amount from URL

        if (!paymentId || !orderId || !signature) {
          throw new Error("Missing payment parameters");
        }

        const token = await getToken();
        if (!token) {
          throw new Error("Authentication required");
        }

        // Verify with Razorpay endpoint with all required fields
        const response = await fetch(`${BACKEND_URL}/payment/razorpay/verify`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            razorpay_payment_id: paymentId,
            razorpay_order_id: orderId,
            razorpay_signature: signature,
            plan: plan || "basic", // Include plan
            amount: amount || "0", // Include amount
            paymentMethod: "razorpay",
            status: "success",
          }),
        });

        const data = await response.json();

        if (response.ok && data.success) {
          // Update credits in navbar
          if (data.credits) {
            creditUpdateEvent.dispatchEvent(
              new CustomEvent("creditUpdate", { detail: data.credits })
            );
          }

          // Show success toast
          toast({
            title: "Payment Verified",
            description: "Your payment has been verified successfully",
          });

          setStatus("success");
          setTimeout(() => {
            router.push("/payment/success");
          }, 2000);
        } else {
          throw new Error(data.message || "Verification failed");
        }
      } catch (error: any) {
        console.error("Verification error:", error);
        setStatus("failed");
        setErrorMessage(error.message || "Payment verification failed");
        setTimeout(() => {
          router.push("/payment/cancel");
        }, 2000);
      }
    };

    verifyRazorpayPayment();
  }, [searchParams, router, getToken, toast]);

  if (status === "verifying") {
    return (
      <div className="min-h-[80vh] flex items-center justify-center bg-gradient-to-br from-background via-background/95 to-background/90">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-6 max-w-md mx-auto px-4"
        >
          <div className="relative">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="w-20 h-20 mx-auto"
            >
              <div className="w-full h-full border-4 border-primary/30 border-t-primary rounded-full" />
            </motion.div>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <Shield className="w-8 h-8 text-primary/50" />
            </motion.div>
          </div>

          <div className="space-y-3">
            <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
              Verifying Your Payment
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Please wait while we confirm your transaction. This will only take
              a moment.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-3 gap-4"
          >
            <div className="p-4 rounded-2xl bg-secondary/30 backdrop-blur-sm">
              <Loader2 className="w-6 h-6 mx-auto mb-2 text-primary animate-spin" />
              <span className="text-sm font-medium">Checking</span>
            </div>
            <div className="p-4 rounded-2xl bg-secondary/30 backdrop-blur-sm">
              <Shield className="w-6 h-6 mx-auto mb-2 text-primary" />
              <span className="text-sm font-medium">Securing</span>
            </div>
            <div className="p-4 rounded-2xl bg-secondary/30 backdrop-blur-sm">
              <CheckCircle className="w-6 h-6 mx-auto mb-2 text-primary" />
              <span className="text-sm font-medium">Confirming</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    );
  }

  if (status === "failed") {
    return (
      <div className="min-h-[80vh] flex items-center justify-center bg-gradient-to-br from-background via-background/95 to-background/90 p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-xl w-full mx-auto"
        >
          <div className="relative bg-card/50 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-border/50">
            <div className="absolute -top-12 left-1/2 -translate-x-1/2">
              <motion.div
                initial={{ scale: 0, rotate: 180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", duration: 0.7 }}
                className="relative bg-gradient-to-br from-red-500 to-rose-600 p-4 rounded-full shadow-lg"
              >
                <XCircle className="w-12 h-12 text-white" strokeWidth={2} />
              </motion.div>
            </div>

            <div className="text-center space-y-6 mt-8">
              <div className="space-y-2">
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-4xl font-bold text-red-500"
                >
                  Verification Failed
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-muted-foreground"
                >
                  {errorMessage}
                </motion.p>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="pt-6"
              >
                <Button
                  onClick={() => router.push("/pricing")}
                  className="w-full py-6 text-base font-medium"
                >
                  Try Again
                  <RefreshCcw className="ml-2 w-4 h-4" />
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return null;
}
