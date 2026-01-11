import React from "react";
import Dashboard from "./index";
import { ProtectedRoute } from "../../auth-utility/ProtectedRoute";
export const DashboardRoutes = [
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
  },
];
