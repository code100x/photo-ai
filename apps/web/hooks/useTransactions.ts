import { BACKEND_URL } from "@/app/config";
import { Transaction } from "@/types";
import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";

export const useTransactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTransactions = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${BACKEND_URL}/payment/transactions`
      );
      const data = response.data;
      setTransactions(data.transactions);
    } catch (error: any) {
      if (error instanceof AxiosError) {
        setError(error.response?.data.message || error.message);
      } else {
        setError(error.message || "An error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return { transactions, isLoading, error };
};
