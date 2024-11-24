import ContainerWrapper from "@/components/container-wrapper";
import Banner from "@/features/home/components/banner";
import SideCategories from "@/features/home/components/side-categories";

const Home = () => {
  return (
    <ContainerWrapper className={"pt-0"}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5">
        <div className="hidden md:block border-r">
          <SideCategories />
        </div>
        <div className="lg:col-span-4">
          <Banner />
        </div>
      </div>
    </ContainerWrapper>
  );
};

export default Home;
