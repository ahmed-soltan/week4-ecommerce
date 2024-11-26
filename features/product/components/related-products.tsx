"use client";

import { Skeleton } from "@/components/ui/skeleton";
import CarouselProducts from "@/components/carousel-products";

import { useRelatedProducts } from "../hooks/use-related-products";

interface RelatedProductsProps {
  productId: string;
}

const RelatedProducts = ({ productId }: RelatedProductsProps) => {
  const { relatedProducts, isLoading: isLoadingRelatedProducts } =
    useRelatedProducts({ productId });

  if (isLoadingRelatedProducts) {
    return (
      <div className="flex items-center gap-4 flex-wrap">
        <Skeleton className="w-full max-w-[270px] h-[350px]" />
        <Skeleton className="w-full max-w-[270px] h-[350px]" />
        <Skeleton className="w-full max-w-[270px] h-[350px]" />
      </div>
    );
  }

  if (!relatedProducts || relatedProducts.length === 0) {
    return null;
  }

  return (
    <CarouselProducts
      products={relatedProducts}
      topHeaderTitle="Related Item"
    />
  );
};

export default RelatedProducts;
