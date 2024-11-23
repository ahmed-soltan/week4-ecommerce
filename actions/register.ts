"use server";

import bcrypt from "bcryptjs";
import { z } from "zod";

import { RegisterSchema } from "@/schemas";
import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/user";

export const register = async (data: z.infer<typeof RegisterSchema>) => {
  const validatedField = RegisterSchema.safeParse(data);

  if (!validatedField.success) {
    return { error: "Invalid Fields!" };
  }

  const { email, name, password } = validatedField.data;
  const hashedPassword = bcrypt.hashSync(password, 10);

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: "Email already in use!" };
  }

  await db.user.create({
    data: { email, name, password: hashedPassword },
  });

  return {
    success: "Account successfully created",
  };
};
