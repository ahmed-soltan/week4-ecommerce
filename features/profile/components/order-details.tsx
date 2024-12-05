"use client";

import ConfirmModal from "@/components/confirm-modal";
import Hint from "@/components/hint";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useOrders } from "@/hooks/use-orders";
import { formatPrice } from "@/lib/format-price";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { LuLoader2 } from "react-icons/lu";
import { TbTruckReturn } from "react-icons/tb";
import { TbBasketCancel } from "react-icons/tb";

const OrderDetails = () => {
  const [cancel, setCancel] = useState(false);
  const [refund, setRefund] = useState(false);
  const {
    order,
    isLoadingOrderById,
    cancelOrder,
    isCancellingOrder,
    isReturningOrder,
    returnOrder,
  } = useOrders();

  if (isLoadingOrderById) {
    return (
      <div className="flex h-full items-center justify-center w-full gap-3">
        <LuLoader2 className="w-6 h-6 animate-spin" />
      </div>
    );
  }

  if (!order) {
    return <div>No order found.</div>;
  }

  const isDelivered =
    order.isDelivered && !order.isCanceled && !order.isRefunded;
  const isCanceled = order.isCanceled;
  const isRefunded = order.isRefunded && !order.isDelivered;

  return (
    <>
      <ConfirmModal
        open={cancel}
        setOpen={setCancel}
        isLoading={isCancellingOrder}
        title="Are Your Sure You Want to Cancel The Order?!"
        message="This Action Can not be undone"
        callbackFn={() => cancelOrder(order.id)}
      />
      <ConfirmModal
        open={refund}
        setOpen={setRefund}
        isLoading={isReturningOrder}
        title="Are Your Sure You Want To Return The Order?!"
        message="By clicking this button your Order will be returned and your money will be refunded within 2 days"
        callbackFn={() => returnOrder(order.id)}
      />
      <div className="flex items-start flex-col gap-5 w-full relative group">
        <Link
          href={
            isCanceled
              ? "/profile/cancellation"
              : isRefunded
              ? "/profile/returns"
              : "/profile/orders"
          }
          className="text-sky-600 text-sm flex items-center hover:underline"
        >
          <FaArrowLeft className="w-3 h-3 mr-2" />
          View Other Orders
        </Link>
        <div className="flex items-center gap-4 flex-wrap">
          <h1 className="text-3xl font-medium">Order Info </h1>
          <Badge
            variant={
              isDelivered
                ? "success"
                : isCanceled
                ? "destructive"
                : isRefunded
                ? "default"
                : "secondary"
            }
            className="rounded-full"
          >
            {isDelivered
              ? "Shipped"
              : isCanceled
              ? "Canceled"
              : isRefunded
              ? "Refunded"
              : "Not Shipped"}
          </Badge>
        </div>
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
          <h1>
            Total Amount:{" "}
            <span className="text-gray-600">{formatPrice(order.total)}</span>
          </h1>
        </div>
        <Separator />
        <h1 className="text-3xl font-medium text-left mb-3">Order Items</h1>
        <div className="flex items-center justify-center md:justify-start gap-5 w-full flex-wrap">
          {order.orderItems.map((item) => (
            <div
              className="w-full max-w-[270px] min-w-[200px] h-full relative p-0 border-0 shadow-none cursor-pointer flex flex-col items-start gap-3"
              key={item.id}
            >
              <Image
                src={item.selectedImage.image}
                alt={item.product.name}
                width={100}
                height={100}
                className="w-full h-[200px]"
              />
              <h1 className="line-clamp-2">{item.product.name}</h1>
              <div className="flex items-center justify-between w-full">
                <p>{formatPrice(item.total)}</p>
                <p className="px-2 text-xs py-1 bg-slate-200 rounded-full text-center">
                  {item.quantity}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="opacity-0 group-hover:opacity-100 absolute top-0 right-0 sm:top-2 sm:right-2 flex items-center gap-2">
          {order.isDelivered && !order.isRefunded && (
            <Hint label="Return Order" align="center" side="top">
              <Button
                variant={"outline"}
                className="flex items-center gap-2"
                onClick={() => setRefund(true)}
              >
                <TbTruckReturn className="w-5 h-5" />
                <span className="hidden sm:block">Return Order</span>
              </Button>
            </Hint>
          )}
          {!order.isDelivered && !order.isCanceled && (
            <Hint label="Cancel Order" align="center" side="top">
              <Button
                variant={"destructive"}
                onClick={() => setCancel(true)}
                className="flex items-center gap-2"
              >
                <TbBasketCancel className="w-5 h-5" />
                <span className="hidden sm:block">Cancel Order</span>
              </Button>
            </Hint>
          )}
        </div>
      </div>
    </>
  );
};

export default OrderDetails;
