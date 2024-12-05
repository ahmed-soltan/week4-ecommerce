"use client";

import ProductCard from "@/components/product-card";
import { Skeleton } from "@/components/ui/skeleton";

import { useFetchProducts } from "@/hooks/use-fetch-products";
import { useFilters } from "../hooks/use-filters";

const ProductsList = () => {
  const { params } = useFilters();
  const { products, isLoading, isFetching } = useFetchProducts(params);

  if (isLoading || isFetching || !params) {
    return (
      <div className="flex items-center flex-wrap justify-center md:justify-start gap-5 w-full col-span-1 md:col-span-2 lg:col-span-4">
        <Skeleton className="min-w-[240px] h-[170px] border-2 rounded-md" />
        <Skeleton className="min-w-[240px] h-[170px] border-2 rounded-md" />
        <Skeleton className="min-w-[240px] h-[170px] border-2 rounded-md" />
        <Skeleton className="min-w-[240px] h-[170px] border-2 rounded-md" />
        <Skeleton className="min-w-[240px] h-[170px] border-2 rounded-md" />
      </div>
    );
  }

  return (
    <div className="flex items-center flex-wrap justify-center md:justify-start gap-5 w-full col-span-1 md:col-span-2 lg:col-span-4">
      {products.map((product) => (
        <ProductCard product={product} key={product.id} />
      ))}
    </div>
  );
};

export default ProductsList;
