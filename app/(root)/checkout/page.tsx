import React from "react";

import BreadCrumbs from "@/components/bread-crumbs";
import ContainerWrapper from "@/components/container-wrapper";
import CheckoutForm from "@/features/checkout/components/checkout-form";

const CheckoutPage = () => {
  return (
    <ContainerWrapper className="flex flex-col items-start gap-20">
      <BreadCrumbs />
      <div className="w-full flex flex-col items-start gap-8">
        <h1 className="text-4xl font-medium">Billing Details</h1>
        <CheckoutForm />
      </div>
    </ContainerWrapper>
  );
};

export default CheckoutPage;
