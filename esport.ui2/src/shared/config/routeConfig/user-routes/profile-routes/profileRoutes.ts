import { createBuildPath, Parameter } from "@/shared/lib";

const buildPath = createBuildPath("/user/profile");

export const profileRoutes = {
  Home: buildPath("/"),
  ProfileId: buildPath<[Parameter]>("/:userId"),
  Competitions: buildPath("/competitions"),
};
