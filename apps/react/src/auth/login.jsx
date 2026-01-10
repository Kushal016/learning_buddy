import React from "react";

const Login = () => {
  return (
    <div className="w-full h-screen flex items-center">
      <div className="w-1/2 h-full flex flex-col justify-between items-center">
        <div className="`h-64 w-64 pr-6">
          <img src="login1.png" />
        </div>
        <div className="`h-64 w-md pb-20">
          <img src="login2.png" />
        </div>
      </div>
      <div className="w-1/2 h-full bg-purple-50"></div>
    </div>
  );
};

export default Login;
