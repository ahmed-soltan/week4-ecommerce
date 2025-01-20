import Link from "next/link";

import ContainerWrapper from "@/components/container-wrapper";
import { Button } from "@/components/ui/button";

const SuccessPage = () => {
  return (
    <ContainerWrapper className="h-full flex items-center justify-center flex-col gap-8 my-10 w-full">
      <h1 className="text-6xl font-bold">Order Placed Successfully!</h1>
      <p>Thank you for your order. We Will Get You As Soon As Possible</p>
      <Button
        variant={"destructive"}
        className="h-12 w-full max-w-[250px]"
        asChild
      >
        <Link href="/profile/orders">View Your Orders</Link>
      </Button>
    </ContainerWrapper>
  );
};

export default SuccessPage;
