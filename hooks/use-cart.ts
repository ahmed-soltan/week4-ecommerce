"use client";

import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { toast } from "./use-toast";

import { Cart, CartItem, Image } from "@prisma/client";
import { useCurrentUser } from "./use-current-user";
import { useEffect, useState } from "react";

type CartType = {
  cart: Cart & {
    cartItems: CartItem[];
  };
};

const addToCartApi = async ({
  productId,
  quantity,
  selectedImage,
  sizes,
}: {
  productId: string;
  quantity: number;
  selectedImage: Image;
  sizes?: string[];
}) => {
  const response = await axios.post("/api/cart", {
    productId,
    quantity,
    selectedImage,
    sizes,
  });

  return response.data;
};

const fetchCart = async (): Promise<CartType> => {
  const response = await axios.get(`/api/cart`);
  return response.data;
};

const updateCartItemQuantityApi = async ({
  cartItemId,
  quantity,
}: {
  cartItemId: string;
  quantity: number;
}) => {
  const response = await axios.patch(`/api/cart/${cartItemId}`, {
    quantity,
  });

  return response.data;
};

const deleteCartItemApi = async ({ cartItemId }: { cartItemId: string }) => {
  const response = await axios.delete(`/api/cart/${cartItemId}`);
  return response.data;
};

export const useCart = () => {
  const user = useCurrentUser();

  const { data: cartData, refetch: refetchCart } = useQuery<CartType>({
    queryKey: ["cart"],
    queryFn: fetchCart,
    staleTime: Infinity,
    enabled:!!user
  });

  const { mutate: addToCart, isPending: isAddingToCart } = useMutation({
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

  const { mutate: updateCartItemQuantity, isPending: isUpdatingQuantity } =
    useMutation({
      mutationFn: updateCartItemQuantityApi,
      onSuccess: () => {
        refetchCart();
        toast({
          title: "Quantity updated successfully",
          description: "Your cart has been updated with the new quantity.",
          variant: "success",
        });
      },
      onError: () => {
        toast({
          title: "Failed to update quantity",
          variant: "destructive",
        });
      },
    });

  const { mutate: deleteCartItem, isPending: isDeletingItem } = useMutation({
    mutationFn: deleteCartItemApi,
    onSuccess: () => {
      refetchCart();
      toast({
        title: "Cart item deleted",
        description: "The item has been removed from your cart.",
        variant: "success",
      });
    },
    onError: () => {
      toast({
        title: "Failed to delete item",
        variant: "destructive",
      });
    },
  });

  const cartItemsLength =
    cartData?.cart?.cartItems?.reduce((sum, item) => sum + item.quantity, 0) ||
    0;

  return {
    addToCart,
    updateCartItemQuantity,
    isAddingToCart,
    isUpdatingQuantity,
    cartItemsLength,
    cartData,
    deleteCartItem,
    isDeletingItem,
  };
};
