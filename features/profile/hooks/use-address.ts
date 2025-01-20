import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { z } from "zod";

import { toast } from "@/hooks/use-toast";

import { AddressSchema } from "@/schemas/index";

import { Address } from "@prisma/client";

const getAddressesApi = async (): Promise<Address[]> => {
  const res = await axios.get("/api/addresses");
  return res.data;
};

const addAddressApi = async ({
  data,
}: {
  data: z.infer<typeof AddressSchema>;
}) => {
  const res = await axios.post("/api/addresses", data);
  return res.data;
};

const updateAddressApi = async ({
  addressId,
  data,
}: {
  addressId: string;
  data: z.infer<typeof AddressSchema>;
}) => {
  const validatedField = AddressSchema.safeParse(data);
  if (!validatedField.success) {
    return { error: "Invalid Fields!" };
  }

  const res = await axios.patch(`/api/addresses/${addressId}`, data);
  return res.data;
};

const deleteAddressApi = async ({ addressId }: { addressId: string }) => {
  await axios.delete(`/api/addresses/${addressId}`);
};

export const useAddress = () => {
  const {
    data: addresses,
    isLoading,
    refetch: refetchAddresses,
  } = useQuery({
    queryKey: ["addresses"],
    queryFn: getAddressesApi,
    staleTime: 1000 * 60 * 20,
  });

  const { mutate: addAddress, isPending: isAddingAddress } = useMutation({
    mutationFn: addAddressApi,
    onSuccess: () => {
      refetchAddresses();
      toast({
        variant: "success",
        title: "Address Added Successfully",
      });
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Failed to add address",
      });
    },
  });

  const { mutate: updateAddress, isPending: isUpdatingAddress } = useMutation({
    mutationFn: updateAddressApi,
    onSuccess: () => {
      refetchAddresses();
      toast({
        variant: "success",
        title: "Address Updated Successfully",
      });
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Failed to update address",
      });
    },
  });

  const { mutate: deleteAddress, isPending: isDeletingAddress } = useMutation({
    mutationFn: deleteAddressApi,
    onSuccess: () => {
      refetchAddresses();
      toast({
        title: "Address deleted",
        variant: "success",
      });
    },
    onError: () => {
      toast({
        title: "Failed to delete address",
        variant: "destructive",
      });
    },
  });

  return {
    addresses,
    isLoading,
    isAddingAddress,
    addAddress,
    updateAddress,
    isUpdatingAddress,
    deleteAddress,
    isDeletingAddress,
  };
};
