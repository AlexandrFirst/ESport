import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { ApiContext } from "@/shared/types";

import { GetTrainerTimetableRequest } from "../types/types";
import { TrainerApi } from "../trainerApi";

import { trainerApiKeys } from "./trainerApiKeys";
import { IGymTimetableByDate } from "@/entities/gym";

export const getTrainerTimetable = async (
  request: GetTrainerTimetableRequest,
  ctx?: ApiContext
) => {
  try {
    const api = await TrainerApi(ctx);
    const { data } = await api.getTrainerTimetable(request);
    return data;
  } catch (e) {
    throw e;
  }
};

export const useGetTrainerTimetable = (
  request: GetTrainerTimetableRequest,
  options?: UseQueryOptions<
    IGymTimetableByDate[],
    unknown,
    IGymTimetableByDate[]
  >
) => {
  return useQuery({
    queryKey: trainerApiKeys.getTimetable(request),
    queryFn: () => getTrainerTimetable(request),
    ...options,
  });
};
