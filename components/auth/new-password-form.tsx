"use client";

import { useSearchParams } from "next/navigation";
import CardWrapper from "./card-wrapper";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import FormError from "../form-error";
import FormSuccess from "../form-success";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, useTransition } from "react";
import { NewPasswordSchema } from "@/schemas";
import { NewPassword } from "@/actions/new-password";

type StateType = {
  error: string | undefined;
  success: string | undefined;
};

const NewPasswordForm = () => {
  const [state, setState] = useState<StateType>({
    success: "",
    error: "",
  });
  const searchParams = useSearchParams();
  const form = useForm<z.infer<typeof NewPasswordSchema>>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      password: "",
    },
  });
  const [isPending, startTransition] = useTransition();

  const token = searchParams.get("token");

  const onSubmit = async (data: z.infer<typeof NewPasswordSchema>) => {
    if(!token){
      setState({
        error: "Missing token",
        success: undefined,
      })
      return;
    }
    
    startTransition(() => {
      NewPassword(token, data).then((data) => {
        setState({
          success: data.success,
          error: data.error,
        });
      });
    });
  };

  return (
    <CardWrapper
      headerLabel="Enter New Password"
      backButtonLabel="Back to Login"
      backButtonUrl="/auth/login"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            name="password"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={isPending}
                    placeholder="*******"
                    type="password"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormError message={state.error} />
          <FormSuccess message={state.success} />
          <Button disabled={isPending} type="submit" className="w-full">
            Reset Password
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default NewPasswordForm;
