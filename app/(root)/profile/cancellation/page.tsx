import ContainerWrapper from "@/components/container-wrapper";
import CancellationsList from "@/features/profile/components/cancellations/cancellations-list";
import React from "react";

const CancellationsPage = () => {
  return (
    <ContainerWrapper className="flex flex-col items-start gap-10">
      <CancellationsList />
    </ContainerWrapper>
  );
};

export default CancellationsPage;
