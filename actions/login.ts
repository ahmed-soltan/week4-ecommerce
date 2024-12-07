"use server";


import { AuthError } from "next-auth";
import { z } from "zod";

import { signIn } from "@/auth";
import { getUserByEmail } from "@/data/user";
import { syncCartWithDb } from "@/lib/sync-cart-with-db";

import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { LoginSchema } from "@/schemas";

export const login = async (
  data: z.infer<typeof LoginSchema>,
  callbackUrl?: string | null,
  cartItems?: any
) => {
  const validatedField = LoginSchema.safeParse(data);

  if (!validatedField.success) {
    return { success: undefined, error: "Invalid Fields!" };
  }

  const { email, password, code } = validatedField.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return {
      error: "Email does not Exist!",
    };
  }

  try {
    await syncCartWithDb(existingUser.id , cartItems);
    await signIn("credentials", {
      email,
      password,
      redirectTo: callbackUrl || DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid Credentials!" };
        default:
          return { error: "An error occurred while trying to login!" };
      }
    }

    throw error;
  }
};
