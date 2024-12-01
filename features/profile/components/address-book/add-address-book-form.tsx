"use client";

import { useState } from "react";
import { FaPlusCircle } from "react-icons/fa";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { LuLoader2 } from "react-icons/lu";

import AddressModal from "./address-modal";
import AddressFormInputs from "./address-form-inputs";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";

import { useAddress } from "../../hooks/use-address";

import { AddressSchema } from "@/schemas";

const AddAddressBookForm = () => {
  const [open, setOpen] = useState(false);
  const { addAddress, isAddingAddress } = useAddress();
  const form = useForm<z.infer<typeof AddressSchema>>({
    resolver: zodResolver(AddressSchema),
    defaultValues: {
      street: "",
      city: "",
      state: "",
      zipCode: "",
      country: "",
      isDefault: false,
    },
  });

  const onSubmit = (data: z.infer<typeof AddressSchema>) => {
    addAddress({ data });
    setTimeout(() => {
      setOpen(false);
      form.reset();
    }, 1000);
  };

  return (
    <AddressModal
      title="Add New Address"
      icon={FaPlusCircle}
      setOpen={setOpen}
      open={open}
    >
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
            disabled={isAddingAddress}
          >
            {isAddingAddress && <LuLoader2 className="w-4 h-4 animate-spin" />}
            {!isAddingAddress && "Add Address"}
          </Button>
        </form>
      </Form>
    </AddressModal>
  );
};

export default AddAddressBookForm;
