import { useQuery, UseQueryOptions } from "@tanstack/react-query";

import { GymApi } from "../gymApi";
import { IGymListingRequest, IGymListingResponse } from "../types/types";
import { IGymReadInfo } from "../..";

export const gymApiKeys = {
  all: ["gyms"] as const,
  gymListing: (request: IGymListingRequest) =>
    [...gymApiKeys.all, "gymListing", request] as const,
};

export const useGetGyms = (
  request: IGymListingRequest,
  options?: UseQueryOptions<IGymListingResponse, unknown, IGymReadInfo[]>
) => {
  return useQuery({
    queryKey: gymApiKeys.gymListing(request),
    queryFn: async () => {
      try {
        const { data } = await GymApi().gymListing(request);
        return data;
      } catch (e) {
        throw e;
      }
    },
    ...options,
  });
};
