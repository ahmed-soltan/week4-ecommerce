import ContainerWrapper from "@/components/container-wrapper";
import CheckoutDetails from "@/features/checkout/components/checkout-details";
import CheckoutForm from "@/features/checkout/components/checkout-form";
import React from "react";

const CheckoutPage = () => {
  return (
    <ContainerWrapper className="flex flex-col items-start gap-20">
      <h1>checkout</h1>
      <div className="w-full flex flex-col items-start gap-8">
        <h1 className="text-4xl font-medium">Billing Details</h1>
        <CheckoutForm />
      </div>
    </ContainerWrapper>
  );
};

export default CheckoutPage;
