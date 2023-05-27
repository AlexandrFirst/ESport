import { createBuildPath, Parameter } from "@/shared/lib";

const buildPath = createBuildPath("/organisation");

export const organisationRoutes = {
  Create: buildPath("/create"),
  Gyms: buildPath<[Parameter]>("/:organisationId/gyms"),
};
