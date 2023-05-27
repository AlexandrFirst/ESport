import { BaseListingResult } from "@/shared/types";

import { IOrganizationInfoRead } from "../../model/types/organizationInfoRead";

export interface GetOrganisationListingRequest {
  name: string;
  organisationIds: number[];
}

export interface GetOrganisationListingResult extends BaseListingResult {
  organisationInfoListing: {
    organisatationInfoListing: IOrganizationInfoRead[];
  };
}
