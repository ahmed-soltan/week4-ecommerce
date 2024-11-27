"use client";

import useCartStore from "@/app/store/cart-store";
import { PropsWithChildren, useEffect } from "react";

export const CartProvider = ({ children }: PropsWithChildren) => {
  const initializeCart = useCartStore(
    (state) => state.initializeCartFromLocalStorage
  );

  useEffect(() => {
    initializeCart();
  }, [initializeCart]);

  return <>{children}</>;
};
