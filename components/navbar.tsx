"use client";

import Link from "next/link";
import { GoHeart } from "react-icons/go";
import { IoCartOutline } from "react-icons/io5";
import { FiUser, FiShoppingBag } from "react-icons/fi";
import { FaRegStar } from "react-icons/fa";
import { RiLogoutBoxLine } from "react-icons/ri";
import { MdOutlineCancel } from "react-icons/md";

import Sidebar from "./sidebar";
import SearchCommand from "./search-command";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { useCurrentUser } from "@/hooks/use-current-user";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const user = useCurrentUser();
  const pathname = usePathname();

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
          <li
            className={cn(
              "text-black text-md",
              pathname === "/auth/register" && "underline"
            )}
          >
            <Link href={"/auth/register"}>Sign up</Link>
          </li>
        </ul>
        <div className="hidden md:flex items-center gap-5">
          <SearchCommand />
          <GoHeart className="w-10 h-10" />
          <IoCartOutline className="w-10 h-10" />
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar>
                <AvatarImage
                  src={user?.image || ""}
                  alt={user?.name || "user Image"}
                  className="bg-rose-500"
                />
                <AvatarFallback className="bg-rose-500 text-white">
                  <FiUser />
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="blur-bg p-3">
              <DropdownMenuItem>
                <Link
                  href={"/profile"}
                  className="flex items-center gap-2 text-white font-normal"
                >
                  <FiUser className="w-5 h-5" />
                  Manage My Account
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link
                  href={"/profile"}
                  className="flex items-center gap-2 text-white font-normal"
                >
                  <FiShoppingBag className="w-5 h-5" />
                  My Orders
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link
                  href={"/profile"}
                  className="flex items-center gap-2 text-white font-normal"
                >
                  <MdOutlineCancel className="w-5 h-5" />
                  My Cancellation
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link
                  href={"/profile"}
                  className="flex items-center gap-2 text-white font-normal"
                >
                  <FaRegStar className="w-5 h-5" />
                  My Reviews
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link
                  href={"/profile"}
                  className="flex items-center gap-2 text-white font-normal"
                >
                  <RiLogoutBoxLine className="w-5 h-5" />
                  Logout
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
