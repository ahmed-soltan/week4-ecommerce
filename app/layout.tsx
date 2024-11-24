import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import { SessionProvider } from "next-auth/react";

import "./globals.css";

import { auth } from "@/auth";

import TopHeader from "@/components/top-header";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

import { TanstackProvider } from "@/providers/tanstack-provider";

const poppins = Poppins({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <SessionProvider session={session}>
      <html lang="en">
        <body className={poppins.className}>
          <TanstackProvider>
            <TopHeader />
            <Navbar />
            <div className="flex-1">{children}</div>
            <Footer />
          </TanstackProvider>
        </body>
      </html>
    </SessionProvider>
  );
}
