"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { BACKEND_URL } from "@/app/config";
import { useAuth } from "@clerk/nextjs";
import {
  CheckCircle,
  ArrowRight,
  CreditCard,
  Sparkles,
  Shield,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

export function PaymentSuccessContent() {
  const [verifying, setVerifying] = useState(true);
  const [verified, setVerified] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const { toast } = useToast();
  const { getToken } = useAuth();

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        const sessionId = searchParams.get("session_id");
        const paymentId = searchParams.get("razorpay_payment_id");
        const orderId = searchParams.get("razorpay_order_id");
        const signature = searchParams.get("razorpay_signature");

        // If no payment parameters, assume direct navigation after successful payment
        if (!sessionId && !paymentId) {
          setVerified(true);
          setVerifying(false);
          return;
        }

        const token = await getToken();
        if (!token) {
          throw new Error("Not authenticated");
        }

        // Handle Razorpay verification
        if (paymentId && orderId && signature) {
          const response = await fetch(
            `${BACKEND_URL}/payment/razorpay/verify`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({
                razorpay_payment_id: paymentId,
                razorpay_order_id: orderId,
                razorpay_signature: signature,
              }),
            }
          );

          const data = await response.json();

          if (response.ok && data.success) {
            setVerified(true);
          } else {
            router.push("/payment/cancel");
          }
        }
        // Handle Stripe verification
        else if (sessionId) {
          const response = await fetch(`${BACKEND_URL}/payment/verify`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ sessionId }),
          });

          const data = await response.json();

          if (response.ok && data.success) {
            setVerified(true);
          } else {
            router.push("/payment/cancel");
          }
        }
      } catch (error) {
        console.error("Payment verification error:", error);
        router.push("/payment/cancel");
      } finally {
        setVerifying(false);
      }
    };

    verifyPayment();
  }, [searchParams, router, getToken, toast]);

  if (verifying) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center bg-gradient-to-br from-background via-background/95 to-background/90">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-6 max-w-md mx-auto px-4"
        >
          <div className="relative">
            <div className="w-20 h-20 mx-auto border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <Shield className="w-8 h-8 text-primary/50" />
            </motion.div>
          </div>
          <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
            Securing Your Transaction
          </h2>
          <p className="text-muted-foreground text-sm leading-relaxed">
            We're verifying your payment and preparing your credits. This will
            only take a moment.
          </p>
        </motion.div>
      </div>
    );
  }

  if (verified) {
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
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", duration: 0.7 }}
                className="relative bg-gradient-to-br from-green-500 to-emerald-600 p-4 rounded-full shadow-lg"
              >
                <CheckCircle className="w-12 h-12 text-white" strokeWidth={2} />
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="absolute -right-2 -top-2"
                >
                  <Sparkles className="w-6 h-6 text-yellow-300" />
                </motion.div>
              </motion.div>
            </div>

            <div className="text-center space-y-6 mt-8">
              <div className="space-y-2">
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-4xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent"
                >
                  Payment Successful!
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-muted-foreground"
                >
                  Your credits are now available in your account
                </motion.p>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="grid grid-cols-3 gap-4"
              >
                <div className="p-4 rounded-2xl bg-secondary/30 backdrop-blur-sm">
                  <CreditCard className="w-6 h-6 mx-auto mb-2 text-primary" />
                  <span className="text-sm font-medium">Payment Verified</span>
                </div>
                <div className="p-4 rounded-2xl bg-secondary/30 backdrop-blur-sm">
                  <Sparkles className="w-6 h-6 mx-auto mb-2 text-primary" />
                  <span className="text-sm font-medium">Credits Added</span>
                </div>
                <div className="p-4 rounded-2xl bg-secondary/30 backdrop-blur-sm">
                  <Shield className="w-6 h-6 mx-auto mb-2 text-primary" />
                  <span className="text-sm font-medium">Secured</span>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="pt-6"
              >
                <Button
                  onClick={() => router.push("/dashboard")}
                  className="w-full py-6 text-base font-medium bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer"
                >
                  Continue to Dashboard
                  <ArrowRight className="ml-2 w-4 h-4" />
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
