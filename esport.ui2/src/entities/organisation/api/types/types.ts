import { BaseListingResult } from "@/shared/types";

import { IOrganizationInfoRead } from "../../model/types/organizationInfoRead";

export interface GetOrganisationListingRequest {
  name: string;
  organisationIds: number[];
}

export interface GetOrganisationListingResult extends BaseListingResult {
  organisatationInfoListing: IOrganizationInfoRead[];
}

export interface UpdateGymInfo {
  id: number;
  name: string;
  address: string;
  openTime: string;
  closeTime: string;
}

export interface UpdateOrganisationRequest {
  organisationId: number;
  organisationInfo: {
    name: string;
    description: string;
  };
  organisationGyms: UpdateGymInfo[];
}
