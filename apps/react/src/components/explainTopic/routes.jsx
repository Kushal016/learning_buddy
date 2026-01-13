import React from "react";
import ExplainTopic from './index'
import { ProtectedRoute } from "../../auth-utility/ProtectedRoute";

export const ExplainTopicRoutes = [

  { path: "/explainTopic", element:  <ProtectedRoute><ExplainTopic /></ProtectedRoute> },

];
