"use client";

import { useRouter } from "next/navigation";

interface LoginButtonProps {
  children: React.ReactNode;
  mode?: "model" | "redirect";
  asChild?: boolean;
}

export const LoginButton = ({
  children,
  mode = "redirect",
  asChild = false,
}: LoginButtonProps) => {
  const router = useRouter();

  const onClick = () => {
    router.push("/auth/login");
  };

  if (mode === "model") {
    return (
      <button className="p-2 bg-blue-500 text-white rounded-md">
        TODO: Implement Model
      </button>
    );
  }

  return (
    <span
      className="cursor-pointer flex items-center justify-center"
      onClick={onClick}
    >
      {children}
    </span>
  );
};
