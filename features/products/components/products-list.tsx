"use client";

import ProductCard from "@/components/product-card";
import { Skeleton } from "@/components/ui/skeleton";

import { useFetchProducts } from "@/hooks/use-fetch-products";
import { useFilters } from "../hooks/use-filters";
import { useState } from "react";
import Pagination from "./pagination";

const ProductsList = () => {
  const [page, setPage] = useState(1);
  const { params } = useFilters();
  const filters = {
    filters: params,
    page,
    limit: 10,
  };
  const { products, isLoading, isFetching , totalPages } = useFetchProducts(filters);
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  if (isLoading || isFetching) {
    return (
      <div className="flex items-center flex-wrap justify-center md:justify-start gap-5 w-full col-span-1 md:col-span-2 lg:col-span-4">
        <Skeleton className="min-w-[280px] h-[270px] border-2 rounded-md" />
        <Skeleton className="min-w-[280px] h-[270px] border-2 rounded-md" />
        <Skeleton className="min-w-[280px] h-[270px] border-2 rounded-md" />
        <Skeleton className="min-w-[280px] h-[270px] border-2 rounded-md" />
        <Skeleton className="min-w-[280px] h-[270px] border-2 rounded-md" />
        <Skeleton className="min-w-[280px] h-[270px] border-2 rounded-md" />
        <Skeleton className="min-w-[280px] h-[270px] border-2 rounded-md" />
        <Skeleton className="min-w-[280px] h-[270px] border-2 rounded-md" />
      </div>
    );
  }

  return (
    <div className=" col-span-1 md:col-span-2 lg:col-span-4">
      <div className="flex items-center flex-wrap justify-center gap-5 w-full">
        {products.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </div>
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default ProductsList;
