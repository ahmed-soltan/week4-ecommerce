import ContainerWrapper from "@/components/container-wrapper";
import { ProductDetails } from "@/features/product/components/product-details";
import React from "react";

interface ProductPageIdProps {
  params: { productId: string };
}

const ProductPageId = ({ params }: ProductPageIdProps) => {
  return (
    <ContainerWrapper>
      <ProductDetails productId={params.productId}/>
    </ContainerWrapper>
  );
};

export default ProductPageId;
