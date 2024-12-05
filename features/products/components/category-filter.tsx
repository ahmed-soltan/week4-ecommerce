import { Checkbox } from "@/components/ui/checkbox";
import { Skeleton } from "@/components/ui/skeleton";
import { useCategories } from "@/hooks/use-categories";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useFilters } from "../hooks/use-filters";

const CategoryFilter = () => {
  const { categories, isLoading } = useCategories();
  const { filters, updateFilter } = useFilters();
  const searchParams = useSearchParams();
  const router = useRouter();

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  useEffect(() => {
    const categoryIdFilter = filters.categoryId;

    if (Array.isArray(categoryIdFilter)) {
      setSelectedCategories(categoryIdFilter);
    } else if (typeof categoryIdFilter === "string") {
      setSelectedCategories([categoryIdFilter]);
    }
  }, [filters.categoryId]);

  const handleCategoryChange = (categoryId: string) => {
    let updatedCategories: string[];

    if (selectedCategories.includes(categoryId)) {
      updatedCategories = selectedCategories.filter((id) => id !== categoryId);
    } else {
      updatedCategories = [...selectedCategories, categoryId];
    }

    setSelectedCategories(updatedCategories);

    updateFilter("categoryId", updatedCategories);

    const params = new URLSearchParams(searchParams.toString());
    if (updatedCategories.length > 0) {
      params.delete("categoryId");
      updatedCategories.forEach((id) => params.append("categoryId", id));
    } else {
      params.delete("categoryId");
    }

    router.push(`/products?${params.toString()}`);
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-start gap-4 md:mt-10 p-2 w-full h-full">
        {Array.from({ length: 10 }).map((_, index) => (
          <Skeleton className="w-full max-w-[150px] h-4" key={index} />
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-start gap-4 p-2 w-full h-full">
      <h1 className="text-2xl font-medium">Filter By Category</h1>
      {categories?.map((category) => (
        <div className="flex items-center space-x-2" key={category.id}>
          <Checkbox
            id={category.id}
            checked={selectedCategories.includes(category.id)}
            onCheckedChange={() => handleCategoryChange(category.id)}
          />
          <label
            htmlFor={category.id}
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {category.name}
          </label>
        </div>
      ))}
    </div>
  );
};

export default CategoryFilter;
