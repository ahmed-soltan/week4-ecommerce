"use client";

import { Button } from "@/components/ui/button";
import { appleImage, bannerImage } from "@/data/images";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FiArrowRight } from "react-icons/fi";

const Banner = () => {
  return (
    <div className="w-full min-h-[400px] grid grid-cols-1 lg:grid-cols-2 bg-black p-5 gap-5 mt-10 text-[#FAFAFA]">
      <div className="flex flex-col items-start justify-center gap-5 pl-20">
        <div className="flex items-center gap-5">
          <Image src={appleImage} alt="apple" width={60} height={60} />
          <h1 className="text-lg ">iPhone 14 Series</h1>
        </div>
        <h1 className="text-[48px] font-semibold">
          Up to 10% <br /> off Voucher
        </h1>
        <Button
          variant={"link"}
          className="text-[#FAFAFA] text-lg p-0 underline"
          size={"lg"}
          asChild
        >
          <Link href={"/products"}>
            Shop Now
            <FiArrowRight className="w-6 h-6 ml-2" />
          </Link>
        </Button>
      </div>
      <div className="relative min-h-[400px] flex items-center justify-center">
        <Image src={bannerImage} alt="banner Image" fill />
      </div>
    </div>
  );
};

export default Banner;
