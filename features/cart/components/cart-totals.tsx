"use client";

import React, { useState } from "react";
import { LuLoader2 } from "react-icons/lu";
import { useRouter } from "next/navigation";

import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { useCart } from "@/hooks/use-cart";
import { useCurrentUser } from "@/hooks/use-current-user";

import useCartStore from "@/store/cart-store";

import { formatPrice } from "@/lib/format-price";

const CartTotals = () => {
  const [redirectToCheckout, setRedirectToCheckout] = useState(false);
  const router = useRouter();

  const { cartData } = useCart();
  const { total } = useCartStore();
  const user = useCurrentUser();

  if (!cartData) {
    return null;
  }

  const cartTotal = user ? cartData?.cart.total : total;

  const handleRedirectToCheckout = () => {
    setRedirectToCheckout(true);
    router.push("/checkout");
  };

  return (
    <div className="flex items-start justify-center md:justify-between flex-wrap md:flex-nowrap w-full gap-5">
      <div className="flex items-center justify-center md:justify-start gap-3 w-full">
        <Input
          placeholder="Coupon Code"
          className="h-12 w-full max-w-[250px] border-black"
        />
        <Button variant={"destructive"} size={"lg"} className="rounded-sm h-12">
          Apply Coupon
        </Button>
      </div>
      <div className="rounded-sm border border-black p-4 flex flex-col items-start gap-5 w-full max-w-[470px]">
        <h1 className="text-xl font-semibold text-black">Cart Total</h1>
        <div className="flex items-center justify-between w-full">
          <h1>Subtotal:</h1>
          <p className="font-medium text-black">{formatPrice(cartTotal)}</p>
        </div>
        <Separator />
        <div className="flex items-center justify-between w-full">
          <h1>Shipping:</h1>
          <p className="font-medium text-black">{formatPrice(0)}</p>
        </div>
        <Separator />
        <div className="flex items-center justify-between w-full">
          <h1>Total:</h1>
          <p className="font-medium text-black">{formatPrice(cartTotal)}</p>
        </div>
        <Button
          variant={"destructive"}
          size={"lg"}
          className="mx-auto rounded-sm w-full max-w-[300px] h-12 flex items-center gap-2"
          disabled={redirectToCheckout || cartData.cart.cartItems.length === 0}
          onClick={handleRedirectToCheckout}
        >
          {redirectToCheckout && <LuLoader2 className="w-4 h-4 animate-spin" />}
          Process to Checkout
        </Button>
      </div>
    </div>
  );
};

export default CartTotals;
