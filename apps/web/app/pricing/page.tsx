"use client";

import { useState } from "react";
import { PlanCard } from "@/components/subscription/PlanCard";
import { PlanType } from "@/types";
import { usePayment } from "@/hooks/usePayment";
import { motion } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";

export default function SubscriptionPage() {
  const [, setSelectedPlan] = useState<PlanType | null>(null);
  const { handlePayment } = usePayment();
  const { isAuthenticated } = useAuth();

  const handlePlanSelect = async (plan: PlanType) => {
    if (!isAuthenticated) return;

    setSelectedPlan(plan);
    await handlePayment(plan, false, "razorpay");
    setSelectedPlan(null);
  };

  const plans = [
    {
      type: PlanType.basic,
      name: "Basic Plan",
      price: 50,
      credits: 500,
      features: [
        "500 Credits",
        "Basic Support",
        "Standard Processing",
        "Flux Lora",
        "24/7 Email Support",
      ],
    },
    {
      type: PlanType.premium,
      name: "Premium Plan",
      price: 100,
      credits: 1000,
      features: [
        "1000 Credits",
        "Priority Support",
        "Fast Processing",
        "Advanced Features",
        "Flux Lora",
        "Custom Solutions",
      ],
    },
  ] as const;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 25 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="max-w-4xl text-center"
      >
        <h1 className="text-4xl font-extrabold tracking-tight mb-4 text-gray-900 dark:text-white">
          Choose Your Plan
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Find the perfect plan for your needs. Every plan includes access to
          our core features.
        </p>
      </motion.div>

      <motion.div
        className="grid md:grid-cols-2 gap-8 mt-10"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        {plans.map((plan) => (
          <PlanCard
            key={plan.type}
            plan={{
              type: plan.type,
              name: plan.name,
              price: plan.price,
              credits: plan.credits,
              features: [...plan.features],
            }}
            onSelect={() => handlePlanSelect(plan.type)}
          />
        ))}
      </motion.div>
    </div>
  );
}
