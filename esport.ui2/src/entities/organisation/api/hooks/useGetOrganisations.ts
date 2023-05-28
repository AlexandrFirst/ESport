import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import {
  GetOrganisationListingRequest,
  GetOrganisationListingResult,
} from "../types/types";
import { OrganisationApi } from "../organisationApi";
import { organisationApiKeys } from "./organisationApiKeys";
import { IOrganizationInfoRead } from "../../model/types/organizationInfoRead";

export const useGetOrganisations = (
  request: GetOrganisationListingRequest,
  options?: UseQueryOptions<
    GetOrganisationListingResult,
    unknown,
    IOrganizationInfoRead[]
  >
) => {
  return useQuery({
    queryKey: organisationApiKeys.getOrganizations(request),
    queryFn: async () => {
      try {
        const { data } = await OrganisationApi().getOrganizationListing(
          request
        );
        return data;
      } catch (e) {
        throw e;
      }
    },
    ...options,
  });
};
