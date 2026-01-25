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
import { ToastContainer } from "react-toastify";

function App() {
  const { setLoading } = useAuth();

  useEffect(() => {
    bindLoading(setLoading);
  }, []);
  return (
    <div>
      {useRoutes(mergedRoutes)}
      <ToastContainer theme="colored" autoClose={3000} closeOnClick={true} />
    </div>
  );
}

export default App;
