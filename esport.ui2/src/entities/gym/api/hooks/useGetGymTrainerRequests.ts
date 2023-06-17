import { useQuery, UseQueryOptions } from "@tanstack/react-query";

import { GymApi } from "../gymApi";
import {
  GetTrainerRequestsRequest,
  GetTrainerRequestsResponse,
} from "../types/types";
import { gymApiKeys } from "./gymApiKeys";
import { ApiContext } from "@/shared/types";

export const getGymTrainerRequests = async (
  request: GetTrainerRequestsRequest,
  ctx?: ApiContext
) => {
  try {
    const api = await GymApi(ctx);
    const { data } = await api.getTrainerRequests(request);
    return data;
  } catch (e) {
    throw e;
  }
};

export const useGetGymTrainerRequests = (
  request: GetTrainerRequestsRequest,
  options?: UseQueryOptions<GetTrainerRequestsResponse>
) => {
  return useQuery({
    queryKey: gymApiKeys.getTrainerRequestsRequest(request),
    queryFn: () => getGymTrainerRequests(request),
    ...options,
  });
};
