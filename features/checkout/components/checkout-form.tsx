"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import CheckoutDetails from "./checkout-details";
import { Checkbox } from "@/components/ui/checkbox";

import { useOrders } from "@/hooks/use-orders";
import { useCart } from "@/hooks/use-cart";

import useCheckoutStore from "@/store/checkout-info-store";

import { CheckoutFormSchema } from "@/schemas";

const CheckoutForm = () => {
  const { cartData, deleteCart } = useCart();
  const { createOrder, isCreatingOrder } = useOrders();
  const {
    setCheckoutInfo,
    firstName,
    email,
    streetAddress,
    city,
    companyName,
    apartment,
    phoneNumber,
    saveInfo,
    paymentMethod,
    cardNumber,
    cvv,
    expirationDate,
    clearCheckoutInfo,
  } = useCheckoutStore();

  const form = useForm<z.infer<typeof CheckoutFormSchema>>({
    resolver: zodResolver(CheckoutFormSchema),
    defaultValues: {
      firstName: firstName || "",
      email: email || "",
      streetAddress: streetAddress || "",
      city: city || "",
      companyName: companyName || "",
      apartment: apartment || "",
      phoneNumber: phoneNumber || "",
      saveInfo: saveInfo || false,
      paymentMethod: paymentMethod || "cash",
      cardNumber: cardNumber || "",
      cvv: cvv || "",
      expirationDate: expirationDate || new Date(),
    },
  });

  const onSubmit = (data: z.infer<typeof CheckoutFormSchema>) => {
    const orderItems = cartData?.cart.cartItems;

    const dedupedOrderItems = orderItems?.map((orderItem) => ({
      productId: orderItem.productId,
      quantity: orderItem.quantity,
      selectedImage: orderItem.selectedImage,
      sizes: orderItem.sizes,
      total: orderItem.total,
    }));

    
    const orderData = {
      firstName: data.firstName,
      email: data.email,
      streetAddress: data.streetAddress,
      city: data.city,
      companyName: data.companyName,
      apartment: data.apartment,
      phoneNumber: data.phoneNumber,
      paymentMethod: data.paymentMethod,
      cardNumber: data.cardNumber,
      cvv: data.cvv,
      expirationDate: data.expirationDate,
      total: cartData?.cart.priceAfterCoupon || cartData?.cart.total,
      orderItems: dedupedOrderItems,
    };
    
    createOrder({ data: orderData! });
    if (data.saveInfo) {
      setCheckoutInfo(data);
    }else{
      clearCheckoutInfo();
    }
  };

  return (
    <Form {...form}>
      <form
        className="grid grid-cols-1 lg:grid-cols-2 gap-y-10 w-full"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="space-y-6 w-full max-w-[500px] mx-auto lg:mr-auto lg:ml-0">
          <FormField
            name="firstName"
            control={form.control}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="text-gray-400">
                  First Name <span className="text-red">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    className="w-full border-0 bg-[#F5F5F5] h-12 font-thin"
                    disabled={isCreatingOrder}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="companyName"
            control={form.control}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="text-gray-400">Company Name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    className="w-full border-0 bg-[#F5F5F5] h-12 font-thin"
                    disabled={isCreatingOrder}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            name="streetAddress"
            control={form.control}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="text-gray-400">
                  Street Address <span className="text-red">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    className="w-full border-0 bg-[#F5F5F5] h-12 font-thin"
                    disabled={isCreatingOrder}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="apartment"
            control={form.control}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="text-gray-400">Apartment</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    className="w-full border-0 bg-[#F5F5F5] h-12 font-thin"
                    disabled={isCreatingOrder}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            name="city"
            control={form.control}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="text-gray-400">
                  Town / City <span className="text-red">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    className="w-full border-0 bg-[#F5F5F5] h-12 font-thin"
                    disabled={isCreatingOrder}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="phoneNumber"
            control={form.control}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="text-gray-400">
                  Phone Number <span className="text-red">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    className="w-full border-0 bg-[#F5F5F5] h-12 font-thin"
                    disabled={isCreatingOrder}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="email"
            control={form.control}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="text-gray-400">
                  Email Address <span className="text-red">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    className="w-full border-0 bg-[#F5F5F5] h-12 font-thin"
                    disabled={isCreatingOrder}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="saveInfo"
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className="data-[state=checked]:bg-red data-[state=checked]:text-white data-[state=checked]:border-red"
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>
                    Save this information for faster check-out next time
                  </FormLabel>
                </div>
              </FormItem>
            )}
          />
        </div>
        <CheckoutDetails form={form} isLoading={isCreatingOrder} />
      </form>
    </Form>
  );
};

export default CheckoutForm;
