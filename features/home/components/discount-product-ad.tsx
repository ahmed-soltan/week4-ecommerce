"use client";

import { Button } from "@/components/ui/button";
import { useFetchDiscountProducts } from "@/hooks/use-fetch-discount-products";
import Image from "next/image";
import Link from "next/link";

const DiscountProductAd = () => {
  const { discountProducts, isLoading } = useFetchDiscountProducts();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  const product = discountProducts[0];

  if (!product) {
    return null;
  }

  return (
    <div className="w-full min-h-[500px] grid grid-cols-1 lg:grid-cols-2 bg-black p-5 md:px-14 xl:px-20 gap-5 mt-10 text-[#FAFAFA]">
      <div className="flex flex-col items-start justify-center gap-8 pl-0 md:14 xl:pl-20">
        <h1 className="text-lg text-emerald-400">Categories</h1>
        <h1
          className="text-4xl sm:text-[48px] font-semibold"
          style={{ lineHeight: "60px" }}
        >
          Enhance Your <br /> Music Experience
        </h1>
        <div className="flex items-center gap-5 flex-wrap">
          <div className="bg-white rounded-full w-20 h-20 flex flex-col items-center justify-center text-black text-center text-sm">
            <span className="font-bold">05</span>Days
          </div>
          :
          <div className="bg-white rounded-full w-20 h-20 flex flex-col items-center justify-center text-black text-center text-sm">
            <span className="font-bold">23</span>
            Hours
          </div>
          :
          <div className="bg-white rounded-full w-20 h-20 flex flex-col items-center justify-center text-black text-center text-sm">
            <span className="font-bold">59</span>
            Minutes
          </div>
          :
          <div className="bg-white rounded-full w-20 h-20 flex flex-col items-center justify-center text-black text-center text-sm">
            <span className="font-bold">35</span>
            Seconds
          </div>
        </div>
        <Button
          className="text-[#FAFAFA] bg-emerald-400 text-lg w-full sm:max-w-[200px] h-14"
          size={"lg"}
          asChild
        >
          <Link href={`/product/${product.id}`}>Buy Now!</Link>
        </Button>
      </div>
      <div className="relative min-h-[400px] flex items-center justify-center">
        <div className="relative isolate w-full h-full">
          <div className="pointer-events-none absolute inset-x-0 top-[-150px] -z-10 transform-gpu overflow-hidden blur-3xl h-[500px]">
            <div
              style={{
                clipPath:
                  "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
              }}
              className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#D9D9D9] to-[#FFFFFF] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            />
          </div>
          <Image
            src={product.images[0].image}
            alt="banner Image"
            fill
            className="z-20"
          />
        </div>
      </div>
    </div>
  );
};

export default DiscountProductAd;
