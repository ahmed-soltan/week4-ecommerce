import ContainerWrapper from "@/components/container-wrapper";
import { Separator } from "@/components/ui/separator";

import Banner from "@/features/home/components/banner";
import BestSellingProducts from "@/features/home/components/best-selling-products";
import CarouselCategories from "@/features/home/components/carousel-categories";
import DiscountProductAd from "@/features/home/components/discount-product-ad";
import DiscountProducts from "@/features/home/components/discount-products";
import ExploreProducts from "@/features/home/components/explore-products";
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
    </ContainerWrapper>
  );
};

export default Home;
