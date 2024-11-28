import ContainerWrapper from "@/components/container-wrapper";
import CartTable from "@/features/cart/components/cart-table";
import CartTotals from "@/features/cart/components/cart-totals";
import React from "react";

const CartPage = () => {
  return (
    <ContainerWrapper>
      <div className="flex flex-col items-start gap-10 w-full">
        <h1>cart</h1>
        <CartTable />
        <CartTotals />
      </div>
    </ContainerWrapper>
  );
};

export default CartPage;
