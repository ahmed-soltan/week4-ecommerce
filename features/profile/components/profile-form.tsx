"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { LuLoader2 } from "react-icons/lu";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { useCurrentUser } from "@/hooks/use-current-user";
import { useProfile } from "../hooks/use-profile";

import { ProfileSchema } from "@/schemas";

const ProfileForm = () => {
  const user = useCurrentUser();
  const { updateProfile, isUpdatingProfile } = useProfile();

  const form = useForm<z.infer<typeof ProfileSchema>>({
    resolver: zodResolver(ProfileSchema),
    defaultValues: {
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      email: user?.email || "",
      phoneNumber: user?.phoneNumber || "",
    },
  });

  const onSubmit = async (data: z.infer<typeof ProfileSchema>) => {
   updateProfile({ data });
  };

  const onCancel = () => {
    form.reset();
  };

  const canSubmit = form.formState.isDirty || form.formState.isValid;
  return (
    <Form {...form}>
      <form
        className="space-y-6 flex flex-col items-start w-full"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="flex items-center gap-10 w-full flex-wrap md:flex-nowrap">
          <FormField
            name="firstName"
            control={form.control}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    placeholder="First Name"
                    className="w-full border-0 bg-[#F5F5F5] h-12 font-thin"
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            name="lastName"
            control={form.control}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    placeholder="Last Name"
                    className="w-full border-0 bg-[#F5F5F5] h-12 font-thin"
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <div className="flex items-center gap-10 w-full flex-wrap md:flex-nowrap">
          <FormField
            name="email"
            control={form.control}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="email"
                    placeholder="Email"
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
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    placeholder="Phone Number"
                    className="w-full border-0 bg-[#F5F5F5] h-12 font-thin"
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <div className="ml-auto flex gap-2">
          <Button
            variant={"ghost"}
            size={"lg"}
            className="h-12"
            onClick={onCancel}
            type="button"
          >
            Cancel
          </Button>
          <Button
            variant={"destructive"}
            size={"lg"}
            type="submit"
            className="h-12 w-full max-w-[200px] rounded-sm"
            disabled={!canSubmit || isUpdatingProfile}
          >
            {isUpdatingProfile && (
              <LuLoader2 className="w-4 h-4 animate-spin" />
            )}
            {!isUpdatingProfile && "Save Changes"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ProfileForm;
