import React from "react";
import Call from "../../assets/svg/topnav/call.svg";
import Mail from "../../assets/svg/topnav/mail.svg";
import { Link } from "react-router-dom";

const TopNav = () => {
  return (
    <div className="bg-[#003F38] flex md:justify-between md:items-center py-2 w-full xl:px-14">
      <div className="flex justify-between md:flex-row md:items-center gap-5">
        <div className="flex items-center gap-2">
          <div>
            <img src={Call} alt="callicon" />
          </div>
          <h1 className="text-[#F0F0D6] text-sm">+971 58 8072123</h1>
        </div>
        <div className="flex items-center  gap-2 ">
          <div>
            <img src={Mail} alt="mailicon" />
          </div>
          <h1 className="text-[#F0F0D6] text-sm">alnibraswatches@gmail.com</h1>
        </div>
      </div>
      <div className="hidden md:flex items-center gap-x-5">
        <Link
          to="/our-stores"
          className="text-[#F0F0D6] text-sm hover:underline"
        >
          OUR OUTLETS
        </Link>
        {/* <h1 className="text-[#F0F0D6] text-sm">
          GST (Mon - Sun) 10:00 AM to 10:00 PM
        </h1> */}
      </div>
    </div>
  );
};

export default TopNav;
