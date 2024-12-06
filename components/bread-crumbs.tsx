"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

import { cn } from "@/lib/utils";

const BreadCrumbs = () => {
  const pathname = usePathname();

  const segments = pathname.split("/").filter((segment) => segment);

  return (
    <div>
      <span>
        <Link
          href={"/"}
          className="text-sm font-medium text-gray-500 hover:text-gray-900"
        >
          Home
        </Link>
        <span className="mx-2 text-gray-500 text-xs">/</span>
      </span>
      {segments.map((segment, index) => {
        const href = `/${segments.slice(0, index + 1).join("/")}`;
        const label = segment.replace(/^\w/, (c) => c.toUpperCase());

        return (
          <span key={index}>
            <Link
              href={href}
              className={cn(
                "text-sm font-medium text-gray-500 hover:text-gray-900",
                index === segments.length - 1 && "text-gray-800"
              )}
            >
              {label}
            </Link>
            {index < segments.length - 1 && (
              <span className="mx-2 text-gray-500 text-xs">/</span>
            )}
          </span>
        );
      })}
    </div>
  );
};

export default BreadCrumbs;
