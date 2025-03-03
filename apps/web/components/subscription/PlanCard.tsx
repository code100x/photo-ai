import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckIcon, Sparkles } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { SignInButton } from "@clerk/nextjs";

interface PlanCardProps {
  plan: {
    type: string;
    name: string;
    price: number;
    credits: number;
    features: string[];
  };
  onSelect: () => void;
}

export function PlanCard({ plan, onSelect }: PlanCardProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { isAuthenticated } = useAuth();
  const isPremium = plan.type === "premium";

  const handleClick = async () => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      await onSelect();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card
      className={`relative p-8 rounded-2xl shadow-xl transition-all duration-300 ease-out 
      hover:shadow-2xl border-2 ${
        isPremium
          ? "border-purple-500/50 hover:border-purple-500 bg-gradient-to-b from-purple-50 to-transparent dark:from-purple-900/10"
          : "border-gray-200 hover:border-gray-300 dark:border-gray-700 dark:hover:border-gray-600"
      }`}
    >
      {isPremium && (
        <div className="absolute -top-3 -right-3">
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-200">
            <Sparkles className="w-3 h-3" /> Popular
          </span>
        </div>
      )}

      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-extrabold mb-2 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
            {plan.name}
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            One-time payment for {plan.credits} credits
          </p>
        </div>

        <div className="flex items-baseline gap-1">
          <span className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-400 dark:to-blue-400 bg-clip-text text-transparent">
            ${plan.price}
          </span>
          <span className="text-gray-500 dark:text-gray-400">one-time</span>
        </div>

        <div className="space-y-3">
          {plan.features.map((feature) => (
            <li
              key={feature}
              className="flex items-center gap-3 text-gray-700 dark:text-gray-300 text-sm"
            >
              <CheckIcon
                className={`w-5 h-5 ${
                  isPremium
                    ? "text-purple-500 dark:text-purple-400"
                    : "text-green-500 dark:text-green-400"
                }`}
              />
              {feature}
            </li>
          ))}
        </div>

        {isAuthenticated ? (
          <Button
            className={`w-full py-6 rounded-xl font-medium tracking-wide shadow-lg transition-all duration-300 cursor-pointer
              ${
                isPremium
                  ? "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white hover:scale-[1.02] hover:shadow-xl"
                  : "bg-gray-900 hover:bg-gray-800 text-white dark:bg-gray-800 dark:hover:bg-gray-700 hover:scale-[1.02] hover:shadow-xl"
              }`}
            onClick={handleClick}
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 border-t-2 border-b-2 border-current rounded-full animate-spin" />
                Processing...
              </div>
            ) : (
              `Get ${plan.credits} Credits`
            )}
          </Button>
        ) : (
          <SignInButton mode="modal">
            <Button
              className={`w-full py-6 rounded-xl font-medium tracking-wide shadow-lg transition-all duration-300 cursor-pointer
                ${
                  isPremium
                    ? "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white hover:scale-[1.02] hover:shadow-xl"
                    : "bg-gray-900 hover:bg-gray-800 text-white dark:bg-gray-800 dark:hover:bg-gray-700 hover:scale-[1.02] hover:shadow-xl"
                }`}
            >
              Sign in to Purchase
            </Button>
          </SignInButton>
        )}
      </div>
    </Card>
  );
}
