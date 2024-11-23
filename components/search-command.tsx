import React, { useState } from "react";
import { RiSearchLine } from "react-icons/ri";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";

const SearchCommand = () => {
  const [open, setOpen] = useState(false);

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
            <CommandItem>Product 1</CommandItem>
            <CommandItem>Product 2</CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="categories">
            <CommandItem>category 1</CommandItem>
            <CommandItem>category 2</CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
};

export default SearchCommand;
