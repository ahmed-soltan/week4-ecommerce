import { LoginButton } from "@/components/auth/login-button";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";

const font = Poppins({
  subsets: ["latin"],
  weight: ["400", "600"],
});

export default function Home() {
  return (
    <main
      className="flex flex-col items-center justify-center h-full
     bg-gradient-to-b from-sky-400 to-blue-800"
    >
      <div className="space-y-6">
        <h1
          className={cn(
            font.className,
            "text-6xl font-semibold text-white drop-shadow-sm text-center"
          )}
        >
          Auth
        </h1>
        <p className="text-lg text-white">Simple Authentication Service</p>
        <div>
          <LoginButton>
            <Button variant={"secondary"} size={"lg"}>
              Sign In
            </Button>
          </LoginButton>
        </div>
      </div>
    </main>
  );
}
