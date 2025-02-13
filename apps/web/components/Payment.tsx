'use client';
import { useState } from 'react';
import Script from 'next/script';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import axios from 'axios';
import { BACKEND_URL, RAZORPAY_KEY_ID } from '@/app/config'; 
import { useAuth } from "@clerk/nextjs"

function Payment() {
 const [credits, setCredits] = useState('10');
 const [loading, setLoading] = useState(false);
 const { getToken } = useAuth()    

 const createOrderId = async () => {
  try {
   const token = await getToken();
   const response = await axios.post(`${BACKEND_URL}/razorpay/create-order`, {
    amount: parseInt(credits) * 10 * 100,
    currency : "INR",
    receipt : `${Date.now()}`
   },{
      headers : {
         Authorization : `Bearer ${token}`
      }
   });
   return response.data.orderId;
  } catch (error) {
   console.error('There was a problem with your axios operation:', error);
  }
 };

 const processRazorpayPayment = async () => {
  try {
   const orderId: string = await createOrderId();
   const options = {
    key: RAZORPAY_KEY_ID,
    order_id: orderId,
    handler: async function (response: any) {
     const data = {
      orderCreationId: orderId,
      razorpayPaymentId: response.razorpay_payment_id,
      razorpaySignature: response.razorpay_signature,
      razorpayOrderId : response.razorpay_order_id
     };
     console.log("Razorpay response",response)
     const token = await getToken()
     try {
      const result = await axios.post(`${BACKEND_URL}/razorpay/verify`, data,{
         headers : {
            Authorization : `Bearer ${token}`
         }
      });
      const res = result.data;
      if (res.isOk) alert("Payment succeeded");
      else {
       alert(res.message);
      }
     } catch (error) {
      console.error('Error verifying payment:', error);
     }
    },
    theme: {
     color: '#3399cc',
    },
   };
   // @ts-ignore
   const paymentObject = new window.Razorpay(options);
   paymentObject.on('payment.failed', function (response: any) {
    alert(response.error.description);
   });
   paymentObject.open();
  } catch (error) {
   console.log(error);
  }
 };

 const processStripePayment = () => {
  alert('Stripe payment not implemented yet');
 };

 return (
  <>
   <Script
    id="razorpay-checkout-js"
    src="https://checkout.razorpay.com/v1/checkout.js"
   />
   <section className="min-h-[94vh] flex flex-col gap-6 h-14 mx-5 sm:mx-10 2xl:mx-auto 2xl:w-[1400px] items-center pt-36 ">
    <div className="flex flex-col gap-6 w-full sm:w-80">
     <div className="space-y-1">
      <Label>Number of Credits</Label>
      <Input
       type="number"
       step="1"
       min={1}
       placeholder="Number of credits"
       value={credits}
       onChange={(e) => setCredits(e.target.value)}
      />
      <p>{credits} credits * 10 INR = {parseInt(credits) * 10} INR</p>
     </div>

     <Button onClick={processRazorpayPayment}>Pay via Razorpay</Button>
     <Button onClick={processStripePayment}>Pay via Stripe</Button>
    </div>
   </section>
  </>
 );
}

export { Payment };