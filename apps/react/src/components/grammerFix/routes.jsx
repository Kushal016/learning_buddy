import React from "react";
import GrammarFix from './index'
import { ProtectedRoute } from "../../auth-utility/ProtectedRoute";

export const GrammarFixRoutes = [

  { path: "/grammarFix", element: <ProtectedRoute><GrammarFix /></ProtectedRoute>  },
];
