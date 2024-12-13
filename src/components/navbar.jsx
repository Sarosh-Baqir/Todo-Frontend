import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import logo from "../logo.png";

const Navbar = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <nav className="bg-[#f8f8f8] p-4 flex flex-wrap items-center justify-between">
      {/* Left Section - Logo */}
      <div className="flex items-center">
        <img
          className="w-12 h-12 sm:w-16 sm:h-16 rounded-lg"
          src={logo}
          alt="Logo"
        />
      </div>

      {/* Center Section - Search Box */}
      <div className="flex justify-center flex-grow mt-4 sm:mt-0 ml-2">
        <div className="flex items-center w-full max-w-md">
          <input
            className="w-full p-2 bg-white shadow-lg rounded-l-lg text-sm sm:text-base"
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <button className="p-2 bg-[#297CBF] text-white rounded-r-lg flex justify-center items-center border-2 border-[#297CBF] w-12">
            <FaSearch className="text-white w-4 h-4" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
