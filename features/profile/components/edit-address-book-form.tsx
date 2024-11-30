"use client";

import { CiEdit } from "react-icons/ci";
import { LuLoader2 } from "react-icons/lu";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import AddressModal from "./address-modal";
import AddressFormInputs from "./address-form-inputs";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";

import { useAddress } from "../hooks/use-address";

import { AddressSchema } from "@/schemas";

import { Address } from "@prisma/client";

interface EditAddressBookFormProps {
  address: Address;
}

const EditAddressBookForm = ({ address }: EditAddressBookFormProps) => {
  const { updateAddress, isUpdatingAddress } = useAddress();
  const form = useForm<z.infer<typeof AddressSchema>>({
    resolver: zodResolver(AddressSchema),
    defaultValues: {
      street: address.street || "",
      city: address.city || "",
      state: address.state || "",
      zipCode: address.zipCode || "",
      country: address.country || "",
      isDefault: address.isDefault || false,
    },
  });

  const onSubmit = (data: z.infer<typeof AddressSchema>) => {
    updateAddress({ data, addressId: address.id });
  };

  return (
    <AddressModal icon={CiEdit} variant="edit">
      <Form {...form}>
        <form
          className="w-full space-y-6 flex flex-col items-start"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <AddressFormInputs form={form} />
          <Button
            variant={"destructive"}
            size={"lg"}
            className="ml-auto"
            disabled={isUpdatingAddress}
          >
            {isUpdatingAddress && (
              <LuLoader2 className="w-4 h-4 animate-spin" />
            )}
            {!isUpdatingAddress && "Edit Address"}
          </Button>
        </form>
      </Form>
    </AddressModal>
  );
};

export default EditAddressBookForm;
