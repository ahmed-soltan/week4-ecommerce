"use client";

import Image from "next/image";
import Link from "next/link";

import TopHeaderSection from "./top-header-section";
import Heading from "./heading";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { useCategories } from "@/hooks/use-categories";

const CarouselCategories = () => {
  const { categories } = useCategories();

  return (
    <div className="flex flex-col items-start gap-8 w-full">
      <div className="flex items-center justify-between w-full">
        <TopHeaderSection title={"Categories"} />
      </div>
      <Carousel className="w-full">
        <div className="flex items-center justify-between w-full">
          <Heading title={"Browse By Category"} />
          <div className="flex items-center gap-5">
            <CarouselPrevious className="w-10 h-10 bg-[#F5F5F5]" />
            <CarouselNext className="w-10 h-10 bg-[#F5F5F5]" />
          </div>
        </div>
        <CarouselContent className="ml-2 gap-2">
          {categories?.map((category) => (
            <CarouselItem
              key={category.id}
              className="w-full max-w-[240px] h-[170px] border-2 rounded-md"
            >
              <Link
                href={`/products?categoryId=${category.id}`}
                className="flex flex-col items-center justify-center gap-4"
              >
                <Image
                  src={category.image}
                  alt={category.name}
                  width={100}
                  height={100}
                  className=""
                />
                <h1 className="text-md">{category.name}</h1>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default CarouselCategories;
