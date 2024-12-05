import ContainerWrapper from "@/components/container-wrapper";
import Filters from "@/features/products/components/filters";
import FiltersSidebar from "@/features/products/components/filters-sidebar";
import ProductsList from "@/features/products/components/products-list";

const ProductsPage = () => {
  return (
    <ContainerWrapper className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5">
      <div className="hidden md:block">
        <Filters />
      </div>
      <div className="block md:hidden">
        <FiltersSidebar />
      </div>
      <ProductsList />
    </ContainerWrapper>
  );
};

export default ProductsPage;
