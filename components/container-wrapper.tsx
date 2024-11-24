import { cn } from "@/lib/utils";

interface ContainerWrapperProps{
    className?: string;
    children: React.ReactNode;
}

const ContainerWrapper = ({ children , className }: ContainerWrapperProps) => {
  return (
    <div className={cn("w-full max-w-[1550px] mx-auto px-4 py-6" , className)}>{children}</div>
  );
};

export default ContainerWrapper;
