import { v4 as uuid4 } from "uuid";
import { db } from "./db";
import crypto from "crypto"

import { getVerificationTokenByEmail } from "@/data/verification-token";
import { getPasswordResetTokenByEmail } from "@/data/password-reset-token";
import { getTwoFactorTokenByEmail } from "@/data/two-factor-token";

export const generateTwoFactorToken = async (email: string) => {
  const token = crypto.randomInt(100_000 , 1_000_000).toString();
  const expires = new Date(new Date().getTime() + 5 * 60 * 1000);

  const existingUser = await getTwoFactorTokenByEmail(email);

  if (existingUser) {
    await db.twoFactorToken.delete({
      where: { id: existingUser.id },
    });
  }

  const twoFactorToken = await db.twoFactorToken.create({
    data: {
      token,
      expiresAt: expires,
      email,
    },
  });

  return twoFactorToken;
};

export const generatePasswordResetToken = async (email: string) => {
  const token = uuid4();
  const expires = new Date(new Date().getTime() + 5 * 60 * 1000);

  const existingUser = await getPasswordResetTokenByEmail(email);

  if (existingUser) {
    await db.passwordResetToken.delete({
      where: { id: existingUser.id },
    });
  }

  const passwordResetToken = await db.passwordResetToken.create({
    data: {
      token,
      expiresAt: expires,
      email,
    },
  });

  return passwordResetToken;
};

export const generateVerificationToken = async (email: string) => {
  const token = uuid4();
  const expires = new Date(new Date().getTime() + 5 * 60 * 1000);

  const existingUser = await getVerificationTokenByEmail(email);

  if (existingUser) {
    await db.verificationToken.delete({
      where: { id: existingUser.id },
    });
  }

  const verificationToken = await db.verificationToken.create({
    data: {
      token,
      expiresAt: expires,
      email,
    },
  });

  return verificationToken;
};
