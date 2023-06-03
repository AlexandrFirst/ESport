import { useQuery, UseQueryOptions } from "@tanstack/react-query";

import { GymApi } from "../gymApi";
import { IGymListingRequest, IGymListingResponse } from "../types/types";
import { gymApiKeys } from "./gymApiKeys";

export const getGymListing = async (request: IGymListingRequest) => {
  try {
    const { data } = await GymApi().gymListing(request);
    return data;
  } catch (e) {
    throw e;
  }
};

export const useGetGyms = (
  request: IGymListingRequest,
  options?: UseQueryOptions<IGymListingResponse>
) => {
  return useQuery({
    queryKey: gymApiKeys.gymListing(request),
    queryFn: () => getGymListing(request),
    ...options,
  });
};
