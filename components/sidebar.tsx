"use client";

import { useState } from "react";
import { FaAngleRight, FaArrowRight, FaBars } from "react-icons/fa";
import Link from "next/link";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import SearchCommand from "./search-command";
import LanguageConverter from "./language-converter";
import SideCategories from "@/components/side-categories";
import { Separator } from "./ui/separator";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useCurrentUser } from "@/hooks/use-current-user";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { FiUser } from "react-icons/fi";
import AccountMenu from "./account-menu";

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const user = useCurrentUser();

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger>
        <FaBars className="w-8 h-8" />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          {user && (
            <div className="flex items-start gap-4">
              <AccountMenu />
              <div className="flex flex-col items-start">
                <SheetTitle>{user.name}</SheetTitle>
                <Link
                  href={"/profile"}
                  className="text-sm underline flex items-center text-gray-500"
                >
                  View Profile <FaAngleRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          )}
        </SheetHeader>
        <div className="flex flex-col items-start gap-5 my-5">
          <SearchCommand />
          <ul className="flex flex-col items-start gap-4">
            <li
              className={cn(
                "text-black text-md",
                pathname === "/" && "underline"
              )}
            >
              <Link href={"/"}>Home</Link>
            </li>
            <li
              className={cn(
                "text-black text-md",
                pathname === "/contact" && "underline"
              )}
            >
              <Link href={"/contact"}>Contact</Link>
            </li>
            <li
              className={cn(
                "text-black text-md",
                pathname === "/about" && "underline"
              )}
            >
              <Link href={"/about"}>About</Link>
            </li>
            {!user && (
              <li
                className={cn(
                  "text-black text-md",
                  pathname === "/auth/register" && "underline"
                )}
              >
                <Link href={"/auth/register"}>Sign up</Link>
              </li>
            )}
          </ul>
          <Separator />
          <h1 className="font-semibold text-lg">Shop By Category</h1>
          <SideCategories />
          <Separator />
          <LanguageConverter isSidebar={true} />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default Sidebar;
