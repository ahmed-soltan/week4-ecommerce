"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState, useTransition } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

import CardWrapper from "./card-wrapper";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import FormSuccess from "@/components/form-success";
import FormError from "@/components/form-error";

import { login } from "@/actions/login";

import { LoginSchema } from "@/schemas";

import useCartStore from "@/store/cart-store";

type StateType = {
  error: string | undefined;
  success: string | undefined;
};

export const LoginForm = () => {
  const [state, setState] = useState<StateType>({
    success: "",
    error: "",
  });
  const [isPending, startTransition] = useTransition();
  const searchParams = useSearchParams();
  const {cartItems} = useCartStore()

  const callbackUrl = searchParams.get("callbackUrl");

  const urlError =
    searchParams.get("error") === "OAuthAccountNotLinked"
      ? "Email is Already in use with different provider"
      : "";

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
      code: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof LoginSchema>) => {
    startTransition(() => {
      login(data, callbackUrl , cartItems).then((data) => {
        setState({
          success: data?.success,
          error: data?.error,
        });
      });
    });
  };

  return (
    <CardWrapper
      title="Log in to Exclusive"
      headerLabel="Enter your details below"
    >
      <Form {...form}>
        <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <>
              <FormField
                name="email"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        className="px-[2px] border-0 border-b-2 shadow-none rounded-none"
                        disabled={isPending}
                        {...field}
                        placeholder="Email"
                        type="email"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="password"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        className="px-[2px] border-0 border-b-2 shadow-none rounded-none"
                        {...field}
                        disabled={isPending}
                        placeholder="password"
                        type="password"
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          </div>
          <FormSuccess message={state.success} />
          <FormError message={state.error || urlError} />
          <div className="w-full flex items-center justify-between">
            <Button
              disabled={isPending}
              type="submit"
              className="h-[56px] w-[143px]"
              variant={"destructive"}
            >
              Login
            </Button>
            <Button
              className="px-[2px] font-normal text-red text-md"
              asChild
              variant={"link"}
              size={"sm"}
            >
              <Link href={"#"}>Forgot Password?</Link>
            </Button>
          </div>
        </form>
      </Form>
    </CardWrapper>
  );
};
