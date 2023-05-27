import { GetOrganisationListingRequest } from "../types/types";

export const organisationApiKeys = {
  all: ["organization"],
  getOrganizations: (request: GetOrganisationListingRequest) => [
    ...organisationApiKeys.all,
    request,
  ],
  createOrganisation: () => [...organisationApiKeys.all, "create-organisation"],
};
