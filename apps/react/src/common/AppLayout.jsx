import React from "react";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <div className="app">
      {/* <Sidebar />
      <Navbar /> */}
      <div>Header</div>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;
