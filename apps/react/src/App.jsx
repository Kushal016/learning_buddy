import React from "react";
import { Routes, Route, useRoutes } from "react-router-dom";
import "./App.css";
// import Home from "./components/Home";
// import Login from "./auth/login";
// import Signup from "./auth/signup";
// import Dashboard from "./components/Dashboard";
import { mergedRoutes } from "./routes";

function App() {
  return (
    // <Routes>
    //   <Route path="/" element={<Home />} />
    //   <Route path="/login" element={<Login />} />
    //   <Route path="/signup" element={<Signup />} />
    //   <Route
    //     path="/dashboard"
    //     element={
    //       <ProtectedRoute>
    //         <Dashboard />
    //       </ProtectedRoute>
    //     }
    //   />
    // </Routes>
    useRoutes(mergedRoutes)
  );
}

export default App;
