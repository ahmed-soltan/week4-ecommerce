"use client"

import { FaBarsProgress } from "react-icons/fa6";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import ProfileSidebar from "./profile-sidebar";

const ResponsiveProfileSidebar = () => {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button className="ml-3" variant={"outline"} size={"icon"}>
          <FaBarsProgress className="w-5 h-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side={"left"}>
        <SheetHeader>
          <SheetTitle></SheetTitle>
        </SheetHeader>
        <ProfileSidebar setOpen={setOpen}/>
      </SheetContent>
    </Sheet>
  );
};

export default ResponsiveProfileSidebar;
