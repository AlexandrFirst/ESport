import { createBuildPath, Parameter } from "@/shared/lib";

const buildPath = createBuildPath("/organisation");

export const organisationRoutes = {
  Home: buildPath("/"),
  Create: buildPath("/create"),
  EditOrganisation: buildPath<[Parameter]>("/:organisationId/edit"),
  Gyms: buildPath<[Parameter]>("/:organisationId/gyms"),
  PendingAdmins: buildPath<[Parameter]>("/:organisationId/pending-admins"),
  Gym: buildPath<[Parameter, Parameter]>("/:organisationId/gyms/:gymId"),
  GymTrainerRequests: buildPath<[Parameter, Parameter]>(
    "/:organisationId/gyms/:gymId/trainer-requests"
  ),
};
