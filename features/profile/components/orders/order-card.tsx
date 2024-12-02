import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/format-price";
import { Order } from "@prisma/client";
import Link from "next/link";
import React from "react";
import { FiExternalLink } from "react-icons/fi";

interface OrderCardProps {
  order: Order;
}

const OrderCard = ({ order }: OrderCardProps) => {
  return (
    <div className="border rounded-md pb-5 px-3 pt-2 w-full max-w-[350px] flex flex-col items-start gap-3">
      <div className="flex items-center justify-between w-full">
        <Badge variant={order.isDelivered ? "success" : "secondary"} className="rounded-full">
          {order.isDelivered ? "Shipped" : "Not Shipped"}
        </Badge>
        <Button variant={"outline"} size={"icon"} asChild>
          <Link href={`/profile/orders/${order.id}`}>
            <FiExternalLink className="w-4 h-4" />
          </Link>
        </Button>
      </div>
      <div className="flex items-start flex-col">
        <h2 className="font-medium text-lg text-black">{order.id}</h2>
        <p className="text-sm text-gray-600">{formatPrice(order.total)}</p>
        <p className="text-sm text-gray-600">
          {new Date(order.createdAt).toLocaleString()}
        </p>
      </div>
    </div>
  );
};

export default OrderCard;
