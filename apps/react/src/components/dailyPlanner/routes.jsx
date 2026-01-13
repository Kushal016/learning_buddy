import React from "react";
import DailyPlanner from './index'
import { ProtectedRoute } from "../../auth-utility/ProtectedRoute";

export const DailyPlannerRoutes = [{ path: "/dailyPlanner", element:  <ProtectedRoute><DailyPlanner /></ProtectedRoute> }];
