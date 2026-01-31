import React, { useEffect, useState } from "react";
import { handleGoogleCallBack, setAuthData } from "../auth-utility/authStorage";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth-utility/AuthContext";
import api from "../auth-utility/axiosInstance";
import { GoogleLogin } from "@react-oauth/google";
import { toast } from "react-toastify";
const Login = () => {
  const { user, setUser, loading } = useAuth();
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    userName: "",
    password: "",
    rememberMe: true,
  });
  const [errors, setErrors] = useState({});

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
      // setapiError(null);
    } catch (err) {
      // setapiError(err.message);
      toast.error(err.message ?? "Google login failed");
    }
  };
  const handleForgotPassword = async () => {
    try {
      if (loginData?.userName !== "") {
        const res = await api.post("/forgot-password", {
          userName: loginData?.userName,
        });
        if (res.data.success) {
          // setResetPassSent(true);
          toast.success(
            "Rest password email sent to the associated email address.",
          );
          // alert("Rest password email sent to the associated email address.");
        }
      } else {
        // setapiError("Unable to send the reset link. ");
        toast.error("Unable to send the reset link.");
      }
    } catch (error) {}
  };
  const validate = () => {
    const newErrors = {};
    if (loginData.userName === "") {
      newErrors.userName = "Username is required";
    } else if (loginData.userName.length < 3) {
      newErrors.userName = "Invalid Username, must be at least 3 characters.";
    }

    if (loginData.password === "") {
      newErrors.password = "Password is required";
    } else if (loginData.password.length < 3) {
      newErrors.password = "Password must be at least 3 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) apiCall(loginData);
  };
  const apiCall = async (data) => {
    try {
      const res = await api.post("/login", {
        userName: data?.userName,
        password: data?.password,
        rememberMe: data?.rememberMe,
      });
      setAuthData(res.data, data?.rememberMe);
      setUser(res.data.user);
      navigate("/");
      // setapiError(null);
    } catch (error) {
      toast.error(
        error?.response?.data?.message
          ? error?.response?.data?.message
          : error.message,
      );
      // console.log(error);
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
          {/* {resetPassSent && (
            <div className="flex rounded text-center justify-center w-full py-1 mb-2 bg-green-100 border border-green-200 text-green-600 font-semibold">
              Rest password link sent to the associated email address
            </div>
          )} */}
          {/* {apiError && (
            <div className="flex rounded justify-center w-full py-1 mb-2 bg-red-100 border border-red-200 text-red-500 font-semibold">
              {apiError}
            </div>
          )} */}
          <h2 className="text-3xl font-normal text-center text-purple-700 mb-6">
            Welcome Back 👋
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <input
                type="text"
                value={loginData.userName}
                id="username"
                placeholder="Enter username"
                onChange={(e) => {
                  setErrors((err) => ({
                    ...err,
                    userName: e.target.value.length > 3 ? null : err.usserName,
                  }));

                  setLoginData({ ...loginData, userName: e.target.value });
                }}
                className={`w-full auth_input ${
                  errors.userName ? " border border-red-500" : ""
                }`}
              />
              {errors.userName && (
                <p className="text-red-500 text-xs ml-2 mt-1">
                  {errors.userName}
                </p>
              )}
            </div>
            <div className="mb-6">
              <input
                type="password"
                value={loginData.password}
                id="password"
                placeholder="Enter password"
                onChange={(e) => {
                  setErrors((err) => ({
                    ...err,
                    password: e.target.value.length > 3 ? null : err.password,
                  }));
                  setLoginData({ ...loginData, password: e.target.value });
                }}
                className={`w-full auth_input  ${
                  errors.password ? " border border-red-500" : ""
                }`}
              />
              {errors.password && (
                <p className="text-red-500 text-xs ml-2 mt-1">
                  {errors.password}
                </p>
              )}
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
                className={`text-sm ${
                  loading ? " text-slate-200" : " text-indigo-600"
                }  hover:underline cursor-pointer font-medium`}
                onClick={() => (loading ? null : handleForgotPassword())}
              >
                Forgot Password?
              </div>
            </div>

            <button
              type="submit"
              className="w-full mb-4 auth_button"
              disabled={
                loginData.userName === "" ||
                loginData.password === "" ||
                loading
              }
            >
              {loading ? "Logging in..." : "Login"}
            </button>
            <GoogleLogin
              shape={"circle"}
              text={"continue_with"}
              logo_alignment="center"
              onSuccess={handleGoogleSuccess}
              onError={() => toast.error("Unable to log in using google.")}
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
      </div>
    </div>
  );
};

export default Login;
