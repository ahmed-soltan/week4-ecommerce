"use client";

import Link from "next/link";

import ProductCard from "@/components/product-card";
import Heading from "./heading";
import TopHeaderSection from "./top-header-section";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { useHomeProducts } from "@/features/home/hooks/use-home-products";

const BestSellingProducts = () => {
  const { products, isLoading } = useHomeProducts();

  if (isLoading || !products) {
    return (
      <div className="flex items-center justify-center md:justify-start gap-4 flex-wrap w-full">
        <Skeleton className="w-full max-w-[270px] h-[350px]" />
        <Skeleton className="w-full max-w-[270px] h-[350px]" />
        <Skeleton className="w-full max-w-[270px] h-[350px]" />
        <Skeleton className="w-full max-w-[270px] h-[350px]" />
        <Skeleton className="w-full max-w-[270px] h-[350px]" />
      </div>
    );
  }

  const bestSellingProducts = products
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 5);

  return (
    <div className="flex flex-col items-start gap-8 w-full">
      <div className="flex items-center justify-between w-full">
        <TopHeaderSection title={"This Month"} />
      </div>
      <div className="flex items-start justify-between w-full flex-wrap gap-5">
        <Heading title={"Best Selling Products"} />
        <Button
          variant={"destructive"}
          size={"lg"}
          className="text-md rounded-none w-full sm:max-w-[200px]"
          asChild
        >
          <Link href={`/products`}>View All</Link>
        </Button>
      </div>
      <div className="flex items-center flex-wrap justify-center lg:justify-start gap-5 w-full">
        {bestSellingProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default BestSellingProducts;
