import React from "react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

const Profile = () => {
  return (
    <div className="flex flex-col md:flex-row lg:p-16 md:gap-5 min-h-screen">
      <Sidebar />
      <div className="flex-1 md:p-0  p-4">
        <Outlet />
      </div>
    </div>
  );
};

export default Profile;
