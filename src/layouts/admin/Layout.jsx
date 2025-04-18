import React, { useState } from "react";
import { Outlet } from "react-router";
import DashboardSidebar from "../../components/admin/Sidebar";
import DashboardHeader from "../../components/admin/DashboardHeader";

function DashboardLayout() {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <DashboardSidebar open={open} setOpen={setOpen} />

      <div
        id="dashboardDetails"
        className={`w-full flex flex-col bg-[#E8FBF9]  h-screen transition-all duration-300 overflow-hidden ${
          open ? "pl-[280px]" : "pl-20"
        }`}
      >
        <DashboardHeader />
        <Outlet />
      </div>
    </div>
  );
}

export default DashboardLayout;
