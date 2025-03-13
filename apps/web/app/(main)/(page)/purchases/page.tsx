import { redirect } from "next/navigation";
import TransactionsPage from "@/components/payment/PurchasesPage";
import React from "react";
import { auth } from "@clerk/nextjs/server";

export default async function PurchasesPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/");
  }

  return <TransactionsPage />;
}
