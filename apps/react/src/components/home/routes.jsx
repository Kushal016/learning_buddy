import React from "react";
import Home from "./index";
import Login from "../../auth/login";
import Signup from "../../auth/signup";

export const HomeRoutes = [
  { path: "/", element: <Home /> },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <Signup /> },
 
];
