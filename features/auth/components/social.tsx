"use client";

import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

export const Social = () => {
  const searchParams = useSearchParams();

  const callbackUrl = searchParams.get("callbackUrl") || DEFAULT_LOGIN_REDIRECT;

  const onClick = (provider: "google") => {
    signIn(provider, {
      callbackUrl,
    });
  };

  return (
    <div className="flex items-center w-full gap-x-2">
      <Button
        variant="outline"
        size="lg"
        className="w-full flex items-center justify-center gap-3 h-[56px]"
        onClick={() => onClick("google")}
      >
        <FcGoogle className="w-8 h-8" />
        <p className="text-md">Sign Up With Google</p>
      </Button>
    </div>
  );
};
