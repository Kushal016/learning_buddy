import React from "react";

const Header = () => {
  return (
    <div className="w-full  py-3 flex justify-between items-center">
      <div className=" flex items-center space-x-1">
        <div className="w-20 h-20">
          <img src="./logo.png" />
        </div>
        <div className="text-xl font-bold pb-2">Ai tools</div>
      </div>
      <div className="flex space-x-4 pr-6">
        <div className="font-bold cursor-pointer w-20 h-12 items-center justify-center flex rounded-lg shadow-lg bg-white text-purple-600 hover:text-white hover:bg-purple-400">
          Sign up
        </div>
        <div className="font-bold cursor-pointer w-20 h-12 items-center justify-center flex rounded-lg shadow-lg bg-purple-600 text-white hover:text-white hover:bg-purple-400">
          Login
        </div>
      </div>
    </div>
  );
};

export default Header;
