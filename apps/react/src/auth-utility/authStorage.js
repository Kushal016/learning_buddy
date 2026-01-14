import api from "./axiosInstance";

export const setAuthData = ({ token, user }, rememberMe) => {
  console.log("from authData,", token, user);

  const storage = rememberMe ? localStorage : sessionStorage;
  storage.setItem("auth-token", token);
  storage.setItem("user", JSON.stringify(user));
};

export const getAuthToken = () =>
  localStorage.getItem("auth-token") || sessionStorage.getItem("auth-token");

export const getAuthUser = () => {
  const user = localStorage.getItem("user") || sessionStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

export const clearAuth = () => localStorage.clear() || sessionStorage.clear();

export const handleGoogleCallBack = async ({
  credentialResponse,
  rememberMe,
  setUser,
  navigate,
}) => {
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
      setAuthData(authData, rememberMe);
      setUser(res.data.user);
      navigate("/dashboard");
    }

    // localStorage.setItem("token", res.data.token);
    console.log("User Logged In:", res.data.user);
  } catch (err) {
    console.error("Google login failed", err);
  }
};
