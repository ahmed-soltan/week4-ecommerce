"use client";

import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { toast } from "./use-toast";

import { Cart, CartItem } from "@prisma/client";

type CartType = {
  cart: Cart & {
    cartItems: CartItem[];
  };
};

const addToCartApi = async ({
  productId,
  quantity,
}: {
  productId: string;
  quantity: number;
}) => {
  const response = await axios.post("/api/cart", {
    productId,
    quantity,
  });

  return response.data;
};

const fetchCart = async (): Promise<CartType> => {
  const response = await axios.get(`/api/cart`);
  return response.data;
};

export const useCart = () => {
  const queryClient = useQueryClient();

  const { data: cartData, refetch: refetchCart } = useQuery<CartType>({
    queryKey: ["cart"],
    queryFn: fetchCart,
    staleTime: Infinity,
  });

  const {
    mutate: addToCart,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: addToCartApi,
    onSuccess: () => {
      refetchCart();

      toast({
        title: "Product added successfully",
        description: "Check your cart to see the updated item.",
        variant: "success",
      });
    },
    onError: () => {
      toast({
        title: "Something went wrong",
        variant: "destructive",
      });
    },
  });

  const cartItemsLength =
    cartData?.cart.cartItems.reduce((sum, item) => sum + item.quantity, 0) || 0;

  return {
    addToCart,
    isError,
    error,
    cartItemsLength,
    cartData,
    isPending,
  };
};
