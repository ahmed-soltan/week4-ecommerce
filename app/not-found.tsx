import ContainerWrapper from "@/components/container-wrapper";
import { Button } from "@/components/ui/button";
import React from "react";

const NotFound = () => {
  return (
    <ContainerWrapper>
      <h1>Not Found</h1>
      <div className="flex flex-col items-center justify-center h-full w-full gap-8">
        <h1 className="text-6xl font-bold">404 Not Found</h1>
        <p className="text-md">
          Your visited page not found. You may go home page.
        </p>
        <Button
          variant={"destructive"}
          size={"lg"}
          className="h-12 rounded-sm w-full max-w-[200px]"
        >
          Back to Home Page
        </Button>
      </div>
    </ContainerWrapper>
  );
};

export default NotFound;
