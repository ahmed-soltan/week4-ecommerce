"use client";

import ContainerWrapper from "@/components/container-wrapper";
import { Separator } from "@/components/ui/separator";

import Banner from "@/features/home/components/banner";
import BestSellingProducts from "@/features/home/components/best-selling-products";
import DiscountProductAd from "@/features/home/components/discount-product-ad";
import DiscountProducts from "@/features/home/components/discount-products";
import ExploreProducts from "@/features/home/components/explore-products";
import NewArrival from "@/features/home/components/new-arrival";
import SideCategories from "@/components/side-categories";
import CarouselCategories from "@/features/home/components/carousel-categories";
import Services from "@/features/home/services";

const Home = () => {
  return (
    <ContainerWrapper
      className={"pt-0 flex flex-col items-start gap-y-28 w-full"}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5 w-full">
        <div className="hidden md:block border-r">
          <SideCategories />
        </div>
        <div className="md:col-span-2 lg:col-span-4">
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
      <Services />
    </ContainerWrapper>
  );
};

export default Home;
