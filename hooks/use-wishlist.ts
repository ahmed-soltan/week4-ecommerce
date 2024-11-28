"use client";

import axios from "axios";
import { useMutation, useQuery } from "@tanstack/react-query";

import { toast } from "./use-toast";

import { Wishlist } from "@prisma/client";
import { Product } from "@/types";

type WishlistType = Wishlist & {
  products: Product[];
};

const addToWishlistApi = async ({ productId }: { productId: string }) => {
  const response = await axios.post("/api/wishlist", {
    productId,
  });

  return response.data;
};

const fetchWishlist = async (): Promise<WishlistType> => {
  const response = await axios.get(`/api/wishlist`);
  return response.data;
};

const deleteWishlistProductApi = async ({
  wishlistProductId,
  wishlistId,
}: {
  wishlistProductId: string;
  wishlistId: string;
}) => {
  const response = await axios.delete(
    `/api/wishlist/${wishlistId}/${wishlistProductId}`
  );
  return response.data;
};

const flashWishlistApi = async ({ wishlistId }: { wishlistId: string }) => {
  const response = await axios.delete(`/api/wishlist/${wishlistId}`);
  return response.data;
};

export const useWishlist = () => {
  const { data: wishlistData, refetch: refetchWishlist } =
    useQuery<WishlistType>({
      queryKey: ["wishlist"],
      queryFn: fetchWishlist,
      staleTime: Infinity,
    });

  const {
    mutate: addToWishlist,
    isPending: isAddingToWishlist,
    isError,
    error,
  } = useMutation({
    mutationFn: addToWishlistApi,
    onSuccess: () => {
      refetchWishlist();
      toast({
        title: "Product added successfully",
        description: "Check your wishlist to see the updated item.",
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

  const { mutate: deleteWishlistProduct, isPending: isDeletingItem } =
    useMutation({
      mutationFn: deleteWishlistProductApi,
      onSuccess: () => {
        refetchWishlist();
        toast({
          title: "Wishlist Product deleted",
          description: "The item has been removed from your wishlist.",
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

  const { mutate: flashWishlist, isPending: isFlashingWishlist } = useMutation({
    mutationFn: flashWishlistApi,
    onSuccess: () => {
      refetchWishlist();
      toast({
        title: "Wishlist  flashed",
        description: "The  has been removed from your wishlist.",
        variant: "success",
      });
    },
    onError: () => {
      toast({
        title: "Failed to flash ",
        variant: "destructive",
      });
    },
  });

  const wishlistProductsLength = wishlistData?.products.length || 0;

  return {
    addToWishlist,
    isAddingToWishlist,
    isError,
    error,
    wishlistProductsLength,
    wishlistData,
    deleteWishlistProduct,
    isDeletingItem,
    flashWishlist,
    isFlashingWishlist,
  };
};
