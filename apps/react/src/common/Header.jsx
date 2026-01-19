import React from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full  py-3 flex justify-between items-center px-6">
      <div className=" flex items-center space-x-1">
        <div className="w-20 h-20">
          <img src="./logo.png" />
        </div>
        <div className="text-xl font-bold pb-2 text-black">AI tools</div>
      </div>
      <div className="flex flex-row space-x-4 pr-6">
        <div
          onClick={() => navigate("/login")}
          className="cursor-pointer w-28 h-12 items-center justify-center flex rounded-lg shadow-lg bg-purple-100 text-purple-600 hover:text-white hover:bg-purple-400"
        >
          Login
        </div>
        <div
          onClick={() => navigate("/signup")}
          className="cursor-pointer w-28 h-12 items-center justify-center flex rounded-lg shadow-lg bg-linear-to-bl from-pink-400 to-purple-600 text-white hover:text-white hover:bg-purple-400"
        >
          Sign up
        </div>
      </div>
    </div>
  );
};

export default Header;
