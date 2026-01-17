import React, { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { handleGoogleCallBack, setAuthData } from "../auth-utility/authStorage";
import { useAuth } from "../auth-utility/AuthContext";
import { useNavigate } from "react-router-dom";
import UploadAvatar from "./uploadAvatar";
import api from "../auth-utility/axiosInstance";

const Signup = () => {
  const { setUser, loading } = useAuth();
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [apiError, setapiError] = useState("");

  const [signUpData, setSignUpData] = useState({
    userName: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
    rememberMe: true,
    profileImage: null,
  });

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      handleGoogleCallBack({
        credentialResponse,
        rememberMe: signUpData.rememberMe,
        setUser,
        navigate,
      });
    } catch (err) {
      console.error("Google login failed", err);
    }
  };
  const validate = () => {
    const newErrors = {};
    if (signUpData.userName === "") {
      newErrors.userName = "Username is required";
    } else if (signUpData.userName.length < 3) {
      newErrors.userName = "Invalid Username, must be at least 3 characters.";
    }

    if (signUpData.firstName === "") {
      newErrors.firstName = "Firstname is required";
    }
    if (signUpData.lastName === "") {
      newErrors.lastName = "Lastname is required";
    }

    if (signUpData.email === "") {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(signUpData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (signUpData.password === "") {
      newErrors.password = "Password is required";
    } else if (signUpData.password.length < 3) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) apiCall(signUpData);
  };
  const apiCall = async (data) => {
    try {
      const res = await api.post("/signup", {
        ...data,
      });
      setAuthData(res.data, data?.rememberMe);
      setUser(res.data.user);
      navigate("/dashboard");
      setapiError(null);
    } catch (error) {
      setapiError(
        error?.response?.data?.message
          ? error?.response?.data?.message
          : error.message,
      );
      console.log(error.message);
    }
  };

  return (
    <div className="w-full h-screen flex items-center">
      <div className="w-1/2 flex items-center justify-center min-h-screen bg-white">
        <div className="flex flex-col justify-center items-center w-2/3">
          {apiError && (
            <div className="flex rounded justify-center w-full py-1 mb-2 bg-red-100 border border-red-200 text-red-500 font-semibold">
              {apiError}
            </div>
          )}
          <div className="w-full flex  space-x-30">
            <div className="w-28 h-28 ml-14">
              {signUpData.profileImage ? (
                <img
                  src={`${signUpData.profileImage}`}
                  alt="User Avatar"
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <img src="./default-user.png" />
              )}
            </div>

            <div className="text-center">
              <div className="font-semibold text-2xl">WELCOME...</div>
              <div className="font-semibold text-xl pt-2">
                Create your profile
              </div>
              <div className="text-sm text-slate-500 pt-1">
                Already have an account?{" "}
                <span
                  className="text-purple-500 font-bold cursor-pointer"
                  onClick={() => navigate("/login")}
                >
                  Login
                </span>
              </div>
            </div>
          </div>

          <section className="mt-10 w-full">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="flex justify-between space-x-2">
                <input
                  type="text"
                  value={signUpData.firstName}
                  id="firstName"
                  placeholder=" firstname..."
                  onChange={(e) => {
                    setSignUpData({
                      ...signUpData,
                      firstName: e.target.value,
                    });
                    setErrors((err) => ({
                      ...err,
                      firstName: null,
                    }));
                  }}
                  className="w-full auth_input"
                />

                <input
                  type="text"
                  value={signUpData.lastName}
                  id="lastName"
                  placeholder=" lastname..."
                  onChange={(e) => {
                    setSignUpData({
                      ...signUpData,
                      lastName: e.target.value,
                    });
                    setErrors((err) => ({
                      ...err,
                      lastName: null,
                    }));
                  }}
                  className="w-full auth_input"
                />
              </div>

              <input
                type="text"
                value={signUpData.userName}
                id="userName"
                placeholder=" username..."
                onChange={(e) => {
                  setSignUpData({ ...signUpData, userName: e.target.value });

                  setErrors((err) => ({
                    ...err,
                    userName: e.target.value.length > 3 ? null : err.usserName,
                  }));
                }}
                className="w-full auth_input"
              />
              {errors.userName && (
                <p className="text-red-500 text-sm -mt-3">{errors.userName}</p>
              )}
              <input
                type="password"
                value={signUpData.password}
                id="password"
                placeholder=" password..."
                onChange={(e) => {
                  setSignUpData({ ...signUpData, password: e.target.value });
                  setErrors((err) => ({
                    ...err,
                    password: e.target.value.length > 3 ? null : err.password,
                  }));
                }}
                className="w-full auth_input"
              />
              {errors.password && (
                <p className="text-red-500 text-sm -mt-3">{errors.password}</p>
              )}
              <input
                type="email"
                value={signUpData.email}
                id="email"
                placeholder=" email address..."
                onChange={(e) => {
                  setErrors((err) => ({
                    ...err,
                    email: null,
                  }));
                  setSignUpData({ ...signUpData, email: e.target.value });
                }}
                className="w-full auth_input"
              />
              {errors.email && (
                <p className="text-red-500 text-sm -mt-3">{errors.email}</p>
              )}
              <UploadAvatar {...{ signUpData, setSignUpData }} />

              <div className="flex items-center justify-between mb-6">
                <label className="flex items-center text-gray-600">
                  <input
                    type="checkbox"
                    checked={signUpData.rememberMe}
                    onChange={(e) => {
                      setSignUpData({
                        ...signUpData,
                        rememberMe: e.target.checked,
                      });
                    }}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm">Remember Me</span>
                </label>
              </div>

              <button
                type="submit"
                className="w-full mb-4 auth_button"
                disabled={
                  signUpData.userName === "" ||
                  signUpData.password === "" ||
                  signUpData.firstName === "" ||
                  signUpData.lastName === "" ||
                  signUpData.email === ""
                }
              >
                {loading ? "Signing up..." : "Sign up"}
              </button>
              <GoogleLogin
                shape={"pill"}
                text={"signup_with"}
                logo_alignment="center"
                onSuccess={handleGoogleSuccess}
                onError={() => console.log("Google Login Failed")}
              />
            </form>
          </section>
        </div>
      </div>

      <div className="w-1/2 h-full flex justify-between items-center  bg-linear-to-bl from-black via-purple-500 to-blue-600 ">
        <img src="signup.png" />
      </div>
    </div>
  );
};

export default Signup;
