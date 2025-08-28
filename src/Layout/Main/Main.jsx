import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import TokenValidator from "../../components/common/TokenValidator";

const Main = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed((prev) => !prev);
  };

  return (
    <div className="h-screen w-screen flex bg-[#f8f8f8]">
      {/* Token Validator for automatic logout */}
      <TokenValidator />

      {/* Sidebar */}
      <Sidebar isCollapsed={isCollapsed} />

      {/* Main Content */}
      <div className="flex flex-col flex-1 transition-all duration-300">
        <Header toggleSidebar={toggleSidebar} />
        <div
          className="flex-1 p-4 bg-quilocoS overflow-auto [&::-webkit-scrollbar]:w-0
                    [&::-webkit-scrollbar-track]:rounded-full
                    [&::-webkit-scrollbar-track]:bg-gray-100
                    [&::-webkit-scrollbar-thumb]:rounded-full
                    [&::-webkit-scrollbar-thumb]:bg-gray-300
                    dark:[&::-webkit-scrollbar-track]:bg-neutral-700
                    dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500"
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Main;
