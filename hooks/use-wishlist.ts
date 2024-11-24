"use client";

import { useState } from "react";

export const useWishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const wishlistItemsLength = wishlist.length;

  return {
    wishlistItemsLength,
    wishlist,
  };
};
