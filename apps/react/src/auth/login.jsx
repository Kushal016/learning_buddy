import React, { useEffect, useState } from "react";
import { handleGoogleCallBack, setAuthData } from "../auth-utility/authStorage";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth-utility/AuthContext";
import api from "../auth-utility/axiosInstance";
import { GoogleLogin } from "@react-oauth/google";
const Login = () => {
  const { user, setUser, loading } = useAuth();
  console.log("loading", loading);

  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    userName: "",
    password: "",
    rememberMe: true,
  });
  // console.log(loginData);
  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user]);

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      handleGoogleCallBack({
        credentialResponse,
        rememberMe: loginData.rememberMe,
        setUser,
        navigate,
      });
    } catch (err) {
      console.error("Google login failed", err);
    }
  };
  const handleForgotPassword = async () => {
    try {
      if (loginData?.userName !== "") {
        const res = await api.post("/forgot-password", {
          userName: loginData?.userName,
        });
        if (res.data.success) {
          alert("Rest password email sent to the associated email address.");
        }
      } else {
        // console.log("");
        alert("Please enter username");
      }
    } catch (error) {}
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    apiCall(loginData);
  };
  const apiCall = async (data) => {
    try {
      const res = await api.post("/login", {
        userName: data?.userName,
        password: data?.password,
        rememberMe: data?.rememberMe,
      });
      console.log("res", res.data);

      setAuthData(res.data, data?.rememberMe);
      setUser(res.data.user);
      navigate("/dashboard");
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="w-full h-screen flex items-center">
      <div className="w-1/2 h-full flex flex-col justify-between items-center bg-linear-to-bl from-black via-purple-400 to-blue-400 ">
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
                className="w-full auth_input"
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
                className="w-full auth_input"
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
              <div
                className="text-sm text-indigo-600 hover:underline cursor-pointer font-medium"
                onClick={() => handleForgotPassword()}
              >
                Forgot Password?
              </div>
            </div>

            <button type="submit" className="w-full mb-4 auth_button">
              {loading ? "Logging in..." : "Login"}
            </button>
            <GoogleLogin
              shape={"circle"}
              text={"continue_with"}
              logo_alignment="center"
              onSuccess={handleGoogleSuccess}
              onError={() => console.log("Google Login Failed")}
            />
          </form>
          <p className="text-sm text-gray-500 text-center mt-6">
            Don't have an account?{" "}
            <span
              className="text-purple-500 font-bold cursor-pointer"
              onClick={() => navigate("/signup")}
            >
              Sign up
            </span>
          </p>
        </div>
        {/* </div> */}
      </div>
    </div>
  );
};

export default Login;
