"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { LuLoader2 } from "react-icons/lu";

interface ConfirmModalProps {
  title: string;
  message: string;
  callbackFn: () => void;
  open: boolean;
  setOpen: (open: boolean) => void;
  isLoading?: boolean;
}

const ConfirmModal = ({
  title,
  message,
  callbackFn,
  open,
  setOpen,
  isLoading,
}: ConfirmModalProps) => {
  const isModalOpen = open;
  if (!isModalOpen) {
    return null;
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{message}</DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <div className="flex items-center gap-2">
            <Button
              onClick={() => setOpen(false)}
              variant={"outline"}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button onClick={callbackFn} disabled={isLoading}>
              {isLoading && <LuLoader2 className="w-4 h-4 animate-spin" />}
              {!isLoading && "Confirm"}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmModal;
