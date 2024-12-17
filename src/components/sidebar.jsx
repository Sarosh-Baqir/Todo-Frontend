import React, { useState, useEffect } from "react";
import { FaTasks, FaCog, FaSignOutAlt, FaBars } from "react-icons/fa";
import { LOGOUT_ROUTE } from "../utils/constants";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../lib/apiClient";
import { toast } from "react-toastify";
import { HOST } from "../utils/constants";

const Sidebar = ({
  selected,
  setSelected,
  isSidebarVisible,
  setSidebarVisible,
  toggleSidebar,
  setIsMobilee,
}) => {
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    const handleResize = () => {
      const mobileView = window.innerWidth < 768;

      setIsMobilee(mobileView);
      setIsMobile(mobileView);
      setSidebarVisible(mobileView ? false : isSidebarVisible);
    };

    handleResize();

    setSidebarVisible(isMobile ? false : isSidebarVisible);

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [isMobile]);
  const handleLogout = () => {
    axiosInstance
      .post(LOGOUT_ROUTE)
      .then((response) => {
        toast.success(response?.data?.message || "Logged out successfully");
        localStorage.removeItem("token");
        navigate("/");
      })
      .catch((error) => {
        toast.error(error?.message || "Error Logging out");
      });
  };

  return (
    <div
      className={`${isSidebarVisible ? "bg-[#297CBF]" : "bg-white"} ${
        isSidebarVisible ? "w-64" : "w-16"
      } h-screen px-4 text-white flex flex-col fixed top-0 left-0  mt-[125px] sm:mt-[80px] md:mt-[125px] lg:mt-[135px] transition-all`}
    >
      <div className="relative flex justify-between items-center">
        {/* User Profile Image and Name */}
        {isSidebarVisible && (
          <img
            src={`${HOST}/${user.image}`}
            alt="User Avatar"
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-4 border-white absolute top-[-30px] left-1/2 transform -translate-x-1/2"
          />
        )}
        {/* Hamburger Icon */}
        <div
          className={`absolute top-0 right-4 mt-4 cursor-pointer ${
            isSidebarVisible ? "text-white" : "text-blue-500"
          }`}
          onClick={toggleSidebar}
        >
          <FaBars className="text-xl" />
        </div>
      </div>
      <div className="text-center mt-16 mb-16">
        <p className="text-sm sm:text-lg">
          {user.first_name} {user.last_name}
        </p>
      </div>

      {/* Sidebar Navigation */}
      {isSidebarVisible && (
        <div className="flex flex-col ">
          {/* My Task */}
          <div
            className={`flex items-center p-3 rounded-lg cursor-pointer mb-4 ${
              selected === "myTask" ? "bg-white text-[#297CBF]" : "text-white"
            }`}
            onClick={() => setSelected("myTask")}
          >
            <FaTasks className="mr-4" />
            <span className="text-sm sm:text-base">My Task</span>
          </div>

          {/* Settings */}
          <div
            className={`flex items-center p-3 rounded-lg cursor-pointer ${
              selected === "settings" ? "bg-white text-[#297CBF]" : "text-white"
            }`}
            onClick={() => setSelected("settings")}
          >
            <FaCog className="mr-4" />
            <span className="text-sm sm:text-base">Settings</span>
          </div>

          {/* Logout Button */}
          <div
            className="flex items-center p-3 rounded-lg cursor-pointer text-white mt-auto mb-4"
            onClick={handleLogout}
          >
            <FaSignOutAlt className="mr-4" />
            {isSidebarVisible && (
              <span className="text-sm sm:text-base">Logout</span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
