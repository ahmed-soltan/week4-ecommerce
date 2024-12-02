"use client";

import { Separator } from "@/components/ui/separator";
import { useOrders } from "@/hooks/use-orders";
import Image from "next/image";

const OrderDetails = () => {
  const { order, isLoadingOrderById } = useOrders();

  if (isLoadingOrderById) {
    return <div>Loading...</div>;
  }

  if (!order) {
    return <div>No order found.</div>;
  }

  return (
    <div className="flex items-start flex-col gap-5 w-full">
      <h1 className="text-3xl font-medium">Order Info</h1>
      <div className="flex items-start flex-col gap-3">
        <h1>
          Your Address:{" "}
          <span className="text-gray-600">
            {order.city},{order.streetAddress} {order.apartment}
          </span>
        </h1>
        <h1>
          Your Phone Number:{" "}
          <span className="text-gray-600">{order.phoneNumber}</span>
        </h1>
        <h1>
          Your Email: <span className="text-gray-600">{order.email}</span>
        </h1>
      </div>
      <Separator />
      <div className="flex items-center gap-2 w-full">
        {order.orderItems.map((item) => (
          <div className="flex items-start flex-col gap-2 w-full max-w-[280px]">
            <Image
              src={item.selectedImage.image}
              alt={item.product.name}
              width={100}
              height={100}
              className="w-full h-[200px]"
            />
            <h1 className="line-clamp-2">{item.product.name}</h1>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderDetails;
