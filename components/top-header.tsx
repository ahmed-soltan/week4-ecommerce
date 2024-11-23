import Link from "next/link";
import React from "react";

import LanguageConverter from "./language-converter";

const TopHeader = () => {
  return (
    <div className="bg-black w-full px-3 md:px-10 py-3">
      <div className="flex items-center justify-evenly w-full">
        <div className="flex items-center text-[#FAFAFA] gap-5 text-sm">
          <p>
            Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!
          </p>
          <Link href={"#"} className="font-semibold underline">
            Shop Now
          </Link>
        </div>
        <div className="hidden md:block">
          <LanguageConverter isSidebar={false} />
        </div>
      </div>
    </div>
  );
};

export default TopHeader;
