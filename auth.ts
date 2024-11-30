import NextAuth, { type DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";
import { PrismaClient, Address, Review } from "@prisma/client";
import { PrismaAdapter } from "@auth/prisma-adapter";

import authConfig from "./auth.config";
import { getUserById } from "./data/user";
import { db } from "./lib/db";

const prisma = new PrismaClient();

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string | null;
      email: string | null;
      emailVerified: Date | null;
      image: string | null;
      phoneNumber: string | null;
      createdAt: Date;
      updatedAt: Date;
      firstName: string | null;
      lastName: string | null;
      addresses: Address[];
      review: Review[];
    };
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  events: {
    async linkAccount({ user }) {
      await db.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      });
    },
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider !== "credentials") return true;

      const existingUser = await getUserById(user.id!);
      if (!existingUser) return false;

      return true;
    },
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;

        const user = await db.user.findUnique({
          where: { id: token.sub },
          include: { addresses: true, review: true },
        });
        if (user) {
          session.user = {
            id: user.id,
            name: user.name,
            email: user.email || "",
            emailVerified: user.emailVerified,
            phoneNumber: user.phoneNumber || "",
            image: user.image,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
            firstName: user.firstName,
            lastName: user.lastName,
            addresses: user.addresses,
            review: user.review,
          };
        }
      }
      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;
      const existingUser = await getUserById(token.sub);

      if (!existingUser) return token;
      return token;
    },
  },
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  ...authConfig,
});
