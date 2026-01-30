import React from "react";
import lodash from "lodash";
import { HomeRoutes } from "./components/home/routes";
import { DashboardRoutes } from "./components/dashboard/routes";
import { ProfileRoutes } from "./components/profile/routes";
import { GrammarFixRoutes } from "./components/grammerFix/routes";
import { DailyPlannerRoutes } from "./components/dailyPlanner/routes";
import { ExplainTopicRoutes } from "./components/explainTopic/routes";
import { SummarizerRoutes } from "./components/summarizer/routes";
import AppLayout from "./common/AppLayout";

export const appRoutes = [
  {
    path: "/",
    element: <AppLayout />,
    children: lodash.concat(
      DashboardRoutes,
      ProfileRoutes,
      GrammarFixRoutes,
      DailyPlannerRoutes,
      ExplainTopicRoutes,
      SummarizerRoutes,
    ),
  },
];

// export const mergedRoutes = lodash.concat(
//   // HomeRoutes,
//   DashboardRoutes,
//   ProfileRoutes,
//   GrammarFixRoutes,
//   DailyPlannerRoutes,
//   ExplainTopicRoutes,
//   SummarizerRoutes,
// );
