import { buildSelector } from "@/shared/lib";

export const [useSelectNewOrganisationName, selectNewOrganisationName] =
  buildSelector((state) => state.roleProfileInformation.newOrganisationName);
