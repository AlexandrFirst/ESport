import { createBuildPath, Parameter } from "@/shared/lib";

const buildPath = createBuildPath("/organisation");

export const organisationRoutes = {
  Home: buildPath("/"),
  Create: buildPath("/create"),
  Gyms: buildPath<[Parameter]>("/:organisationId/gyms"),
  Gym: buildPath<[Parameter, Parameter]>("/:organisationId/gyms/:gymId"),
};
