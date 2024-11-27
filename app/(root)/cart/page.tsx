import ContainerWrapper from "@/components/container-wrapper";
import CartTable from "@/features/cart/components/cart-table";
import React from "react";

const CartPage = () => {


  return (
    <ContainerWrapper>
      <div className="flex flex-col items-start gap-10 w-full">
        <h1>cart</h1>
        <CartTable />
        <div className="flex items-start justify-between w-full"></div>
      </div>
    </ContainerWrapper>
  );
};

export default CartPage;
