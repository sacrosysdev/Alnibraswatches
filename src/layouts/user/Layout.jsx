import React from "react";
import Navbar from "../../components/user/Navbar";
import Footer from "../../components/user/Footer";
import TopNav from "../../components/user/TopNav";
import BelowFooter from "../../components/user/BelowFooter";
import { Outlet } from "react-router-dom";

const UserLayout = () => {
  return (
    <div className="font-dm">
      <div className="">
        <TopNav />
      </div>
      <Navbar />
      <main>{<Outlet />}</main>
      <Footer />
      <BelowFooter />
    </div>
  );
};

export default UserLayout;
