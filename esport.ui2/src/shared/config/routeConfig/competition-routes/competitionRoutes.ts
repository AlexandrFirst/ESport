import { createBuildPath, Parameter } from "@/shared/lib";

import { categoryRoutes } from "./category-routes/categoryRoutes";

const buildPath = createBuildPath("/competition");

export const competitionRoutes = {
  Home: buildPath("/"),
  CompetitionById: buildPath<[Parameter]>("/:competitionId"),
  ApplyToCompetition: buildPath<[Parameter]>(
    "/:competitionId/apply-to-competition"
  ),
  Create: buildPath("/create"),
  Requests: buildPath<[Parameter]>("/requests/:competitionId"),
  Category: categoryRoutes,
};
