"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

import { ContactFormSchema } from "@/schemas";

const ContactForm = () => {
  const form = useForm<z.infer<typeof ContactFormSchema>>({
    resolver: zodResolver(ContactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  const onSubmit = (data: z.infer<typeof ContactFormSchema>) => {
    console.log(data);
  };
  
  return (
    <Form {...form}>
      <form
        className="space-y-4 w-full p-10 shadow-md rounded-md border-[.5px]"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="flex items-center justify-between gap-3 w-full flex-wrap lg:flex-nowrap">
          <FormField
            name="name"
            control={form.control}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    className="w-full h-12 bg-gray-100 border-0 rounded-sm"
                    placeholder="Your Name"
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
                <FormControl>
                  <Input
                    {...field}
                    type="email"
                    className="w-full h-12 bg-gray-100 border-0 rounded-sm"
                    placeholder="Your Email"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="phone"
            control={form.control}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    className="w-full h-12 bg-gray-100 border-0 rounded-sm"
                    placeholder="Your Phone"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          name="message"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  {...field}
                  className="w-full h-[245px] bg-gray-100 border-0 rounded-sm"
                  placeholder="Your Message"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          className="h-12 ml-auto rounded-sm font-normal"
          size={"lg"}
          variant={"destructive"}
        >
          Send Message
        </Button>
      </form>
    </Form>
  );
};

export default ContactForm;
