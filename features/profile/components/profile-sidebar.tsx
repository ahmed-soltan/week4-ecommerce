import React from "react";
import SidebarRoute from "./sidebar-route";

const ProfileSidebar = () => {
  const sidebarRoutes = [
    {
      title: "Manage My Account",
      routes: [
        {
          label: "My Profile",
          path: "/profile",
        },
        {
          label: "Address Book",
          path: "/profile/address-book",
        },
        {
          label: "My Payment Options",
          path: "/profile/payment-options",
        },
      ],
    },
    {
      title: "My Orders",
      routes: [
        {
          label: "My Orders",
          path: "/profile/orders",
        },
        {
          label: "My Returns",
          path: "/profile/returns",
        },
        {
          label: "My Cancellation",
          path: "/profile/cancellation",
        },
      ],
    },
    {
      title: "My Wishlist",
      routes: [
        {
          label: "View Wishlist",
          path: "/wishlist",
        },
      ],
    },
  ];
  return (
    <div className="flex flex-col items-start gap-5">
      {sidebarRoutes.map((route, index) => {
        return (
          <SidebarRoute key={index} title={route.title} routes={route.routes} />
        );
      })}
    </div>
  );
};

export default ProfileSidebar;
