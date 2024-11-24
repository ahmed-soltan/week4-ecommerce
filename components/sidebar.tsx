"use client";

import { useState } from "react";
import { FaBars } from "react-icons/fa";
import Link from "next/link";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import SearchCommand from "./search-command";
import LanguageConverter from "./language-converter";
import SideCategories from "@/features/home/components/side-categories";
import { Separator } from "./ui/separator";

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger>
        <FaBars className="w-8 h-8" />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader></SheetHeader>
        <div className="flex flex-col items-start gap-5 my-5">
          <SearchCommand />
          <ul className="flex flex-col items-center gap-5">
            <li className="text-black text-md text-left">Home</li>
            <li className="text-black text-md text-left">Contact</li>
            <li className="text-black text-md text-left">About</li>
            <li className="text-black text-md text-left underline">
              <Link href={"/auth/register"}>Sign up</Link>
            </li>
          </ul>
          <Separator />
          <h1 className="font-semibold text-lg">Shop By</h1>
          <SideCategories />
          <Separator />
          <LanguageConverter isSidebar={true} />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default Sidebar;
