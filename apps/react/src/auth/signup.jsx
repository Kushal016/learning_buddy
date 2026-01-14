import React, { useCallback, useState } from "react";
import Cropper from "react-easy-crop";
import { GoogleLogin } from "@react-oauth/google";
import api from "../auth-utility/axiosInstance";
import { setAuthData } from "../auth-utility/authStorage";
import { useAuth } from "../auth-utility/AuthContext";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const { setUser } = useAuth();
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
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
      const res = await api.post("/google", {
        token: credentialResponse.credential,
      });

      if (res?.data?.token && res?.data?.user) {
        const authData = {
          token: res?.data?.token,
          user: {
            ...res?.data?.user,
          },
        };
        setAuthData(authData, signUpData?.rememberMe);
        setUser(res.data.user);
        navigate("/dashboard");
      }

      // localStorage.setItem("token", res.data.token);
      console.log("User Logged In:", res.data.user);
    } catch (err) {
      console.error("Google login failed", err);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("signUpData", signUpData);
    console.log("avatarData", avatarData);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      setShowModal(true);
    }
  };
  // Capture crop area
  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  // Convert cropped image to Base64
  const getCroppedImage = async () => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.src = image;

    await new Promise((resolve) => (img.onload = resolve));

    const { x, y, width, height } = croppedAreaPixels;
    canvas.width = width;
    canvas.height = height;
    ctx.drawImage(img, x, y, width, height, 0, 0, width, height);

    const base64Image = canvas.toDataURL("image/jpeg");
    setSignUpData({ ...signUpData, profileImage: base64Image });
    console.log("Base64:", base64Image);
    setShowModal(false);
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
                  className="w-full px-4 py-2 bg-gray-100 rounded-full focus:outline-none focus:ring-1 focus:ring-purple-700 shadow-md"
                />

                <input
                  type="text"
                  value={signUpData.lastName}
                  id="lastName"
                  placeholder="Enter lastname..."
                  onChange={(e) =>
                    setSignUpData({ ...signUpData, lastName: e.target.value })
                  }
                  className="w-full px-4 py-2 bg-gray-100 rounded-full focus:outline-none focus:ring-1 focus:ring-purple-700 shadow-md"
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
                className="w-full px-4 py-2 bg-gray-100 rounded-full focus:outline-none focus:ring-1 focus:ring-purple-700 shadow-md"
              />
              <input
                type="password"
                value={signUpData.password}
                id="password"
                placeholder="Enter password..."
                onChange={(e) =>
                  setSignUpData({ ...signUpData, password: e.target.value })
                }
                className="w-full px-4 py-2  bg-gray-100 rounded-full focus:outline-none focus:ring-1 focus:ring-purple-700 shadow-md"
              />
              <input
                type="email"
                value={signUpData.email}
                id="email"
                placeholder="Enter email address..."
                onChange={(e) =>
                  setSignUpData({ ...signUpData, email: e.target.value })
                }
                className="w-full px-4 py-2 bg-gray-100 rounded-full focus:outline-none focus:ring-1 focus:ring-purple-700 shadow-md"
              />
              <label className="flex items-center justify-center px-4 py-2 rounded-full bg-blue-100  text-blue-400 font-semibold cursor-pointer shadow-md hover:bg-blue-300 hover:text-white">
                Upload Profile Picture
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
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
                className="w-full bg-linear-to-r from-pink-600 via-purple-500 to-blue-600  text-white py-2 rounded-md font-bold shadow-lg hover:shadow-pink-500/50 hover:from-pink-600 hover:to-indigo-600 transition duration-300"
              >
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
        {showModal && (
          <div className="fixed inset-0  bg-opacity-70 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 border border-amber-400">
            <div className="bg-white p-1 w-1/3 h-2/3 rounded-lg shadow-lg">
              <div className="relative w-full h-[85%] ">
                <Cropper
                  image={image}
                  crop={crop}
                  zoom={zoom}
                  aspect={1}
                  cropShape="round"
                  showGrid={false}
                  onCropChange={setCrop}
                  onZoomChange={setZoom}
                  onCropComplete={onCropComplete}
                />
              </div>
              <div className="flex justify-end space-x-4 mt-4">
                <button
                  onClick={() => {
                    setImage(null);
                    setShowModal(false);
                  }}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 "
                >
                  Cancel
                </button>
                <button
                  onClick={getCroppedImage}
                  className="py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="w-1/2 h-full flex justify-between items-center  bg-linear-to-bl from-black via-purple-500 to-blue-600 ">
        <img src="signup.png" />
      </div>
    </div>
  );
};

export default Signup;
