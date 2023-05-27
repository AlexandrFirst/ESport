import { ApiContext } from "@/shared/types";
import { Api } from "@/shared/config";

import {
  GetOrganisationListingRequest,
  GetOrganisationListingResult,
} from "./types/types";
import { ICreateOrganisation } from "../model/types/create-organisation";

export const OrganisationApi = (ctx?: ApiContext) => {
  const instance = Api({ ctx });

  return {
    getOrganizationListing(request: GetOrganisationListingRequest) {
      return instance.post<GetOrganisationListingResult>(
        "/organisation-listing",
        request
      );
    },
    create(request: ICreateOrganisation) {
      return instance.post("/create-organisation", request);
    },
  };
};
