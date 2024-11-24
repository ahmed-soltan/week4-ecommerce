"use client";

import Link from "next/link";

import TopHeaderSection from "./top-header-section";
import Heading from "./heading";
import ProductCard from "@/components/product-card";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { Product } from "@/types";
import { useRouter } from "next/navigation";

interface CarouselProductsProps {
  products: Product[];
  topHeaderTitle: string;
  headingTitle: string;
}

const CarouselProducts = ({
  products,
  topHeaderTitle,
  headingTitle,
}: CarouselProductsProps) => {
  const router = useRouter();

  return (
    <div className="flex flex-col items-start gap-8 w-full">
      <div className="flex items-center justify-between w-full">
        <TopHeaderSection title={topHeaderTitle} />
      </div>
      <Carousel className="w-full">
        <div className="flex items-center justify-between flex-wrap w-full">
          <Heading title={headingTitle} />
          <div className="hidden sm:flex items-center gap-5 ">
            <CarouselPrevious className="w-10 h-10 bg-[#F5F5F5]" />
            <CarouselNext className="w-10 h-10 bg-[#F5F5F5]" />
          </div>
        </div>
        <CarouselContent className="-ml-1 gap-5">
          {products?.slice(0, 7).map((product) => (
            <CarouselItem
              key={product.id}
              className="w-full max-w-[270px] min-w-[200px]"
              onClick={() => {
                router.push(`/product/${product.id}`);
              }}
            >
              <ProductCard product={product} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
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

export default CarouselProducts;
