import { createBuildPath } from "@/shared/lib";

import { profileRoutes } from "./profile-routes/profileRoutes";

const buildPath = createBuildPath("/user");

export const userRoutes = {
  Profile: profileRoutes,
};
