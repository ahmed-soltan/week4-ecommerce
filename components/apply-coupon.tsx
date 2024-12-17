import React, { useState } from "react";
import { LuLoader2 } from "react-icons/lu";

import { Input } from "./ui/input";
import { Button } from "./ui/button";

import { useCart } from "@/hooks/use-cart";

const ApplyCoupon = () => {
  const [coupon, setCoupon] = useState("");
  const [error, setError] = useState("");
  const { cartData, applyCoupon, isApplyingCoupon } = useCart();

  if (!cartData) return null;

  const handleApplyingCoupon = () => {
    if (coupon.trim().length === 0) {
      setError("Coupon code cannot be empty");
      return;
    }
    applyCoupon({ coupon, cartId: cartData.cart.id });
    setCoupon("");
  };

  const cartHasDiscount =
    cartData.cart.priceAfterCoupon &&
    cartData.cart.priceAfterCoupon <= cartData.cart.total;

  return (
    <div className="flex flex-col items-start gap-3 w-full">
      <div className="flex items-center gap-5 w-full">
        <Input
          className="w-full max-w-[300px] h-12 border-black"
          placeholder="Coupon Code"
          onChange={(e) => setCoupon(e.target.value)}
          disabled={!!cartHasDiscount}
          value={coupon}
        />
        <Button
          variant={"destructive"}
          className="h-12 rounded-sm w-full max-w-[200px] flex items-center gap-2"
          size={"lg"}
          onClick={handleApplyingCoupon}
          disabled={isApplyingCoupon || !!cartHasDiscount}
          type="button"
        >
          {isApplyingCoupon && <LuLoader2 className="w-4 h-4 animate-spin" />}
          Apply Coupon
        </Button>
      </div>
      {error && <p className="text-sm text-red">{error}</p>}
      {cartHasDiscount && <p className="text-sm text-red">Coupon Applied</p>}
    </div>
  );
};

export default ApplyCoupon;
