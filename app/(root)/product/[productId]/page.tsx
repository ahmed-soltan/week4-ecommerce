import ContainerWrapper from "@/components/container-wrapper";
import { ProductDetails } from "@/features/product/components/product-details";
import RelatedProducts from "@/features/product/components/related-products";
import React from "react";

interface ProductPageIdProps {
  params: { productId: string };
}

const ProductPageId = ({ params }: ProductPageIdProps) => {
  return (
    <ContainerWrapper className="flex items-start flex-col gap-20">
      <ProductDetails productId={params.productId} />
      <RelatedProducts productId={params.productId}/>
    </ContainerWrapper>
  );
};

export default ProductPageId;
