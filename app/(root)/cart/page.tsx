import React from "react";

import BreadCrumbs from "@/components/bread-crumbs";
import ContainerWrapper from "@/components/container-wrapper";
import CartTable from "@/features/cart/components/cart-table";
import CartTotals from "@/features/cart/components/cart-totals";

const CartPage = () => {
  return (
    <ContainerWrapper>
      <div className="flex flex-col items-start gap-10 w-full">
        <BreadCrumbs />
        <CartTable />
        <CartTotals />
      </div>
    </ContainerWrapper>
  );
};

export default CartPage;
