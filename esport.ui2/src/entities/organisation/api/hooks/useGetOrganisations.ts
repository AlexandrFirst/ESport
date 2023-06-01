import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import {
  GetOrganisationListingRequest,
  GetOrganisationListingResult,
} from "../types/types";
import { OrganisationApi } from "../organisationApi";
import { organisationApiKeys } from "./organisationApiKeys";

export const useGetOrganisations = (
  request: GetOrganisationListingRequest,
  options?: UseQueryOptions<GetOrganisationListingResult>
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
