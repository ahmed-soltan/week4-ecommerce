import ContainerWrapper from "@/components/container-wrapper";
import WishlistHeader from "@/features/wishlist/components/wishlist-header";
import WishlistProducts from "@/features/wishlist/components/wishlist-products";
import React from "react";

const WishlistPage = () => {
  return (
    <ContainerWrapper className="flex flex-col items-start gap-10">
      <WishlistHeader />
      <WishlistProducts />
    </ContainerWrapper>
  );
};

export default WishlistPage;
