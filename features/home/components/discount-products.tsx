"use client";

import Link from "next/link";

import TopHeaderSection from "./top-header-section";
import Heading from "./heading";
import ProductCard from "@/components/product-card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

import { useFetchDiscountProducts } from "@/hooks/use-fetch-discount-products";

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
    <div className="flex flex-col items-start gap-8">
      <TopHeaderSection title="Today's" />
      <Heading title="Flash Sales" />
      <div className="flex items-center gap-4 flex-wrap justify-center md:justify-start">
        {discountProducts?.slice(0,7).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <Button
        variant={"destructive"}
        size={"lg"}
        className="text-md rounded-none mx-auto"
        asChild
      >
        <Link href={`/products`}>View All Products</Link>
      </Button>
    </div>
  );
};

export default DiscountProducts;
