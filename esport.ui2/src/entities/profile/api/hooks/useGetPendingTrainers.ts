import { ProfileApi, profileApiKeys } from "../..";
import {
  GetPendingTrainersRequest,
  GetPendingTrainersResponse,
} from "../types/types";
import { ApiContext } from "@/shared/types";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

export const getPendingTrainers = async (
  gymId: number,
  request: GetPendingTrainersRequest,
  ctx?: ApiContext
) => {
  try {
    const api = await ProfileApi(ctx);
    const { data } = await api.getPendingTrainers(gymId, request);
    return data;
  } catch (e) {
    throw e;
  }
};

export const useGetPendingTrainers = (
  gymId: number,
  request: GetPendingTrainersRequest,
  options?: UseQueryOptions<GetPendingTrainersResponse>
) => {
  return useQuery({
    queryKey: profileApiKeys.getPendingTrainers(gymId, request),
    queryFn: () => getPendingTrainers(gymId, request),
    ...options,
  });
};
