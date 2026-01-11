import React from "react";
import lodash from "lodash";
import {HomeRoutes} from "./components/home/routes";
import {DashboardRoutes} from "./components/dashboard/routes";
import {ProfileRoutes} from "./components/profile/routes";
import {GrammarFixRoutes} from "./components/grammerFix/routes";
import {DailyPlannerRoutes} from "./components/dailyPlanner/routes";
import {ExplainTopicRoutes} from "./components/explainTopic/routes";
import {SummarizerRoutes} from "./components/summarizer/routes";


export const mergedRoutes = lodash.concat(
  HomeRoutes,
  DashboardRoutes,
  ProfileRoutes,
  GrammarFixRoutes,
  DailyPlannerRoutes,
  ExplainTopicRoutes,
  SummarizerRoutes
);
