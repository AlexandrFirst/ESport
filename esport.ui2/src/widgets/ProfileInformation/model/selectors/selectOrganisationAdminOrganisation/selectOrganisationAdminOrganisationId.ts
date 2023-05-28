import { buildSelector } from "@/shared/lib";

export const [
  useSelectOrganisationAdminOrganisationId,
  selectOrganisationAdminOrganisationId,
] = buildSelector(
  (state) => state.roleProfileInformation.organisationAdminOrganisationId
);
