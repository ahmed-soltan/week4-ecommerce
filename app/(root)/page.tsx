import { FaShippingFast } from "react-icons/fa";
import { TfiHeadphoneAlt } from "react-icons/tfi";
import { GoShieldCheck } from "react-icons/go";

import ContainerWrapper from "@/components/container-wrapper";
import { Separator } from "@/components/ui/separator";

import Banner from "@/features/home/components/banner";
import BestSellingProducts from "@/features/home/components/best-selling-products";
import CarouselCategories from "@/features/home/components/carousel-categories";
import DiscountProductAd from "@/features/home/components/discount-product-ad";
import DiscountProducts from "@/features/home/components/discount-products";
import ExploreProducts from "@/features/home/components/explore-products";
import NewArrival from "@/features/home/components/new-arrival";
import SideCategories from "@/features/home/components/side-categories";

const Home = () => {
  return (
    <ContainerWrapper
      className={"pt-0 flex flex-col items-start gap-y-28 w-full"}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5 w-full">
        <div className="hidden md:block border-r">
          <SideCategories />
        </div>
        <div className="lg:col-span-4">
          <Banner />
        </div>
      </div>
      <DiscountProducts />
      <Separator />
      <CarouselCategories />
      <Separator />
      <BestSellingProducts />
      <DiscountProductAd />
      <ExploreProducts />
      <NewArrival />
      <div className="flex items-center justify-between flex-wrap gap-10 w-full max-w-[1000px] mx-auto mb-10">
        <div className="flex flex-col items-center justify-center gap-3">
          <div className="w-16 h-16 bg-black border-[7px] border-gray-400 rounded-full flex items-center justify-center">
            <FaShippingFast className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-lg font-semibold text-black">
            FREE AND FAST DELIVERY
          </h1>
          <p className="text-sm text-black">
            Free delivery for all orders over $140
          </p>
        </div>
        <div className="flex flex-col items-center justify-center gap-3">
          <div className="w-16 h-16 bg-black border-[7px] border-gray-400 rounded-full flex items-center justify-center">
            <TfiHeadphoneAlt className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-lg font-semibold text-black">
            24/7 CUSTOMER SERVICE
          </h1>
          <p className="text-sm text-black">Friendly 24/7 customer support</p>
        </div>
        <div className="flex flex-col items-center justify-center gap-3">
          <div className="w-16 h-16 bg-black border-[7px] border-gray-400 rounded-full flex items-center justify-center">
            <GoShieldCheck className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-lg font-semibold text-black">
            MONEY BACK GUARANTEE
          </h1>
          <p className="text-sm text-black">We return money within 30 days</p>
        </div>
      </div>
    </ContainerWrapper>
  );
};

export default Home;
