"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

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

import { RegisterSchema } from "@/schemas";

import { register } from "@/actions/register";

type StateType = {
  error: string | undefined;
  success: string | undefined;
};

export const RegisterForm = () => {
  const [state, setState] = useState<StateType>({
    success: "",
    error: "",
  });

  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof RegisterSchema>) => {
    startTransition(() => {
      register(data).then((data) => {
        setState({
          success: data.success,
          error: data.error,
        });
      });
    });
  };

  return (
    <CardWrapper
      title="Create an account"
      headerLabel="Enter your details below"
      backButtonLabel="Log in"
      backButtonUrl="/auth/login"
      showSocial
    >
      <Form {...form}>
        <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <>
              <FormField
                name="name"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        className="px-[2px] border-0 border-b-2 shadow-none rounded-none"
                        disabled={isPending}
                        {...field}
                        placeholder="Name"
                        type="text"
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
          <FormError message={state.error} />
          <div className="w-full flex items-center justify-between">
            <Button
              disabled={isPending}
              type="submit"
              className="h-[56px] w-full"
              variant={"destructive"}
            >
              Create Account
            </Button>
          </div>
        </form>
      </Form>
    </CardWrapper>
  );
};
