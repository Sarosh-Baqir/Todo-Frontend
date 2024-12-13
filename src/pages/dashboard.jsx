import React, { useState } from "react";
import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";
import Tasks from "../components/tasks";
import Settings from "../components/settings";

const Dashboard = () => {
  const [selected, setSelected] = useState("myTask");
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <div>
      <Navbar onSearch={handleSearch} />
      <div className="flex">
        <Sidebar selected={selected} setSelected={setSelected} />

        <div className="flex-grow ml-64 m-4 p-8">
          {selected === "myTask" ? (
            <Tasks searchQuery={searchQuery} />
          ) : (
            <Settings />
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
