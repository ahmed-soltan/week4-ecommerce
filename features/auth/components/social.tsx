"use client";

import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { syncCartWithDb } from "@/lib/sync-cart-with-db";
import { useCurrentUser } from "@/hooks/use-current-user";

export const Social = () => {
  const searchParams = useSearchParams();

  const callbackUrl = searchParams.get("callbackUrl") || DEFAULT_LOGIN_REDIRECT;

  const onClick = async (provider: "google") => {
    const localCart = JSON.parse(localStorage.getItem("cart") || "[]");

    const data = await signIn(provider, {
      callbackUrl,
    });

    if (data?.ok) {
      const user = useCurrentUser();

      if (user?.id) {
        await syncCartWithDb(user.id, localCart);
        localStorage.removeItem("cart");
      }
    }
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
