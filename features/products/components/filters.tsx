"use client";

import { Separator } from "@/components/ui/separator";
import CategoryFilter from "./category-filter";
import PriceFilter from "./price-filter";

const Filters = () => {
  return (
    <div className="flex flex-col items-start gap-5">
      <CategoryFilter />
      <Separator className="w-full max-w-[200px]"/>
      <PriceFilter />
    </div>
  );
};

export default Filters;
