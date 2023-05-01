import { createBuildPath } from "@/shared/lib";

const buildPath = createBuildPath("/user/profile");

export const profileRoutes = {
  Home: buildPath("/"),
  Competitions: buildPath("/competitions"),
};
