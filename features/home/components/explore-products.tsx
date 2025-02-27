"use client";

import { Skeleton } from "@/components/ui/skeleton";
import CarouselProducts from "../../../components/carousel-products";
import { useHomeProducts } from "@/features/home/hooks/use-home-products";


const ExploreProducts = () => {
  const { products, isLoading } = useHomeProducts();

  if (isLoading || !products) {
    return (
      <div className="flex items-center gap-4 flex-wrap">
        <Skeleton className="w-full min-w-[270px] h-[350px]" />
        <Skeleton className="w-full min-w-[270px] h-[350px]" />
        <Skeleton className="w-full min-w-[270px] h-[350px]" />
      </div>
    );
  }

  return (
    <CarouselProducts
      products={products}
      topHeaderTitle="Our Products"
      headingTitle="Explore Our Products"
    />
  );
};

export default ExploreProducts;
