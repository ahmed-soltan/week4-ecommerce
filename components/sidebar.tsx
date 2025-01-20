"use client";

import { useState } from "react";
import { FaAngleRight, FaBars } from "react-icons/fa";
import { RiLogoutBoxLine } from "react-icons/ri";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
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
import AccountMenu from "./account-menu";

import useWishlistStore from "@/store/wishlist-store";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useWishlist } from "@/hooks/use-wishlist";

import { cn } from "@/lib/utils";

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const user = useCurrentUser();
  const { wishlistProductsLength } = useWishlist();

  const { WishlistLength } = useWishlistStore();

  const handleClose = () => {
    setOpen(false);
  };

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
                  onClick={handleClose}
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
              onClick={handleClose}
              className={cn(
                "text-black text-md",
                pathname === "/" && "underline"
              )}
            >
              <Link href={"/"}>Home</Link>
            </li>
            <li
              onClick={handleClose}
              className={cn(
                "text-black text-md",
                pathname === "/contact" && "underline"
              )}
            >
              <Link href={"/contact"}>Contact</Link>
            </li>
            <li
              onClick={handleClose}
              className={cn(
                "text-black text-md",
                pathname === "/about" && "underline"
              )}
            >
              <Link href={"/about"}>About</Link>
            </li>
            {!user && (
              <li
                onClick={handleClose}
                className={cn(
                  "text-black text-md",
                  pathname === "/auth/register" && "underline"
                )}
              >
                <Link href={"/auth/register"}>Sign up</Link>
              </li>
            )}
            <li
              className={cn(
                "text-black text-md",
                pathname === "/about" && "underline"
              )}
            >
              <Link href={"/wishlist"} className="relative">
                Wishlist{" "}
                <span className="text-xs">
                  ( {user ? wishlistProductsLength : WishlistLength()} )
                </span>
              </Link>
            </li>
          </ul>
          <Separator />
          <h1 className="font-semibold text-lg">Shop By Category</h1>
          <SideCategories />
          <Separator />
          <div className="flex items-center gap-2 w-full justify-between">
            {user && (
              <Link
                href={"#"}
                onClick={() => signOut()}
                className="flex items-center gap-2 font-normal"
              >
                <RiLogoutBoxLine className="w-5 h-5" />
                Logout
              </Link>
            )}
            <LanguageConverter isSidebar={true} />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default Sidebar;
