import React from "react";
import Summarizer from "./index";
import { ProtectedRoute } from "../../auth-utility/ProtectedRoute";

export const SummarizerRoutes = [{ path: "/summarizer", element:  <ProtectedRoute><Summarizer /></ProtectedRoute> }];
