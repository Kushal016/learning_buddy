import React, { useState } from "react";

const Login = () => {
  const [loginData, setLoginData] = useState({
    userName: "",
    password: "",
    rememberMe: true,
  });
  console.log(loginData);
  const handleSubmit = (e) => {
    e.preventDefault();
  };
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
      <div className="w-1/2 h-full bg-purple-100 flex items-center justify-center">
        <div className="bg-white p-10 rounded-xl shadow-2xl w-88 transform transition duration-500 hover:scale-105">
          <h2 className="text-3xl font-bold text-center text-purple-700 mb-6">
            Welcome Back 👋
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <input
                type="text"
                value={loginData.userName}
                id="username"
                placeholder="Enter username"
                onChange={(e) =>
                  setLoginData({ ...loginData, userName: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-700"
              />
            </div>
            <div className="mb-6">
              <input
                type="password"
                value={loginData.password}
                id="password"
                placeholder="Enter password"
                onChange={(e) =>
                  setLoginData({ ...loginData, password: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-700"
              />
            </div>
            <div className="flex items-center justify-between mb-6">
              <label className="flex items-center text-gray-600">
                <input
                  type="checkbox"
                  checked={loginData.rememberMe}
                  onChange={(e) => {
                    setLoginData({
                      ...loginData,
                      rememberMe: e.target.checked,
                    });
                  }}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-sm">Remember Me</span>
              </label>
              <a
                href="#"
                className="text-sm text-indigo-600 hover:underline font-medium"
              >
                Forgot Password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full bg-linear-to-r from-pink-600 via-purple-500 to-blue-600  text-white py-2 rounded-md font-bold shadow-lg hover:shadow-pink-500/50 hover:from-pink-600 hover:to-indigo-600 transition duration-300"
            >
              Login
            </button>
          </form>
          <p className="text-sm text-gray-500 text-center mt-6">
            Don't have an account?
            <a
              href="#"
              className="text-indigo-600 font-semibold hover:underline"
            >
              Sign up
            </a>
          </p>
        </div>
        {/* </div> */}
      </div>
    </div>
  );
};

export default Login;
