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

// API functions
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
  const queryClient = useQueryClient();

  const { data: cartData, refetch: refetchCart } = useQuery<CartType>({
    queryKey: ["cart"],
    queryFn: fetchCart,
    staleTime: Infinity, 
  });

  const {
    mutate: addToCart,
    isPending: isAddingToCart,
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

  const {
    mutate: updateCartItemQuantity,
    isPending: isUpdatingQuantity,
  } = useMutation({
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

  const {
    mutate: deleteCartItem,
    isPending: isDeletingItem,
  } = useMutation({
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
    cartData?.cart.cartItems.reduce((sum, item) => sum + item.quantity, 0) || 0;

  return {
    addToCart,
    updateCartItemQuantity,
    isAddingToCart,
    isUpdatingQuantity,
    isError,
    error,
    cartItemsLength,
    cartData,
    deleteCartItem,
    isDeletingItem,
  };
};
