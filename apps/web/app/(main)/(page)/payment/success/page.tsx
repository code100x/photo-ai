import { Suspense } from "react";
import { PaymentSuccessContent } from "@/components/payment/PaymentSuccessContent";

export default function PaymentSuccessPage() {
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
      <PaymentSuccessContent />
    </Suspense>
  );
}
