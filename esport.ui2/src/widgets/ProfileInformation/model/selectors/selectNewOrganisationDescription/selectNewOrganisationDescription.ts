import { buildSelector } from "@/shared/lib";

export const [
  useSelectNewOrganisationDescription,
  selectNewOrganisationDescription,
] = buildSelector(
  (state) => state.roleProfileInformation.newOrganisationDescription
);
