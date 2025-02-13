"use client"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog"
import { Button } from "./ui/button"
import { StripeIcon, RazorpayIcon } from "./payment-icons"

interface PaymentModalProps {
  isOpen: boolean
  onClose: () => void
  onSelectPayment: (method: "stripe" | "razorpay") => Promise<void>
  plan: "basic" | "business"
}

export function PaymentModal({ isOpen, onClose, onSelectPayment, plan }: PaymentModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Choose Payment Method</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Button
            className="flex items-center justify-center gap-2"
            onClick={() => onSelectPayment("stripe")}
          >
            <StripeIcon />
            Pay with Stripe
          </Button>
          <Button
            className="flex items-center justify-center gap-2"
            onClick={() => onSelectPayment("razorpay")}
          >
            <RazorpayIcon />
            Pay with Razorpay
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
} 