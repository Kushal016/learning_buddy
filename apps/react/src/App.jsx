import React, { useEffect } from "react";
import { useRoutes } from "react-router-dom";
import "./App.css";
// import Home from "./components/Home";
// import Login from "./auth/login";
// import Signup from "./auth/signup";
// import Dashboard from "./components/Dashboard";
import { appRoutes } from "./routes";
import { useAuth } from "./auth-utility/AuthContext";
import { bindLoading } from "./auth-utility/axiosInstance";
import { ToastContainer } from "react-toastify";
import { HomeRoutes } from "./components/home/routes";

function App() {
  const { user, setLoading } = useAuth();

  useEffect(() => {
    bindLoading(setLoading);
  }, []);
  return (
    <div>
      {useRoutes(user ? appRoutes : HomeRoutes)}
      <ToastContainer theme="colored" autoClose={3000} closeOnClick={true} />
    </div>
  );
}

export default App;
