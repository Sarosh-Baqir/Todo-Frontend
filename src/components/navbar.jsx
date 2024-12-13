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
    <nav className="bg-[#f8f8f8] p-4 flex items-center justify-between">
      {/* Left Section - Logo */}
      <div className="flex items-center ml-20 sm:ml-2 md:ml-10">
        <img className="w-16 h-16 rounded-lg" src={logo} alt="Logo" />
      </div>
      {/* Center Section - Search Box */}
      <div className="flex flex-grow justify-center">
        <div className="flex items-center w-1/2 sm:w-1/3 md:w-1/2">
          <input
            className="w-full p-2 bg-white shadow-lg rounded-l-lg"
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <button className="p-2 bg-[#297CBF] text-white rounded-r-lg w-16 flex justify-center items-center border-2 border-[#297CBF]">
            <FaSearch className="text-white w-5 h-5" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
