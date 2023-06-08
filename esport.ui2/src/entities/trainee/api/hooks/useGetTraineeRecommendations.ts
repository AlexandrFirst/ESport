import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { traineeApiKeys } from "./traineeApiKeys";
import {
  GetTraineeRecommendationsRequest,
  GetTraineeRecommendationsResponse,
} from "../types/types";
import { TraineeApi } from "../TraineeApi";
import { ApiContext } from "@/shared/types";

export const getTraineeRecommendations = async (
  request: GetTraineeRecommendationsRequest,
  ctx?: ApiContext
) => {
  try {
    const { data } = await TraineeApi(ctx).getTraineeRecommendations(request);
    return data;
  } catch (e) {
    throw e;
  }
};

export const useGetTraineeRecommendations = (
  request: GetTraineeRecommendationsRequest,
  options?: UseQueryOptions<GetTraineeRecommendationsResponse>
) => {
  return useQuery({
    queryKey: traineeApiKeys.getTraineeRecommendations(request),
    queryFn: () => getTraineeRecommendations(request),
    ...options,
  });
};
