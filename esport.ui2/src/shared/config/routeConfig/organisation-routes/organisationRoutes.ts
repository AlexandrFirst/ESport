import { createBuildPath, Parameter } from "@/shared/lib";

const buildPath = createBuildPath("/organisation");

export const organisationRoutes = {
  Home: buildPath("/"),
  Create: buildPath("/create"),
  Gyms: buildPath<[Parameter]>("/:organisationId/gyms"),
  Trainers: buildPath<[Parameter]>("/:organisationId/trainers"),
  Gym: buildPath<[Parameter, Parameter]>("/:organisationId/gyms/:gymId"),
};
