import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

import { Header } from "./header";
import { Social } from "./social";
import { BackButton } from "./back-button";

interface CardWrapperProps {
  children: React.ReactNode;
  title: string;
  headerLabel: string;
  backButtonLabel?: string;
  backButtonUrl?: string;
  showSocial?: boolean;
}

const CardWrapper = ({
  children,
  title,
  headerLabel,
  backButtonLabel,
  backButtonUrl,
  showSocial = false,
}: CardWrapperProps) => {
  return (
    <Card className="w-[400px] h-[530px] border-none shadow-none">
      <CardHeader>
        <Header label={headerLabel} title={title} />
      </CardHeader>
      <CardContent>{children}</CardContent>
      {showSocial && (
        <CardFooter>
          <Social />
        </CardFooter>
      )}
      {backButtonUrl && backButtonLabel && (
        <CardFooter>
          <BackButton
            backButtonLabel={backButtonLabel}
            backButtonUrl={backButtonUrl}
          />
        </CardFooter>
      )}
    </Card>
  );
};

export default CardWrapper;
