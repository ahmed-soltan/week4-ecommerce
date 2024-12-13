import { create } from "zustand";

import { Product } from "@/types";
import { toast } from "@/hooks/use-toast";

interface WishlistState {
  wishlistItems: Product[];
  total: number;
  addToWishlist: ({ product }: { product: Product }) => void;
  removeFromWishlist: (id: string) => void;
  WishlistLength: () => number;
  initializeWishlistFromLocalStorage: () => void;
  clearWishlist: () => void;
}


const useWishlistStore = create<WishlistState>((set: any, get: any) => ({
  wishlistItems: [],
  total: 0,

  initializeWishlistFromLocalStorage: () => {
    if (typeof window !== "undefined") {
      const savedWishlistItems = localStorage.getItem("wishlist");

      if (savedWishlistItems) {
        set({ wishlistItems: JSON.parse(savedWishlistItems) });
      }
    }
  },

  addToWishlist: ({ product }: { product: Product }) => {
    const currentItems: Product[] = get().wishlistItems;

    const existingItem = currentItems.find(
      (WishlistItem) => WishlistItem.id === product.id
    );

    let updatedItems;
    if (existingItem) {
      return;
    } else {
      updatedItems = [
        ...currentItems,
        {
          ...product,
        },
      ];
    }

    set({ wishlistItems: updatedItems });
    toast({
      title: "Item added to Wishlist",
      description: "You've added an item to your wishlist.",
      variant: "success",
    })

    if (typeof window !== "undefined") {
      localStorage.setItem("wishlist", JSON.stringify(updatedItems));
    }
  },

  removeFromWishlist: (id: string) => {
    const currentItems: Product[] = get().wishlistItems;

    const updatedItems = currentItems.filter(
      (WishlistItem) => WishlistItem.id !== id
    );

    set({ wishlistItems: updatedItems });
    toast({
      title: "Item removed from Wishlist",
      description: "You've removed an item from your wishlist.",
      variant: "success",
    })

    if (typeof window !== "undefined") {
      localStorage.setItem("wishlist", JSON.stringify(updatedItems));
    }
  },

  clearWishlist: () => {
    set({ wishlistItems: [] });

    if (typeof window !== "undefined") {
      localStorage.removeItem("wishlist");
    }
  },

  WishlistLength: () => {
    const currentItems: Product[] = get().wishlistItems;
    return currentItems.length;
  },
}));

useWishlistStore.getState().initializeWishlistFromLocalStorage();

export default useWishlistStore;
