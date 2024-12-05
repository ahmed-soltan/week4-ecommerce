"use client";

import CategoryFilter from "./category-filter";
import PriceFilter from "./price-filter";

const Filters = () => {
  return (
    <div className="flex flex-col items-start gap-5">
      <CategoryFilter />
      <PriceFilter />
    </div>
  );
};

export default Filters;
