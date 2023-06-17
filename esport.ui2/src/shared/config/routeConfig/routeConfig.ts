import { createBuildPath } from "@/shared/lib";

import { userRoutes } from "./user-routes/userRoutes";
import { competitionRoutes } from "./competition-routes/competitionRoutes";
import { organisationRoutes } from "./organisation-routes/organisationRoutes";
import { trainerRoutes } from "./trainer-routes/trainerRoutes";
import { gymRoutes } from "./gyms-routes/gymRoutes";

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
  Me: buildPath("/me"),
  TraineeRecommendations: buildPath("/find-sport"),

  User: userRoutes,
  Competition: competitionRoutes,
  Organisation: organisationRoutes,
  Trainer: trainerRoutes,
  Gyms: gymRoutes,
};
