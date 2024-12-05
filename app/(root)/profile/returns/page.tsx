import ContainerWrapper from "@/components/container-wrapper";
import ReturnsList from "@/features/profile/components/returns/returns-list";
import React from "react";

const ReturnsPage = () => {
  return (
    <ContainerWrapper className="flex flex-col items-start gap-10">
      <ReturnsList />
    </ContainerWrapper>
  );
};

export default ReturnsPage;
