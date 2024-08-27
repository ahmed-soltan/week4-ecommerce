"use server";

import { signIn } from "@/auth";
import { getUserByEmail } from "@/data/user";
import { sendResetPasswordEmail, sendVerificationEmail } from "@/lib/mail";
import { generatePasswordResetToken, generateVerificationToken } from "@/lib/tokens";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { ResetSchema } from "@/schemas";

import { AuthError } from "next-auth";
import { z } from "zod";

export const reset = async (data: z.infer<typeof ResetSchema>) => {
    const validatedField = ResetSchema.safeParse(data);
  
    if (!validatedField.success) {
      return { success: undefined, error: "Invalid Email!" };
    }
  
    const { email } = validatedField.data;

    const existingUser = await getUserByEmail(email);

    if(!existingUser) {
      return {
        error: "Email does not Exist!",
      }
    }
      const verificationToken = await generatePasswordResetToken(email)
      await sendResetPasswordEmail(verificationToken.email,verificationToken.token)

      return {
        success:"Reset Password Email sent!"
      }
  
  };
  
