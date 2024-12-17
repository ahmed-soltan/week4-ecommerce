import React, { useState } from "react";
import Image from "next/image";
import { LuLoader2 } from "react-icons/lu";

import { Button } from "@/components/ui/button";
import ApplyCoupon from "@/components/apply-coupon";
import PaymentOptions from "./payment-options";

import { useCart } from "@/hooks/use-cart";

import { formatPrice } from "@/lib/format-price";

const CheckoutDetails = ({
  form,
  isLoading,
}: {
  form: any;
  isLoading: boolean;
}) => {
  const { cartData } = useCart();


  if (!cartData) {
    return null;
  }

  const cartHasDiscount =
    cartData.cart.priceAfterCoupon &&
    cartData.cart.priceAfterCoupon <= cartData.cart.total;


  return (
    <div className="gap-5 flex flex-col items-start w-full max-w-[500px] mx-auto lg:mr-auto lg:ml-0">
      {cartData.cart.cartItems.map((item) => (
        <div
          key={item.id}
          className="flex items-center justify-between gap-2 w-full"
        >
          <div className="flex items-center gap-3 w-full max-w-[300px]">
            <Image
              src={item.selectedImage?.image || "/placeholder.png"}
              alt={item.product?.name || "Product"}
              width={50}
              height={50}
            />
            <h1 className="text-sm truncate">{item.product?.name}</h1>
          </div>
          <span className="text-sm">{formatPrice(item.total)}</span>
        </div>
      ))}
      <div className="flex flex-col items-start gap-4 w-full my-5">
        <div className="pb-3 flex items-center justify-between border-b-2 w-full">
          <p className="text-base font-thin">Subtotal</p>
          {cartHasDiscount ? (
            <div className="flex items-center gap-2">
              <span className="text-sm text-red font-semibold">
                {formatPrice(cartData.cart.priceAfterCoupon!)}
              </span>
              <span className="text-sm text-gray-600 line-through">
                {formatPrice(cartData.cart.total)}
              </span>
            </div>
          ) : (
            <span className="text-sm">{formatPrice(cartData.cart.total)}</span>
          )}
        </div>
        <div className="pb-3 flex items-center justify-between border-b-2 w-full">
          <p className="text-base font-thin">Shipping</p>
          <span className="text-sm">Free</span>
        </div>
        <div className="pb-3 flex items-center justify-between w-full">
          <p className="text-base font-thin">Total</p>

          {cartHasDiscount ? (
            <div className="flex items-center gap-2">
              <span className="text-sm text-red font-semibold">
                {formatPrice(cartData.cart.priceAfterCoupon!)}
              </span>
              <span className="text-sm text-gray-600 line-through">
                {formatPrice(cartData.cart.total)}
              </span>
            </div>
          ) : (
            <span className="text-sm">{formatPrice(cartData.cart.total)}</span>
          )}
        </div>
      </div>
      <PaymentOptions form={form} />
      <ApplyCoupon />
      <Button
        className="w-full max-w-[200px] h-12 rounded-sm flex items-center gap-2"
        size={"lg"}
        variant={"destructive"}
        disabled={cartData.cart.cartItems.length === 0 || isLoading}
        type="submit"
      >
        {isLoading && <LuLoader2 className="w-4 h-4 animate-spin" />}
        Place Order
      </Button>
    </div>
  );
};

export default CheckoutDetails;
