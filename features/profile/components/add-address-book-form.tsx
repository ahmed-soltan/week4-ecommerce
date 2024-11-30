"use client";
import { FaPlusCircle } from "react-icons/fa";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import AddressModal from "./address-modal";
import AddressFormInputs from "./address-form-inputs";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";

import { AddressSchema } from "@/schemas";
import { useAddress } from "../hooks/use-address";
import { LuLoader2 } from "react-icons/lu";

const AddAddressBookForm = () => {
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
  };

  return (
    <AddressModal title="Add New Address" icon={FaPlusCircle}>
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
