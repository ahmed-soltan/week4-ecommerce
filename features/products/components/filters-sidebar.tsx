"use client"

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { TbFilterSearch } from "react-icons/tb";
import Filters from "./filters";

const FiltersSidebar = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size={"icon"} variant={"outline"}>
          <TbFilterSearch className="w-4 h-4" />
        </Button>
      </SheetTrigger>
      <SheetContent side={"left"}>
        <SheetHeader>
          <SheetTitle>Filter Products</SheetTitle>
        </SheetHeader>
        <Filters />
      </SheetContent>
    </Sheet>
  );
};

export default FiltersSidebar;
