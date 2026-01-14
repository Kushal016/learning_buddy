import React, { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { handleGoogleCallBack, setAuthData } from "../auth-utility/authStorage";
import { useAuth } from "../auth-utility/AuthContext";
import { useNavigate } from "react-router-dom";
import UploadAvatar from "./uploadAvatar";
import api from "../auth-utility/axiosInstance";

const Signup = () => {
  const { setUser } = useAuth();
  const navigate = useNavigate();

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

  const handleSubmit = (e) => {
    e.preventDefault();
    apiCall(signUpData);
  };
  const apiCall = async (data) => {
    console.log("before api", data);
    try {
      const res = await api.post("/signup", {
        ...data,
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
      <div className="w-1/2 flex items-center justify-center min-h-screen bg-white">
        <div className="flex flex-col justify-center items-center w-2/3">
          <div className="font-semibold text-2xl">WELCOME...</div>
          <div className="font-semibold text-xl pt-2">Create your profile</div>
          <div className="text-sm text-slate-500 pt-1">
            Already have an account?{" "}
            <span
              className="text-purple-500 font-bold cursor-pointer"
              onClick={() => navigate("/login")}
            >
              Login
            </span>
          </div>
          <section className="mt-10 w-full">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={signUpData.firstName}
                  id="firstName"
                  placeholder="Enter firstname..."
                  onChange={(e) =>
                    setSignUpData({ ...signUpData, firstName: e.target.value })
                  }
                  className="w-full auth_input"
                />

                <input
                  type="text"
                  value={signUpData.lastName}
                  id="lastName"
                  placeholder="Enter lastname..."
                  onChange={(e) =>
                    setSignUpData({ ...signUpData, lastName: e.target.value })
                  }
                  className="w-full auth_input"
                />
              </div>
              <input
                type="text"
                value={signUpData.userName}
                id="userName"
                placeholder="Enter username..."
                onChange={(e) =>
                  setSignUpData({ ...signUpData, userName: e.target.value })
                }
                className="w-full auth_input"
              />
              <input
                type="password"
                value={signUpData.password}
                id="password"
                placeholder="Enter password..."
                onChange={(e) =>
                  setSignUpData({ ...signUpData, password: e.target.value })
                }
                className="w-full auth_input"
              />
              <input
                type="email"
                value={signUpData.email}
                id="email"
                placeholder="Enter email address..."
                onChange={(e) =>
                  setSignUpData({ ...signUpData, email: e.target.value })
                }
                className="w-full auth_input"
              />
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
              <button type="submit" className="w-full auth_button">
                Sign up
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
