"use client";

import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/hooks/use-current-user";
import { signOut } from "next-auth/react";

const SettingsPage = () => {
  const user = useCurrentUser();

  const onClick = () => {
    signOut();
  };

  return (
    <div>
      <h1>Settings Page</h1>
      <p>{user?.name}</p>
      <Button type="submit" onClick={onClick}>
        Sign Out
      </Button>
    </div>
  );
};

export default SettingsPage;
