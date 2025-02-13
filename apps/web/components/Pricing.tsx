"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Check } from "lucide-react"
import { useRouter } from "next/navigation"
import { useAuth } from "@clerk/nextjs"
import axios from "axios"
import { BACKEND_URL } from "@/app/config"
import toast from "react-hot-toast"
import { PaymentModal } from "./PaymentModal"
import { loadStripe } from "@stripe/stripe-js"
import { Switch } from "./ui/switch"

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const MONTHLY_PRICES = {
  basic: 50,
  business: 100
};

export function Pricing() {
  const router = useRouter()
  const { getToken, userId } = useAuth()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState<"basic" | "business" | null>(null)
  const [isAnnual, setIsAnnual] = useState(false)

  const calculatePrice = (basePrice: number, isAnnual: boolean) => {
    if (isAnnual) {
      // 20% discount for annual plans
      const annualPrice = basePrice * 12 * 0.8;
      return {
        amount: Math.round(annualPrice / 12), // Show monthly price
        total: Math.round(annualPrice),
        period: "/mo",
        billed: "billed annually"
      };
    }
    return {
      amount: basePrice,
      total: basePrice,
      period: "/mo",
      billed: "billed monthly"
    };
  };

  const basicPrice = calculatePrice(MONTHLY_PRICES.basic, isAnnual);
  const businessPrice = calculatePrice(MONTHLY_PRICES.business, isAnnual);

  const handlePaymentMethod = async (method: "stripe" | "razorpay") => {
    try {
      const token = await getToken();
      const response = await axios.post(
        `${BACKEND_URL}/payment/create-session`,
        { 
          plan: selectedPlan,
          userId,
          method,
          isAnnual
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (method === "stripe") {
        window.location.href = response.data.url;
      } else {
        const options = {
          key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
          amount: response.data.amount,
          currency: response.data.currency,
          name: "PhotoAI",
          description: `${selectedPlan} Plan Subscription${isAnnual ? ' (Annual)' : ' (Monthly)'}`,
          order_id: response.data.id,
          handler: async function (response: any) {
            try {
              const token = await getToken();
              const data = await axios.post(
                `${BACKEND_URL}/payment/verify-razorpay`,
                {
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_signature: response.razorpay_signature,
                  plan: selectedPlan,
                  isAnnual,
                },
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
              );
              
              if (data.data.success) {
                toast.success("Payment Successful!");
                router.push("/dashboard");
              }
            } catch (err) {
              toast.error("Payment verification failed");
            }
          },
        };

        const paymentObject = new (window as any).Razorpay(options);
        paymentObject.open();
      }
    } catch (error) {
      toast.error("Failed to create payment session");
    }
    setIsModalOpen(false);
  };

  return (
    <div className="py-8 px-4">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold mb-4">Simple, transparent pricing</h2>
        <p className="text-muted-foreground">
          Choose the plan that's right for you
        </p>
        <div className="flex items-center justify-center gap-2 mt-4">
          <span className={!isAnnual ? "font-semibold" : ""}>Monthly</span>
          <Switch
            checked={isAnnual}
            onCheckedChange={setIsAnnual}
          />
          <span className={isAnnual ? "font-semibold" : ""}>Annual</span>
          {isAnnual && (
            <span className="ml-2 text-sm text-green-500">Save 20%</span>
          )}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Basic</CardTitle>
            <CardDescription>Perfect for getting started</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline mb-4">
              <span className="text-3xl font-bold">${basicPrice.amount}</span>
              <span className="text-muted-foreground ml-1">{basicPrice.period}</span>
            </div>
            {isAnnual && (
              <p className="text-sm text-muted-foreground mb-4">
                ${basicPrice.total}/year ({basicPrice.billed})
              </p>
            )}
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4" /> 100 Images per month
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4" /> Basic support
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button
              className="w-full"
              onClick={() => {
                setSelectedPlan("basic")
                setIsModalOpen(true)
              }}
            >
              Get Started
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Business</CardTitle>
            <CardDescription>For professional users</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline mb-4">
              <span className="text-3xl font-bold">${businessPrice.amount}</span>
              <span className="text-muted-foreground ml-1">{businessPrice.period}</span>
            </div>
            {isAnnual && (
              <p className="text-sm text-muted-foreground mb-4">
                ${businessPrice.total}/year ({businessPrice.billed})
              </p>
            )}
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4" /> Unlimited Images
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4" /> Priority support
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4" /> Advanced features
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button
              className="w-full"
              onClick={() => {
                setSelectedPlan("business")
                setIsModalOpen(true)
              }}
            >
              Get Started
            </Button>
          </CardFooter>
        </Card>
      </div>

      <PaymentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSelectPayment={handlePaymentMethod}
        plan={selectedPlan!}
      />
    </div>
  )
} 