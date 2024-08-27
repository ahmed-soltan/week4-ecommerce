"use server";

import { z } from "zod";
import bcrypt from "bcryptjs";
import { getUserByEmail } from "@/data/user";
import { getVerificationTokenByToken } from "@/data/verification-token";
import { db } from "@/lib/db";
import { NewPasswordSchema } from "@/schemas";
import { getPasswordResetTokenByToken } from "@/data/password-reset-token";

export const NewPassword = async (
  token: string,
  data: z.infer<typeof NewPasswordSchema>
) => {
  const validatedField = NewPasswordSchema.safeParse(data);

  if (!validatedField.success) {
    return { error: "Invalid Password!" };
  }

  const {password} = validatedField.data

  const existingToken = await getPasswordResetTokenByToken(token);

  if (!existingToken) {
    return {
      error: "Token does not exist",
    };
  }

  const hasExpiredToken = new Date(existingToken.expiresAt) < new Date();

  if (hasExpiredToken) {
    return {
      error: "Token has expired",
    };
  }

  const existingUser = await getUserByEmail(existingToken.email);

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return {
      error: "Email does not exist",
    };
  }

  const hashedPassword = bcrypt.hashSync(password, 10);

  await db.user.update({
    where: { id: existingUser.id },
    data: {
      password: hashedPassword,
    },
  });

  await db.passwordResetToken.delete({
    where: { id: existingToken.id },
  });

  return {
    success: "Password Updated!",
  };
};
