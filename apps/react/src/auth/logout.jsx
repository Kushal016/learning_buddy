import React, { useEffect, useState } from "react";
import { useAuth } from "../auth-utility/AuthContext";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const { logOut } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    const timer = setTimeout(() => {
      logOut();
      navigate("/");
    }, 2000);

    return () => clearTimeout(timer);
  }, []);
  return (
    <div class="flex flex-col items-center justify-center mt-36 gap-4">
      <div class="h-10 w-10 rounded-full border-4 border-gray-300 border-t-purple-500 animate-spin"></div>
      <p class="text-md text-gray-500">
        Please wait a moment. Logging you out…
      </p>
    </div>
  );
};

export default Logout;
