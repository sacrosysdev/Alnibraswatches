import React from "react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

const Profile = () => {
  return (
    <div className="flex flex-col md:flex-row md:p-16 gap-5 min-h-screen">
      <Sidebar />
      <div className="flex-1 md:p-0">
        <Outlet />
      </div>
    </div>
  );
};

export default Profile;
