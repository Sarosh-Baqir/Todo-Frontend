import React, { useState } from "react";
import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";
import Tasks from "../components/tasks";
import Settings from "../components/settings";

const Dashboard = () => {
  const [selected, setSelected] = useState("myTask");
  const [searchQuery, setSearchQuery] = useState("");
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  return (
    <div>
      <Navbar onSearch={handleSearch} />
      <div className="flex">
        {/* Sidebar */}
        <Sidebar
          selected={selected}
          setSelected={setSelected}
          isSidebarVisible={isSidebarVisible}
          toggleSidebar={toggleSidebar}
          setSidebarVisible={setIsSidebarVisible}
          setIsMobilee={setIsMobile}
        />

        {/* Main Content */}
        <div
          className={`flex-grow mt-[6rem] m-4 p-8 overflow-auto max-h-[calc(100vh-6rem)] no-scrollbar transition-all ${
            isSidebarVisible ? "ml-64" : "ml-16"
          }`}
        >
          {selected === "myTask" ? (
            <Tasks
              searchQuery={searchQuery}
              isMobile={isMobile}
              isSidebarVisible={isSidebarVisible}
            />
          ) : (
            <Settings isMobile={isMobile} isSidebarVisible={isSidebarVisible} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
