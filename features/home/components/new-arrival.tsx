import Image from "next/image";
import Link from "next/link";
import React from "react";

import { Button } from "@/components/ui/button";

import { CameraImage, PhoneImage, PlaystationImage } from "@/data/images";

const NewArrival = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 w-full min-h-[600px] gap-10">
      <div className="bg-black p-5 relative min-h-[600px]">
        <Image src={PlaystationImage} alt="playstation 5" fill/>
        <div className="absolute bottom-5 left-4 sm:left-16 flex flex-col items-start gap-5 text-white ">
          <h1 className="text-2xl font-semibold">PlayStation 5</h1>
          <p className="text-md text-gray-100">
            Black and White version of the PS5 <br /> coming out on sale.
          </p>
          <Button
            variant={"link"}
            className="bg-transparent underline text-lg text-white p-0"
            size={"lg"}
            asChild
          >
            <Link href={`/product/67445b5cad229eaf26b61512`}>Shop Now</Link>
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-8">
        <div className="h-[284px] relative bg-black p-5">
          <Image
            src={PhoneImage}
            alt="Phone"
            width={400}
            height={100}
            className="h-full ml-auto w-full max-w-[300px]"
          />
          <div className="absolute bottom-5 left-4 sm:left-6 flex flex-col items-start gap-2 text-white ">
            <h1 className="text-2xl font-semibold">Smart Phone</h1>
            <p className="text-md text-gray-100">
              Featured Phones Has Released <br /> With High Quality.
            </p>
            <Button
              variant={"link"}
              className="bg-transparent underline text-lg text-white p-0"
              size={"lg"}
              asChild
            >
              <Link href={`/product/6744566645b081c0868f1d6a`}>Shop Now</Link>
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          <div className="h-[284px] relative bg-black">
            <Image src={CameraImage} alt="playstation 5" fill />
            <div className="absolute bottom-5 left-4 sm:left-6 flex flex-col items-start gap-2 text-white ">
              <h1 className="text-2xl font-semibold">4K Digital Camera</h1>
              <p className="text-md text-gray-100">
                Selfie Camera WITH 180° FLIP SCREEN.
              </p>
              <Button
                variant={"link"}
                className="bg-transparent underline text-lg text-white p-0"
                size={"lg"}
                asChild
              >
                <Link href={`/product/674452dcbd35715fe9463381`}>Shop Now</Link>
              </Button>
            </div>
          </div>
          <div className="h-[284px] relative bg-black">
            <Image src={PlaystationImage} alt="playstation 5" fill />
            <div className="absolute bottom-5 left-4 sm:left-6 flex flex-col items-start gap-2 text-white ">
              <h1 className="text-2xl font-semibold">PlayStation 5</h1>
              <p className="text-md text-gray-100">
                Selfie Camera WITH 180° FLIP SCREEN.
              </p>
              <Button
                variant={"link"}
                className="bg-transparent underline text-lg text-white p-0"
                size={"lg"}
                asChild
              >
                <Link href={`/product/67445b5cad229eaf26b61512`}>Shop Now</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewArrival;
