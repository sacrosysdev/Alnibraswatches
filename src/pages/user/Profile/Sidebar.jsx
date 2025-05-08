import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import Avatar from "../../../assets/images/Profile/boy.png";
import { IoCall } from "react-icons/io5";
import SidebarLinks from "./SidebarLinks";
import { RiMenuFoldFill } from "react-icons/ri";

const Sidebar = ({ headerHeight = 64 }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const userDet = JSON.parse(localStorage.getItem("alNibrazuserDet"));
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        isOpen &&
        isMobile &&
        !e.target.closest(".sidebar-container") &&
        !e.target.closest(".sidebar-toggle")
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    // Prevent body scrolling when drawer is open
    if (isOpen && isMobile) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "auto";
    };
  }, [isOpen, isMobile]);

  return (
    <>
      {/* Mobile toggle button */}
      {isMobile && (
        <button
          className="sidebar-toggle fixed top-25 left-4 z-50  p-2 rounded-md "
          onClick={toggleSidebar}
          aria-label="Toggle sidebar"
        >
          {isOpen ? (
            <X size={24} />
          ) : (
            <RiMenuFoldFill size={30} color="#005C53" />
          )}
        </button>
      )}

      {/* Sidebar - always visible on desktop, conditional on mobile */}
      <div
        className={`sidebar-container hidden lg:block transition-all duration-300 ease-in-out ${
          isMobile
            ? `fixed top-0 left-0 h-screen z-50 bg-white shadow-xl transform ${
                isOpen ? "translate-x-0" : "-translate-x-full"
              }`
            : "relative"
        }`}
        style={isMobile ? { paddingTop: `${headerHeight}px` } : {}}
      >
        <div className="w-72 font-source p-4">
          <div className="flex flex-col items-center gap-2">
            <div className="">
              <img
                src={Avatar}
                alt="avatar"
                className="h-24 w-24 rounded-full bg-gray-300 shadow-xl"
              />
            </div>
            <h1 className="font-bold text-2xl">{userDet[0].name}</h1>
            <div className="flex gap-2">
              <div className="flex gap-1 items-center border-r border-gray-300">
                <div>
                  <IoCall size={20} />
                </div>
                <h2 className="mr-2 text-gray-800">{userDet[0].phone}</h2>
              </div>
            </div>
          </div>
          <SidebarLinks />
        </div>
      </div>

      {/* Overlay for mobile when sidebar is open */}
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={toggleSidebar}
        />
      )}
    </>
  );
};

export default Sidebar;
