import React from "react";
import { useLocation } from "react-router";
import { Icon } from "@iconify/react/dist/iconify.js";
import profilePic from "../../assets/images/dashboard/profilePhoto.png";
import { HEADER_TITLE } from "../../constant";

function DashboardHeader() {
  const location = useLocation();
  const lastSegment = location.pathname
    .split("/")
    .pop()
    .toLowerCase()
    .replace(/[-_]/g, "");

  const title = HEADER_TITLE.filter((item) => {
    const normalizedTitle = item.title.toLowerCase().replace(/\s+/g, "");

    return (
      normalizedTitle.includes(lastSegment) ||
      lastSegment.includes(normalizedTitle)
    );
  });

  return (
    <div className="w-full h-fit ">
      <div className="flex flex-row justify-between items-center w-full  mx-auto p-5">
        <h1 className="font-public text-2xl font-bold capitalize text-[#23272E] ">
          {title[0]?.title}
        </h1>
        <div className="flex flex-row items-center gap-x-6  ">
          <button className="text-[#4B465C] cursor-pointer ">
            <Icon icon="tabler:bell" width="26" height="26" />
          </button>
          <button className="w-9.5 cursor-pointer aspect-square rounded-full  relative bg-black">
            <img
              src={profilePic}
              className="w-full h-full object-cover rounded-full"
              alt="profile picture"
            />
            <div className="w-3 aspect-square bg-[#28C76F] rounded-full border-2 border-white absolute z-10 bottom-0 right-0"></div>
          </button>
        </div>
      </div>
    </div>
  );
}

export default DashboardHeader;
