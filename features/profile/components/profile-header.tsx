"use client"

import { useCurrentUser } from "@/hooks/use-current-user";
import React from "react";

const ProfileHeader = () => {
  const user = useCurrentUser();
  return (
    <div className="w-full flex items-center justify-between">
      <h1>account</h1>
      <h1>
        Welcome! <span className="text-red">{user?.name}!</span>
      </h1>
    </div>
  );
};

export default ProfileHeader;
