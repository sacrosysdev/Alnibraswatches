import React, { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";
import Avatar from "../../../assets/images/Profile/boy.png";
import { IoCall } from "react-icons/io5";
import SidebarLinks from "./SidebarLinks";
import { RiMenuFoldFill } from "react-icons/ri";

const Sidebar = ({ headerHeight = 64 }) => {
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef(null);
  const toggleButtonRef = useRef(null);
  const userDet = JSON.parse(localStorage.getItem("alNibrazuserDet")) || [];

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const closeSidebar = () => {
    setIsOpen(false);
  };

  // Handle click outside to close sidebar
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target) &&
        toggleButtonRef.current &&
        !toggleButtonRef.current.contains(event.target)
      ) {
        closeSidebar();
      }
    };

    // Add event listener
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <>
      {/* Mobile toggle button - positioned at top of content */}
      <div className=" mx-2 lg:hidden mt-3">
        <button
          ref={toggleButtonRef}
          className="sidebar-toggle p-2 rounded-md hover:bg-gray-100 
          transition-all duration-300 ease-in-out transform hover:scale-105"
          onClick={toggleSidebar}
          aria-label="Toggle sidebar"
        >
          {isOpen ? (
            <X
              size={12}
              color="#005C53"
              className="transition-all duration-300 ease-in-out rotate-90"
            />
          ) : (
            <RiMenuFoldFill
              size={20}
              color="#005C53"
              className="transition-all duration-300 ease-in-out"
            />
          )}
        </button>
      </div>

      {/* Sidebar - always visible on desktop, conditional on mobile */}
      <div
        ref={sidebarRef}
        className={`sidebar-container transition-all duration-500 ease-out transform ${
          isOpen
            ? "fixed top-0 left-0 h-screen z-50 bg-white shadow-2xl translate-x-0 w-72 sidebar-slide-in"
            : "hidden lg:block relative w-72"
        }`}
        style={isOpen ? { paddingTop: `${headerHeight}px` } : {}}
      >
        <div className="w-72 font-source md:p-4">
          <div className="flex flex-col items-center gap-2">
            <div className="">
              <img
                src={Avatar}
                alt="avatar"
                className="h-24 w-24 rounded-full bg-gray-300 shadow-xl"
              />
            </div>
            <h1 className="font-bold text-2xl">{userDet[0]?.name || "User"}</h1>
            <div className="flex gap-2">
              <div className="flex gap-1 items-center border-r border-gray-300">
                <div>
                  <IoCall size={20} />
                </div>
                <h2 className="mr-2 text-gray-800">
                  {userDet[0]?.phone || "N/A"}
                </h2>
              </div>
            </div>
          </div>
          <SidebarLinks onItemClick={closeSidebar} />
        </div>
      </div>

      {/* Overlay for mobile when sidebar is open */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40 overlay-fade-in"
          onClick={closeSidebar}
        />
      )}
    </>
  );
};

export default Sidebar;
