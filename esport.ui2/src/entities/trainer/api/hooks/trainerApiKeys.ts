import {
  GetExerciseTrainerListingRequest,
  GetTrainerTimetableRequest,
} from "../types/types";

export const trainerApiKeys = {
  all: ["trainer-api"],
  getTimetableAll: () => [...trainerApiKeys.all, "get-timetable"],
  getTimetable: (request: GetTrainerTimetableRequest) => [
    ...trainerApiKeys.getTimetableAll(),
    request,
  ],
  createLesson: () => [...trainerApiKeys.all, "create-lesson"],
  exerciseListingAll: () => [...trainerApiKeys.all, "excercise-listing"],
  exerciseListing: (request: GetExerciseTrainerListingRequest) => [
    ...trainerApiKeys.all,
    "excercise-listing",
    request,
  ],
};
