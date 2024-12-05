"use client";

import React from "react";

import { useOrders } from "@/hooks/use-orders";
import { Skeleton } from "@/components/ui/skeleton";
import OrderCard from "../order-card";

const ReturnsList = () => {
  const { returns , isLoadingReturns } = useOrders();

  if (isLoadingReturns) {
    return (
      <div className="flex h-full items-center justify-center w-full gap-3">
        <Skeleton className="w-full h-32 rounded-sm" />
        <Skeleton className="w-full h-32 rounded-sm" />
        <Skeleton className="w-full h-32 rounded-sm" />
      </div>
    );
  }

  if (!returns || returns.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center text-gray-500 space-y-4 w-full">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-16 h-16 text-gray-300"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 17h5l-1.403 1.402M5 7h14M5 17h5l-1.403 1.402"
          />
        </svg>
        <p className="text-xl">No orders found.</p>
      </div>
    );
  }
  return (
    <div className="flex items-center gap-5 w-full flex-wrap justify-center md:justify-start">
      {returns?.map((order) => (
        <OrderCard key={order.id} order={order} />
      ))}
    </div>
  );
};

export default ReturnsList;
