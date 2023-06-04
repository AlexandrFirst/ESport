import { useQuery, UseQueryOptions } from "@tanstack/react-query";

import { GymApi } from "../gymApi";
import {
  GetGymTimetableRequest,
  GetGymTimetableResponse,
} from "../types/types";
import { gymApiKeys } from "./gymApiKeys";
import { ApiContext } from "@/shared/types";

export const getGymTimetable = async (
  gymId: number,
  request: GetGymTimetableRequest,
  ctx?: ApiContext
) => {
  try {
    const { data } = await GymApi(ctx).getTimetable(gymId, request);
    return data;
  } catch (e) {
    throw e;
  }
};

export const useGetGymTimetable = (
  gymId: number,
  request: GetGymTimetableRequest,
  options?: UseQueryOptions<GetGymTimetableResponse>
) => {
  return useQuery({
    queryKey: gymApiKeys.gymTimetable(gymId, request),
    queryFn: () => getGymTimetable(gymId, request),
    ...options,
  });
};
