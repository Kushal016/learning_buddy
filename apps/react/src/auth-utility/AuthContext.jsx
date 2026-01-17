import React, { createContext, useContext, useEffect, useState } from "react";
import { clearAuth, getAuthToken, getAuthUser } from "./authStorage";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = getAuthToken();
    const user = getAuthUser();
    if (token && user) {
      setUser(user);
    }
    setAuthLoading(false);
  }, []);

  const logOut = () => {
    clearAuth();
    setUser(null);
  };
  return (
    <AuthContext.Provider
      value={{ user, setUser, authLoading, loading, setLoading, logOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};

//this is the context function which can be used across all of the components.
export const useAuth = () => useContext(AuthContext);
