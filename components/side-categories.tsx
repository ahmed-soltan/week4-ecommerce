"use client";

import React from "react";
import Link from "next/link";

import { useCategories } from "@/hooks/use-categories";

import { Skeleton } from "@/components/ui/skeleton";

const SideCategories = () => {
  const { categories, isPending } = useCategories();

  if (isPending) {
    return (
      <div className="flex flex-col items-start w-full gap-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <Skeleton className="w-full" key={index}/>
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-start gap-4 md:mt-10 p-2">
      {categories?.map((category) => (
        <Link
          href={`/products?categoryId=${category.id}`}
          className="text-black font-medium text-md hover:underline"
          key={category.id}
        >
          {category.name}
        </Link>
      ))}
    </div>
  );
};

export default SideCategories;