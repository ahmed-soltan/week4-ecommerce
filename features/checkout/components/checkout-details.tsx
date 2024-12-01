import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "@/hooks/use-cart";
import { useCurrentUser } from "@/hooks/use-current-user";
import { formatPrice } from "@/lib/format-price";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { LuLoader2 } from "react-icons/lu";

const CheckoutDetails = () => {
  const [coupon, setCoupon] = useState("");
  const [error, setError] = useState("");
  const { cartData, applyCoupon, isApplyingCoupon } = useCart();
  const router = useRouter();
  const user = useCurrentUser();

  if (!cartData) {
    return null;
  }

  const cartHasDiscount =
    cartData.cart.priceAfterCoupon &&
    cartData.cart.priceAfterCoupon <= cartData.cart.total;

  const handleApplyingCoupon = () => {
    if (coupon.trim().length === 0) {
      setError("Coupon code cannot be empty");
      return;
    }
    applyCoupon({ coupon, cartId: cartData.cart.id });
  };

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
      <div className="flex items-center gap-5 w-full">
        <Input
          className="w-full max-w-[400px] h-12 border-black"
          placeholder="Coupon Code"
          onChange={(e) => setCoupon(e.target.value)}
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

export default CheckoutDetails;
