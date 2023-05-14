import { createBuildPath } from "@/shared/lib";

import { userRoutes } from "./user-routes/userRoutes";
import { competitionRoutes } from "./competition-routes/competitionRoutes";

const buildPath = createBuildPath("/");

export const routes = {
  Home: buildPath("/"),
  Register: buildPath("/register"),
  Login: buildPath("/login"),
  ForgotPassword: buildPath("/forgot-password"),
  Test: buildPath("/nigga"),
  Forbidden: buildPath("/forbidden"),
  Streams: buildPath("/streams"),
  Settings: buildPath("/settings"),

  User: userRoutes,
  Competition: competitionRoutes,
};
