"use client"

import { FaBarsProgress } from "react-icons/fa6";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import ProfileSidebar from "./profile-sidebar";

const ResponsiveProfileSidebar = () => {
  const [open, setOpen] = useState(false);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button className="ml-3" variant={"outline"} size={"icon"}>
          <FaBarsProgress className="w-5 h-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent side={"bottom"} className="w-full max-w-[400px] ml-4 p-2">
        <ProfileSidebar setOpen={setOpen}/>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ResponsiveProfileSidebar;
