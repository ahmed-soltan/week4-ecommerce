"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";

interface BackButtonProps {
  backButtonLabel: string;
  backButtonUrl: string;
}

export const BackButton = ({
  backButtonLabel,
  backButtonUrl,
}: BackButtonProps) => {
  return (
    <Button
      variant={"ghost"}
      className="font-normal text-base w-full text-slate-600 hover:bg-transparent"
      size="sm"
      asChild
    >
      <div className="flex items-center justify-center gap-2">
        Already Have an Account?
        <Link href={backButtonUrl} className="text-slate-800 underline">
          {backButtonLabel}
        </Link>
      </div>
    </Button>
  );
};
