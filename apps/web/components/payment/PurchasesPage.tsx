"use client";

import { useState } from "react";
import { format } from "date-fns";
import { Filter, Search } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { useTransactions } from "@/hooks/useTransactions";
import { TransactionStatus } from "@/types";

export default function TransactionsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const { error, isLoading, transactions } = useTransactions();

  const formatAmount = (amount: number, currency: string) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
    }).format(amount);
  };

  const getStatusColor = (status: TransactionStatus) => {
    switch (status) {
      case "PENDING":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100/80";
      case "SUCCESS":
        return "bg-green-100 text-green-800 hover:bg-green-100/80";
      case "FAILED":
        return "bg-red-100 text-red-800 hover:bg-red-100/80";
      default:
        return "";
    }
  };

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch =
      transaction.orderId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.paymentId.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "ALL" || transaction.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="max-w-6xl my-16 mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Transactions</h1>
        <p className="text-muted-foreground">
          View and manage your recent transactions
        </p>
      </div>

      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-4">
          <div className="relative w-full md:w-[300px]">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by order or payment ID..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <Select
              value={statusFilter}
              onValueChange={(value) => setStatusFilter(value)}
            >
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">All</SelectItem>
                <SelectItem value="PENDING">Pending</SelectItem>
                <SelectItem value="SUCCESS">Success</SelectItem>
                <SelectItem value="FAILED">Failed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="grid gap-4">
        {isLoading
          ? // Skeleton loader
            Array.from({ length: 3 }).map((_, index) => (
              <Card key={index} className="overflow-hidden">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <Skeleton className="h-5 w-[120px]" />
                  <Skeleton className="h-6 w-[100px]" />
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <div key={i} className="space-y-2">
                        <Skeleton className="h-4 w-20" />
                        <Skeleton className="h-5 w-24" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))
          : filteredTransactions.map((transaction) => (
              <Card
                key={transaction.id}
                className="overflow-hidden hover:shadow-lg hover:bg-secondary/50 transition-colors duration-200"
              >
                <CardHeader className="flex flex-row items-center justify-between space-y-3 pb-2">
                  <CardTitle className="text-base font-medium">
                    Order #{transaction.orderId}
                  </CardTitle>
                  <Badge
                    variant="secondary"
                    className={getStatusColor(transaction.status)}
                  >
                    {transaction.status.charAt(0) +
                      transaction.status.slice(1).toLowerCase()}
                  </Badge>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-5">
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Amount</p>
                      <p className="font-medium">
                        {formatAmount(transaction.amount, transaction.currency)}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Plan</p>
                      <p className="font-medium">{transaction.plan.toUpperCase()}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">
                        Date & Time
                      </p>
                      <p className="font-medium">
                        {format(new Date(transaction.createdAt), "MMM d, yyyy")}
                        <span className="text-sm text-muted-foreground ml-2">
                          {format(new Date(transaction.createdAt), "h:mm a")}
                        </span>
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">
                        Payment ID
                      </p>
                      <p className="font-medium">{transaction.paymentId}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">
                        Last Updated
                      </p>
                      <p className="font-medium">
                        {format(
                          new Date(transaction.updatedAt),
                          "MMM d, h:mm a"
                        )}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

        {!isLoading && filteredTransactions.length === 0 && (
          <div className="mt-8 flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
            <h3 className="mt-4 text-lg font-semibold">
              No transactions found
            </h3>
            <p className="text-sm text-muted-foreground">
              Try adjusting your search or filter to find what you're looking
              for.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
