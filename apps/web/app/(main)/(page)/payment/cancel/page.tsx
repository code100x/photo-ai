import { Suspense } from "react";
import { PaymentCancelContent } from "@/components/payment/PaymentCancelContent";

export default function PaymentCancelPage() {
  return (
    <Suspense
      fallback={
        <div className="flex py-10 min-h-screen items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold">Loading...</h1>
          </div>
        </div>
      }
    >
      <PaymentCancelContent />
    </Suspense>
  );
}
