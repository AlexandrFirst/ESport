import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { ApiContext } from "@/shared/types";

import {
  GetTrainerTimetableRequest,
  GetTrainerTimetableResponse,
} from "../types/types";
import { TrainerApi } from "../trainerApi";

import { trainerApiKeys } from "./trainerApiKeys";

export const getTrainerTimetable = async (
  request: GetTrainerTimetableRequest,
  ctx?: ApiContext
) => {
  try {
    const { data } = await TrainerApi(ctx).getTrainerTimetable(request);
    return data;
  } catch (e) {
    throw e;
  }
};

export const useGetTrainerTimetable = (
  request: GetTrainerTimetableRequest,
  options?: UseQueryOptions<
    GetTrainerTimetableResponse,
    unknown,
    GetTrainerTimetableResponse
  >
) => {
  return useQuery({
    queryKey: trainerApiKeys.getTimetable(request),
    queryFn: () => getTrainerTimetable(request),
    ...options,
  });
};
