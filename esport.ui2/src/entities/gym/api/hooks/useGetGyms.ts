import { useQuery, UseQueryOptions } from "@tanstack/react-query";

import { GymApi } from "../gymApi";
import { IGymListingRequest, IGymListingResponse } from "../types/types";

export const gymApiKeys = {
  all: ["gyms"] as const,
  gymListing: () => [...gymApiKeys.all, "gymListing"] as const,
};

export const useGetGyms = (
  request: IGymListingRequest,
  options?: UseQueryOptions<IGymListingResponse>
) => {
  return useQuery({
    queryKey: gymApiKeys.gymListing(),
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
