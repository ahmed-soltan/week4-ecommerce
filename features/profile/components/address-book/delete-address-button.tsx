import React, { useState } from "react";
import { LuLoader2, LuTrash2 } from "react-icons/lu";

import Hint from "@/components/hint";
import ConfirmModal from "@/components/confirm-modal";
import { Button } from "@/components/ui/button";

import { useAddress } from "../../hooks/use-address";

interface DeleteAddressButtonProps {
  addressId: string;
}

const DeleteAddressButton = ({ addressId }: DeleteAddressButtonProps) => {
  const [open, setOpen] = useState(false);
  const { deleteAddress, isDeletingAddress } = useAddress();

  const handleDeleteAddress = () => {
    deleteAddress({ addressId });
  };

  return (
    <>
      <ConfirmModal
        open={open}
        setOpen={setOpen}
        callbackFn={handleDeleteAddress}
        title="Are Your Sure!"
        message="This action cannot be undone. This will permanently delete your Address"
        isLoading={isDeletingAddress}
      />
      <Hint label="Delete Address" side="top" align="center">
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="flex items-center gap-2"
          onClick={()=>setOpen(true)}
        >
          {isDeletingAddress && <LuLoader2 className="w-4 h-4 animate-spin" />}
          {!isDeletingAddress && <LuTrash2 className="w-4 h-4" />}
        </Button>
      </Hint>
    </>
  );
};

export default DeleteAddressButton;
