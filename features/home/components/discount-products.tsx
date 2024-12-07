"use client";

import { Skeleton } from "@/components/ui/skeleton";
import CarouselProducts from "../../../components/carousel-products";

import { useFetchDiscountProducts } from "@/features/home/hooks/use-fetch-discount-products";

const DiscountProducts = () => {
  const { discountProducts, isLoading } = useFetchDiscountProducts();

  if (isLoading || !discountProducts) {
    return (
      <div className="flex items-start gap-8 w-full flex-wrap h-full">
        <Skeleton className="w-[240px] h-[350px] border-2 rounded-md" />
        <Skeleton className="w-[240px] h-[350px] border-2 rounded-md" />
        <Skeleton className="w-[240px] h-[350px] border-2 rounded-md" />
        <Skeleton className="w-[240px] h-[350px] border-2 rounded-md" />
        <Skeleton className="w-[240px] h-[350px] border-2 rounded-md" />
      </div>
    );
  }

  return (
    <CarouselProducts
      products={discountProducts}
      headingTitle="Flash Sales"
      topHeaderTitle="Today's"
    />
  );
};

export default DiscountProducts;
