"use client";

import Link from "next/link";
import { GoHeart } from "react-icons/go";
import { IoCartOutline } from "react-icons/io5";
import { usePathname } from "next/navigation";

import Sidebar from "./sidebar";
import SearchCommand from "./search-command";
import AccountMenu from "./account-menu";

import { cn } from "@/lib/utils";

import { useCurrentUser } from "@/hooks/use-current-user";
import { useCart } from "@/hooks/use-cart";
import { useWishlist } from "@/hooks/use-wishlist";

import useCartStore from "@/store/cart-store";
import useWishlistStore from "@/store/wishlist-store";

const Navbar = () => {
  const user = useCurrentUser();
  const pathname = usePathname();
  const { cartItemsLength } = useCart();
  const { wishlistProductsLength } = useWishlist();
  const { cartLength } = useCartStore();

  const { WishlistLength } = useWishlistStore();

  return (
    <div className=" border-b">
      <div className="p-5 pb-0 flex items-center justify-between w-full max-w-[1550px] mx-auto h-24">
        <h1 className="text-2xl font-bold">
          <Link href={"/"}>Exclusive</Link>
        </h1>
        <div className="block md:hidden">
          <Sidebar />
        </div>
        <ul className="hidden md:flex items-center gap-10">
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
        <div className="hidden md:flex items-center gap-5">
          <SearchCommand />
          <Link href={"/wishlist"} className="relative">
            <GoHeart className="w-6 h-6" />
            <span className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-red text-white text-center text-xs">
              {user ? wishlistProductsLength : WishlistLength()}
            </span>
          </Link>
          <Link href={"/cart"} className="relative">
            <IoCartOutline className="w-6 h-6" />
            <span className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-red text-white text-center text-xs">
              {user ? cartItemsLength : cartLength()}
            </span>
          </Link>
          <AccountMenu />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
