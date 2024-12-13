"use client";

import BreadCrumbs from "@/components/bread-crumbs";
import { useCurrentUser } from "@/hooks/use-current-user";
import React from "react";

const ProfileHeader = () => {
  const user = useCurrentUser();
  return (
    <div className="w-full flex items-center justify-between flex-wrap">
      <div className="hidden md:block">
        <BreadCrumbs />
      </div>
      <h1>
        Welcome! <span className="text-red">{user?.name}!</span>
      </h1>
    </div>
  );
};

export default ProfileHeader;
