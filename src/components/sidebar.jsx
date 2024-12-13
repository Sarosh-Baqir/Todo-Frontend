import React from "react";
import { FaTasks, FaCog, FaSignOutAlt } from "react-icons/fa";
import { LOGOUT_ROUTE } from "../utils/constants";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../lib/apiClient";
import { toast } from "react-toastify";

const Sidebar = ({ selected, setSelected }) => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  console.log(user);

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
  const getProfileImage = () => {
    alert("hjkl");
    // if (user?.image) {
    //   const fullUrl = user.image.replace(/\\/g, "/");
    //   console.log(fullUrl); // Log the final image URL
    //   return fullUrl;
    // } else {
    //   return "https://www.w3schools.com/w3images/avatar2.png"; // Default avatar if no image exists
    // }
    return user.image.replace(/\\/g, "/");
  };

  return (
    <div className="bg-[#297CBF] w-64 sm:w-48 md:w-64 lg:w-64 h-screen px-4 text-white flex flex-col fixed top-0 left-0 mt-[125px] sm:mt-[75px] md:mt-[100px] lg:mt-[120px]">
      {/* User Profile Image */}
      <div className="relative flex justify-center items-center">
        <img
          src="https://www.w3schools.com/w3images/avatar2.png"
          alt="User Avatar"
          className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-4 border-white absolute top-[-30px]"
        />
      </div>

      {/* User Name */}
      <div className="flex flex-col items-center mt-12 sm:mt-16 mb-8">
        <p className="text-sm sm:text-lg">
          {user.first_name} {user.last_name}
        </p>
      </div>

      {/* Sidebar Navigation */}
      <div className="flex flex-col">
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
          className={`flex items-center p-3 rounded-lg cursor-pointer mb-4 ${
            selected === "settings" ? "bg-white text-[#297CBF]" : "text-white"
          }`}
          onClick={() => setSelected("settings")}
        >
          <FaCog className="mr-4" />
          <span className="text-sm sm:text-base">Settings</span>
        </div>

        {/* Logout Button */}
        <div
          className="flex items-center p-3 rounded-lg cursor-pointer mt-8 sm:mt-12 md:mt-16 lg:mt-16 text-white"
          onClick={handleLogout}
        >
          <FaSignOutAlt className="mr-4" />
          <span className="text-sm sm:text-base">Logout</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
