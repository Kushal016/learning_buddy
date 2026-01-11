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
