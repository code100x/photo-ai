import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { PlanType } from "@/types";
import { cn } from "@/lib/utils";

interface PaymentModalProps {
  plan: PlanType;
  isAnnual: boolean;
  onClose: () => void;
  onPaymentSubmit: (method: "stripe" | "razorpay") => Promise<void>;
  stripeLoading: boolean;
  razorPayLoading: boolean;
}

export function PaymentModal({
  plan,
  isAnnual,
  onClose,
  onPaymentSubmit,
  stripeLoading,
  razorPayLoading,
}: PaymentModalProps) {
  const planName = plan.charAt(0).toUpperCase() + plan.slice(1);

  const handlePaymentClick = async (method: "stripe" | "razorpay") => {
    try {
      await onPaymentSubmit(method);
    } catch (error) {
      console.error("Payment submission error:", error);
    }
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            Complete Your {planName} Plan {isAnnual ? "Annual" : "Monthly"}{" "}
            Subscription
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <Button
            onClick={() => handlePaymentClick("stripe")}
            disabled={stripeLoading}
            className={cn(
              "w-full",
              stripeLoading && "cursor-not-allowed opacity-50"
            )}
          >
            <div className="flex items-center justify-center gap-2">
              {stripeLoading ? (
                <>
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <svg
                    className="h-5 w-5"
                    viewBox="0 0 40 40"
                    fill="currentColor"
                  >
                    <path d="M33.3333 0H6.66667C2.98477 0 0 2.98477 0 6.66667V33.3333C0 37.0152 2.98477 40 6.66667 40H33.3333C37.0152 40 40 37.0152 40 33.3333V6.66667C40 2.98477 37.0152 0 33.3333 0Z" />
                  </svg>
                  <span>Pay with Stripe</span>
                </>
              )}
            </div>
          </Button>

          <Button
            onClick={() => handlePaymentClick("razorpay")}
            disabled={razorPayLoading}
            variant="outline"
            className={cn(
              "w-full",
              razorPayLoading && "cursor-not-allowed opacity-50"
            )}
          >
            <div className="flex items-center justify-center gap-2">
              {razorPayLoading ? (
                <>
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <svg
                    className="h-5 w-5"
                    viewBox="0 0 40 40"
                    fill="currentColor"
                  >
                    <path d="M33.3333 0H6.66667C2.98477 0 0 2.98477 0 6.66667V33.3333C0 37.0152 2.98477 40 6.66667 40H33.3333C37.0152 40 40 37.0152 40 33.3333V6.66667C40 2.98477 37.0152 0 33.3333 0Z" />
                  </svg>
                  <span>Pay with Razorpay</span>
                </>
              )}
            </div>
          </Button>
        </div>

        <div className="text-sm text-muted-foreground text-center">
          {isAnnual ? (
            <p>You'll be charged annually with 20% discount</p>
          ) : (
            <p>You'll be charged monthly</p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
