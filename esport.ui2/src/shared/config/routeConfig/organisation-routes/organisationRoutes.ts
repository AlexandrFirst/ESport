import { createBuildPath, Parameter } from "@/shared/lib";

const buildPath = createBuildPath("/organisation");

export const organisationRoutes = {
  Home: buildPath("/"),
  Create: buildPath("/create"),
  EditOrganisation: buildPath<[Parameter]>("/:organisationId/edit"),
  Gyms: buildPath<[Parameter]>("/:organisationId/gyms"),
  Trainers: buildPath<[Parameter]>("/:organisationId/trainers"),
  Gym: buildPath<[Parameter, Parameter]>("/:organisationId/gyms/:gymId"),
  EditGym: buildPath<[Parameter, Parameter]>(
    "/:organisationId/gyms/:gymId/edit"
  ),
  CreateRequest: buildPath<[Parameter, Parameter]>(
    "/:organisationId/gyms/:gymId/create-request"
  ),
};
