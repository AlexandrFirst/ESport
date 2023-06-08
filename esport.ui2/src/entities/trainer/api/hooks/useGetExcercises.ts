import { GetExerciseTrainerListingRequest } from "../types/types";
import { useQuery } from "@tanstack/react-query";
import { TrainerApi, trainerApiKeys } from "../..";
import { ApiContext } from "@/shared/types";

export const getTrainerExercises = async (
  request: GetExerciseTrainerListingRequest,
  ctx?: ApiContext
) => {
  try {
    const { data } = await TrainerApi(ctx).exerciseListing(request);
    return data;
  } catch (e) {
    throw e;
  }
};

export const useGetExercises = (request: GetExerciseTrainerListingRequest) => {
  return useQuery({
    queryKey: trainerApiKeys.exerciseListing(request),
    queryFn: async () => getTrainerExercises(request),
  });
};
