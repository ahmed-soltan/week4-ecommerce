import { FiUser, FiShoppingBag } from "react-icons/fi";
import { FaRegStar } from "react-icons/fa";
import { RiLogoutBoxLine } from "react-icons/ri";
import { MdOutlineCancel } from "react-icons/md";
import { signOut } from "next-auth/react";
import { useState } from "react";
import Link from "next/link";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

import { useCurrentUser } from "@/hooks/use-current-user";

const AccountMenu = () => {
  const [open , setOpen] = useState(false)
  const user = useCurrentUser();

  if (!user) {
    return null
  }

  const handleCloseDropDownMenu = () => {
    setOpen(false)
  }

  return (
    <DropdownMenu open={open} onOpenChange={handleCloseDropDownMenu}>
      <DropdownMenuTrigger onClick={()=>setOpen(true)}>
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
        <DropdownMenuItem className="focus:bg-gray-400" onClick={handleCloseDropDownMenu}>
          <Link
            href={"/profile"}
            className="flex items-center gap-2 text-white font-normal"
          >
            <FiUser className="w-5 h-5" />
            Manage My Account
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="focus:bg-gray-400" onClick={handleCloseDropDownMenu}>
          <Link
            href={"/profile/orders"}
            className="flex items-center gap-2 text-white font-normal"
          >
            <FiShoppingBag className="w-5 h-5" />
            My Orders
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="focus:bg-gray-400" onClick={handleCloseDropDownMenu}>
          <Link
            href={"/profile/cancellation"}
            className="flex items-center gap-2 text-white font-normal"
          >
            <MdOutlineCancel className="w-5 h-5" />
            My Cancellation
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="focus:bg-gray-400" onClick={handleCloseDropDownMenu}>
          <Link
            href={"/profile/reviews"}
            className="flex items-center gap-2 text-white font-normal"
          >
            <FaRegStar className="w-5 h-5" />
            My Reviews
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => signOut()}
          className="focus:bg-gray-400"
        >
          <Link
            href={"#"}
            className="flex items-center gap-2 text-white font-normal"
          >
            <RiLogoutBoxLine className="w-5 h-5" />
            Logout
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AccountMenu;
