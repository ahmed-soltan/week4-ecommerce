"use client";

import useCartStore from "@/store/cart-store";
import { PropsWithChildren, useEffect } from "react";

export const CheckoutProvider = ({ children }: PropsWithChildren) => {
  const initializeCart = useCartStore(
    (state) => state.initializeCartFromLocalStorage
  );

  useEffect(() => {
    initializeCart();
  }, [initializeCart]);

  return <>{children}</>;
};
