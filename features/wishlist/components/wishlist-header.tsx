"use client";

import React from "react";
import { LuLoader2 } from "react-icons/lu";

import useWishlistStore from "@/app/store/wishlist-store";

import { useCurrentUser } from "@/hooks/use-current-user";
import { useWishlist } from "@/hooks/use-wishlist";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";
import useCartStore from "@/app/store/cart-store";
import Link from "next/link";

const WishlistHeader = () => {
  const {
    wishlistProductsLength,
    wishlistData,
    flashWishlist,
    isFlashingWishlist,
  } = useWishlist();
  const { WishlistLength, wishlistItems, clearWishlist } = useWishlistStore();
  const { addToCart: AddToCartDB, isAddingToCart } = useCart();
  const { addToCart: AddToCartLocalStorage } = useCartStore();
  const user = useCurrentUser();

  if (wishlistData?.products.length === 0 && wishlistItems.length === 0) {
    return (
      <div className="flex items-center justify-center flex-col gap-5 my-10 w-full">
        <h1 className="text-md text-slate-700 text-center italic">
          You Haven't Added any Product to Your Wishlist!{" "}
        </h1>
        <Button variant={"destructive"} className="w-32 h-12" asChild>
          <Link href={`/products`}>Start Shopping</Link>
        </Button>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (user) {
      for (let item of wishlistData?.products!) {
        AddToCartDB({
          productId: item.id,
          quantity: 1,
          selectedImage: item.images[0],
          sizes: item.sizes || [],
        });
        flashWishlist({ wishlistId: wishlistData?.id! });
      }
    } else {
      for (let item of wishlistData?.products!) {
        AddToCartLocalStorage({
          product: item,
          quantity: 1,
          selectedImage: item.images[0],
          sizes: item.sizes || [],
        });
      }
      clearWishlist();
    }
  };

  return (
    <div className="flex items-center justify-between w-full">
      <h1 className="text-lg font-medium">
        Wishlist ({user ? wishlistProductsLength : WishlistLength()})
      </h1>
      <Button
        variant={"outline"}
        size={"lg"}
        className="h-12 w-40 text-black"
        onClick={handleAddToCart}
        disabled={isFlashingWishlist || isAddingToCart}
      >
        {(isFlashingWishlist || isAddingToCart) && (
          <LuLoader2 className="w-4 h-4 animate-spin" />
        )}
        {(!isFlashingWishlist || !isAddingToCart) && "Move All To Bag"}
      </Button>
    </div>
  );
};

export default WishlistHeader;
