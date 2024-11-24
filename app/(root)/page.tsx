import ContainerWrapper from "@/components/container-wrapper";

import Banner from "@/features/home/components/banner";
import DiscountProducts from "@/features/home/components/discount-products";
import SideCategories from "@/features/home/components/side-categories";

const Home = () => {
  return (
    <ContainerWrapper className={"pt-0 flex flex-col items-start gap-y-32 w-full"}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5 w-full">
        <div className="hidden md:block border-r">
          <SideCategories />
        </div>
        <div className="lg:col-span-4">
          <Banner />
        </div>
      </div>
      <DiscountProducts/>
    </ContainerWrapper>
  );
};

export default Home;
