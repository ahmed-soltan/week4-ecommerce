"use client";

import { Skeleton } from "@/components/ui/skeleton";
import CarouselProducts from "../../../components/carousel-products";

import { useFetchDiscountProducts } from "@/features/home/hooks/use-fetch-discount-products";

const DiscountProducts = () => {
  const { discountProducts, isLoading } = useFetchDiscountProducts();

  if (isLoading) {
    return (
      <div className="flex items-center gap-4 flex-wrap">
        <Skeleton className="w-full max-w-[270px] h-[350px]" />
        <Skeleton className="w-full max-w-[270px] h-[350px]" />
        <Skeleton className="w-full max-w-[270px] h-[350px]" />
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
