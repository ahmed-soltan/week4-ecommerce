import axios from "axios";
import { CheckoutFormSchema } from "./../schemas/index";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { toast } from "./use-toast";
import { OrderItem } from "@prisma/client";

const createOrderApi = async ({ data }: { data: any }) => {
  const response = await axios.post("/api/orders", data);
  return response.data;
};

export const useOrders = () => {
  const { mutate: createOrder, isPending: isCreatingOrder } = useMutation({
    mutationFn: createOrderApi,
    onSuccess: () => {
      toast({
        variant: "success",
        title: "Order Created",
        description: "Your order has been placed successfully.",
      });
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Error Creating Order",
        description:
          "An error occurred while creating your order. Please try again later.",
      });
    },
  });

  return {
    createOrder,
    isCreatingOrder,
  };
};
