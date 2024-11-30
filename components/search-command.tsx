import React, { useState } from "react";
import { RiSearchLine } from "react-icons/ri";
import Image from "next/image";
import Link from "next/link";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";

import { useFetchProducts } from "@/hooks/use-fetch-products";
import { useCategories } from "@/hooks/use-categories";

const SearchCommand = () => {
  const [open, setOpen] = useState(false);
  const { products } = useFetchProducts();
  const { categories } = useCategories();

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="bg-gray-100 text-slate-500 border-0 outline-0 shadow-none p-2 px-4
         flex items-center gap-5 text-xs w-full relative md:pr-10"
      >
        What Are You Looking For?
        <RiSearchLine className="w-4 h-4 text-black absolute right-2" />
      </button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="products">
            {products.map((product) => (
              <CommandItem key={product.id}>
                <Link
                  className="flex items-start gap-2"
                  href={`/product/${product.id}`}
                  onClick={() => setOpen(false)}
                >
                  <Image
                    className="w-6 h-6 object-cover"
                    src={product.images[0].image}
                    alt={product.name}
                    width={20}
                    height={20}
                  />
                  <h1 className="text-sm font-medium line-clamp-1">
                    {product.name}
                  </h1>
                </Link>
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="categories">
            {categories?.map((category) => (
              <CommandItem key={category.id}>
                <Link
                  className="text-black font-medium text-md flex items-start gap-2"
                  href={`/products?categoryId=${category.id}`}
                  onClick={() => setOpen(false)}
                >
                  <Image
                    className="w-6 h-6 object-cover"
                    src={category.image}
                    alt={category.name}
                    width={20}
                    height={20}
                  />
                  {category.name}
                </Link>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
};

export default SearchCommand;
