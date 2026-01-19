import React, { useEffect } from "react";
import { useRoutes } from "react-router-dom";
import "./App.css";
// import Home from "./components/Home";
// import Login from "./auth/login";
// import Signup from "./auth/signup";
// import Dashboard from "./components/Dashboard";
import { mergedRoutes } from "./routes";
import { useAuth } from "./auth-utility/AuthContext";
import { bindLoading } from "./auth-utility/axiosInstance";

function App() {
  const { setLoading } = useAuth();

  useEffect(() => {
    bindLoading(setLoading);
  }, []);
  return (
    useRoutes(mergedRoutes)
  );
}

export default App;
