import axios from 'axios';
import { BACKEND_URL } from '@/app/config';

export const checkPaymentStatus = async (userId: string) => {
  try {
    const response = await axios.get(`${BACKEND_URL}/subscription/status/${userId}`);
    return response.data.active;
  } catch (error) {
    console.error('Error checking payment status:', error);
    return false;
  }
};

// Mock payment initialization for development
export const initializeRazorpay = () => {
  if (window.Razorpay) {
    return Promise.resolve();
  }
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = resolve;
    document.body.appendChild(script);
  });
}; 