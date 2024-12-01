"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { CheckoutFormSchema } from "@/schemas";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import CheckoutDetails from "./checkout-details";

const CheckoutForm = () => {
  const form = useForm<z.infer<typeof CheckoutFormSchema>>({
    resolver: zodResolver(CheckoutFormSchema),
    defaultValues: {
      firstName: "",
      email: "",
      streetAddress: "",
      city: "",
      companyName: "",
      apartment: "",
      phoneNumber: "",
    },
  });

  const onSubmit = (data: z.infer<typeof CheckoutFormSchema>) => {
    console.log(data);
  };

  return (
    <Form {...form}>
      <form
        className="grid grid-cols-1 lg:grid-cols-2 gap-10 w-full"
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
                  />
                </FormControl>
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
                  />
                </FormControl>
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
                  />
                </FormControl>
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
                  />
                </FormControl>
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
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
          <CheckoutDetails />
      </form>
    </Form>
  );
};

export default CheckoutForm;
