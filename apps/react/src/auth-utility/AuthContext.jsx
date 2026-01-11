import React, { createContext, useContext, useEffect, useState } from "react";
import { clearAuth, getAuthToken, getAuthUser } from "./authStorage";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = getAuthToken();
    const user = getAuthUser();
    console.log("user from context", user);

    if (token && user) {
      setUser(user);
    }
    setLoading(false);
  }, []);

  const logOut = () => {
    clearAuth();
    setUser(null);
  };
  return (
    <AuthContext.Provider value={{ user, setUser, loading, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => useContext(AuthContext);
