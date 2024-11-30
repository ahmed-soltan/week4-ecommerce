import { PropsWithChildren } from "react";
import { FaPlusCircle } from "react-icons/fa";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import Hint from "@/components/hint";

interface AddressModalProps {
  title?: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  variant?: "add" | "edit";
  children: React.ReactNode;
}

const AddressModal = ({
  children,
  title,
  icon: Icon,
  variant = "add",
}: AddressModalProps) => {
  return (
    <Dialog>
      <Hint
        label={variant === "add" ? "Add Address" : "Edit Address"}
        align="center"
        side="top"
      >
        <DialogTrigger asChild>
          <Button
            variant={variant === "add" ? "destructive" : "outline"}
            size={title ? "default" : "icon"}
            className="flex items-center justify-center gap-3 ml-auto"
          >
            <Icon className="w-5 h-5" />
            {title}
          </Button>
        </DialogTrigger>
      </Hint>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {variant === "add" ? "Add New Address" : "Edit Address"}
          </DialogTitle>
        </DialogHeader>
        <Separator />
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default AddressModal;
