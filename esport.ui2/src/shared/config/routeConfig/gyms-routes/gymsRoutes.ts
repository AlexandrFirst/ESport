import { createBuildPath, Query } from "@/shared/lib";

const buildPath = createBuildPath("/gyms");

export const gymRoutes = {
  GymsByIds: buildPath<[Query]>("/?:gyms"),
};
