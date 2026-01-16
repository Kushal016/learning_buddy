import React from "react";
import Home from "./index";
import Login from "../../auth/login";
import Signup from "../../auth/signup";
import ResetPassword from "../../auth/ResetPassword";

export const HomeRoutes = [
  { path: "/", element: <Home /> },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <Signup /> },
  { path: "/reset-password/:token", element: <ResetPassword /> },
];
