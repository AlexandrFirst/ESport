import { ApiContext } from "@/shared/types";
import { Api } from "@/shared/config";

import {
  GetTrainerTimetableRequest,
  GetTrainerTimetableResponse,
} from "./types/types";

export const TrainerApi = (ctx?: ApiContext) => {
  const instance = Api({ ctx });

  return {
    async getTrainerTimetable(request: GetTrainerTimetableRequest) {
      return instance.post<GetTrainerTimetableResponse>(
        "/trainer-timetable",
        request
      );
    },
  };
};
