import React from "react";
import { Outlet } from "react-router-dom";
import SideCard from "./SideCard";
import Navbar from "./Navbar";

const AppLayout = () => {
  return (
    <div className="w-full h-dvh bg-purple-50 flex ">
      <div className=" w-1/5 ">
        <SideCard />
      </div>
      <main className="w-4/5 ">
        <Navbar />
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;
