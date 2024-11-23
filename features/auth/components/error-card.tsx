import {
  Card,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

import { Header } from "./header";
import { BackButton } from "./back-button";

const ErrorCard = () => {
  return (
    <Card className="w-[400px] shadow-md">
      <CardHeader>
        <Header title="" label={"Oops! something went wrong"} />
      </CardHeader>
      <CardFooter className="flex items-center justify-center">
        <BackButton
          backButtonLabel={"Back to Login"}
          backButtonUrl={"/auth/login"}
        />
      </CardFooter>
    </Card>
  );
};

export default ErrorCard;
