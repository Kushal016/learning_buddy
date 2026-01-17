import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

export const ProtectedRoute = ({ children }) => {
  const { user, authLoading } = useAuth();

  if (authLoading) return null;
  if (!user) return <Navigate to={"/login"} replace />;

  return children;
};
