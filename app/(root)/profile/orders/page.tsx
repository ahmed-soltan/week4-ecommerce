import ContainerWrapper from "@/components/container-wrapper";
import OrdersList from "@/features/profile/components/orders/orders-list";
import React from "react";

const OrdersPage = () => {
  return (
    <ContainerWrapper className="flex flex-col items-start gap-10">
      <OrdersList />
    </ContainerWrapper>
  );
};

export default OrdersPage;
