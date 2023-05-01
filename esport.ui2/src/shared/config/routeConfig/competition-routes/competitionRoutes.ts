import { createBuildPath, Parameter } from "@/shared/lib";

import { categoryRoutes } from "./category-routes/categoryRoutes";

const buildPath = createBuildPath("/competition");

export const competitionRoutes = {
  Home: buildPath("/"),
  CompetitionById: buildPath<[Parameter]>("/:competitionId"),
  Create: buildPath("/create"),
  Category: categoryRoutes,
};
