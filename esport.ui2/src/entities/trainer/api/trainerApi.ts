import { ApiContext } from "@/shared/types";
import { Api } from "@/shared/config";

import { IGymTimetableByDate } from "@/entities/gym";

import {
  CreateLessonRequest,
  GetExerciseTrainerListingRequest,
  GetExerciseTrainerListingResponse,
  GetTrainerTimetableRequest,
} from "./types/types";

export const TrainerApi = (ctx?: ApiContext) => {
  const instance = Api({ ctx });

  return {
    async getTrainerTimetable(request: GetTrainerTimetableRequest) {
      return instance.post<IGymTimetableByDate[]>(
        "/trainer-timetable",
        request
      );
    },
    async createLesson(request: CreateLessonRequest) {
      return instance.post("/trainer-create-lesson", request);
    },
    async exerciseListing(request: GetExerciseTrainerListingRequest) {
      return instance.post<GetExerciseTrainerListingResponse>(
        "/trainer-create-lesson",
        request
      );
    },
  };
};
