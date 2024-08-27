"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

interface BackButtonProps {
  backButtonLabel: string;
  backButtonUrl: string;
}

export const BackButton = ({
  backButtonLabel,
  backButtonUrl,
}: BackButtonProps) => {
  return (
    <Button variant={"link"} className="font-normal text-base w-full" size="sm" asChild>
      <Link href={backButtonUrl}>{backButtonLabel}</Link>
    </Button>
  );
};
