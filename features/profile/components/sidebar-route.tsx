"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

interface SidebarRouteProps {
  title: string;
  routes: {
    path: string;
    label: string;
  }[];
  setOpen?: (open: boolean) => void;
}

const SidebarRoute = ({ title, routes, setOpen }: SidebarRouteProps) => {
  const pathname = usePathname();
  return (
    <div className="flex flex-col items-start gap-5">
      <h1>{title}</h1>
      <div
        className="ml-3 flex flex-col items-start gap-3"
        >
        {routes.map((route) => {
          const isActive = pathname.endsWith(route.path);
          return (
            <Link
            key={route.path}
              href={route.path}
              className={cn(
                "text-sm font-[300] text-gray-500",
                isActive && "text-red"
              )}
            onClick={() => setOpen && setOpen(false)}
            >
              {route.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default SidebarRoute;
