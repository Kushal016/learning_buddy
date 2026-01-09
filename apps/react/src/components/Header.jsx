import React from "react";
import HomeNavBar from "./Home-NavBar";

const Header = () => {
  return (
    <div className="flex w-full h-auto px-2 py-6 bg-slate-600 items-center justify-between text-white">
      <div className="text-2xl font-bold pl-4">GigWorks</div>
      <div className="pr-4">
        <HomeNavBar />
      </div>
    </div>
  );
};

export default Header;
