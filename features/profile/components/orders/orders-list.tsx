"use client";

import React from "react";

import { useOrders } from "@/hooks/use-orders";
import OrderCard from "./order-card";
import { Skeleton } from "@/components/ui/skeleton";

const OrdersList = () => {
  const { orders, isLoadingOrders } = useOrders();

  if (isLoadingOrders) {
    return (
      <div className="flex flex-col space-y-4">
        <Skeleton className="w-full h-12 rounded-md" />
        <Skeleton className="w-full h-12 rounded-md" />
        <Skeleton className="w-full h-12 rounded-md" />
        <Skeleton className="w-full h-12 rounded-md" />
      </div>
    );
  }

  if (!orders || orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center text-gray-500 space-y-4">
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
      {orders?.map((order) => (
        <OrderCard key={order.id} order={order} />
      ))}
    </div>
  );
};

export default OrdersList;
