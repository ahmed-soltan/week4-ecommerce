import { cn } from "@/lib/utils";

interface ContainerWrapperProps {
  className?: string;
  children: React.ReactNode;
}

const ContainerWrapper = ({ children, className }: ContainerWrapperProps) => {
  const hasHorizontalAlignment = /mx-auto|ml-auto|mr-auto/.test(className || "");

  return (
    <div
      className={cn(
        "w-full max-w-[1550px] px-4 py-6",
        !hasHorizontalAlignment && "mx-auto",
        className
      )}
    >
      {children}
    </div>
  );
};

export default ContainerWrapper;
