import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";

const font = Poppins({
  subsets: ["latin"],
  weight: ["400", "600"],
});

interface HeaderProps {
  title:string
  label: string;
}

export const Header = ({ label , title }: HeaderProps) => {
  return (
    <div className="w-full flex flex-col items-start justify-start gap-3">
      <h1 className={cn("text-3xl font-medium", font.className)}>{title}</h1>
      <p className="text-slate-800 text-base">{label}</p>
    </div>
  );
};
