"use client";

import Link from "next/link";

import Sidebar from "./sidebar";
import SearchCommand from "./search-command";

const Navbar = () => {
  return (
    <div className=" border-b">
      <div className="p-5 pb-0 flex items-center justify-between w-full max-w-[1550px] mx-auto h-24">
        <h1 className="text-2xl font-bold">Exclusive</h1>
        <div className="block md:hidden">
          <Sidebar />
        </div>
        <ul className="hidden md:flex items-center gap-10">
          <li className="text-black text-md">Home</li>
          <li className="text-black text-md">Contact</li>
          <li className="text-black text-md">About</li>
          <li className="text-black text-md underline">
            <Link href={"/auth/register"}>Sign up</Link>
          </li>
        </ul>
        <div className="hidden md:block">
          <SearchCommand />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
