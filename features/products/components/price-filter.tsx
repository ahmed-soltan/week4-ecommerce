import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { ChangeEvent, useState, useEffect } from "react";
import { useFilters } from "../hooks/use-filters";
import { useRouter, useSearchParams } from "next/navigation";

const PriceFilter = () => {
  const { updateFilter } = useFilters();
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const minPriceFromUrl = searchParams.get("minPrice");
    const maxPriceFromUrl = searchParams.get("maxPrice");

    if (minPriceFromUrl) {
      setMinPrice(parseInt(minPriceFromUrl, 10));
    }

    if (maxPriceFromUrl) {
      setMaxPrice(parseInt(maxPriceFromUrl, 10));
    }
  }, [searchParams]);

  const handleSearch = () => {
    updateFilter("minPrice", [minPrice.toString()]);
    updateFilter("maxPrice", [maxPrice.toString()]);

    const params = new URLSearchParams(searchParams.toString());
    if (minPrice > 0) {
      params.set("minPrice", minPrice.toString());
    } else {
      params.delete("minPrice");
    }

    if (maxPrice > 0) {
      params.set("maxPrice", maxPrice.toString());
    } else {
      params.delete("maxPrice");
    }

    router.push(`/products?${params.toString()}`);
  };

  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-2xl font-medium">Filter By Price</h1>
      <div className="flex items-center gap-2">
        <div className="flex flex-col items-start gap-2">
          <Label>Min</Label>
          <Input
            placeholder="Min Price"
            value={minPrice}
            onChange={(e) => setMinPrice(parseInt(e.target.value))}
            type="number"
            className="w-24"
            min={0}
            max={10000}
            step={100}
          />
        </div>
        <div className="flex flex-col items-start gap-2">
          <Label>Max</Label>
          <Input
            placeholder="Max Price"
            value={maxPrice}
            onChange={(e) => setMaxPrice(parseInt(e.target.value))}
            type="number"
            className="w-24"
            min={0}
            max={10000}
            step={100}
          />
        </div>
      </div>
      <Button
        variant={"destructive"}
        size={"lg"}
        className="h-10 w-full"
        type="button"
        onClick={handleSearch}
      >
        Search
      </Button>
    </div>
  );
};

export default PriceFilter;
