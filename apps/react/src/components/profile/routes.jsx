import React from "react";
import Profile from "./index";
import { ProtectedRoute } from "../../auth-utility/ProtectedRoute";

export const ProfileRoutes = [
  { path: "/profile", element: <ProtectedRoute><Profile /></ProtectedRoute>  },

];
