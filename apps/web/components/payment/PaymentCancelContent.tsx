"use client";

import { useRouter } from "next/navigation";
import { XCircle, AlertCircle, ArrowLeft, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export function PaymentCancelContent() {
  const router = useRouter();

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
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="absolute -right-2 -top-2"
              >
                <AlertCircle className="w-6 h-6 text-yellow-300" />
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
                Payment Cancelled
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-muted-foreground"
              >
                Your payment was not completed. No charges were made.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="grid grid-cols-2 gap-4"
            >
              <div className="p-4 rounded-2xl bg-secondary/30 backdrop-blur-sm">
                <XCircle className="w-6 h-6 mx-auto mb-2 text-red-500" />
                <span className="text-sm font-medium">
                  Payment Not Processed
                </span>
              </div>
              <div className="p-4 rounded-2xl bg-secondary/30 backdrop-blur-sm">
                <AlertCircle className="w-6 h-6 mx-auto mb-2 text-yellow-500" />
                <span className="text-sm font-medium">No Charges Made</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="grid grid-cols-2 gap-4 pt-6"
            >
              <Button
                onClick={() => router.push("/pricing")}
                variant="outline"
                className="w-full py-6 text-base font-medium hover:bg-secondary/80 transition-all duration-300 cursor-pointer"
              >
                <ArrowLeft className="mr-2 w-4 h-4" />
                Back to Pricing
              </Button>
              <Button
                onClick={() => router.push("/pricing")}
                className="w-full py-6 text-base font-medium bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer"
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
