"use client";

import useWishlistStore from "@/app/store/wishlist-store";
import ProductCard from "@/components/product-card";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useWishlist } from "@/hooks/use-wishlist";

const WishlistProducts = () => {
  const { wishlistData } = useWishlist();
  const { wishlistItems } = useWishlistStore();
  const user = useCurrentUser();

  console.log(wishlistData)

  const wishlistProducts = user
    ? wishlistData?.products
    : wishlistItems;
    
  return (
    <div className="flex items-center flex-wrap justify-center md:justify-start gap-5 w-full">
      {wishlistProducts?.map((product) => (
        <ProductCard key={product.id} product={product} inWishlist/>
      ))}
    </div>
  );
};

export default WishlistProducts;
