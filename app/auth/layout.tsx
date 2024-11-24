import Image from "next/image";

import { AuthSideImage } from "@/data/images";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 h-full py-10 gap-16">
      <div className="w-full max-w-[805px] h-[600px] md:h-[781px] relative">
        <Image src={AuthSideImage} alt="Auth Side Image" fill />
      </div>
      <div className="flex items-center justify-center md:justify-start h-full">
        {children}
      </div>
    </div>
  );
}
