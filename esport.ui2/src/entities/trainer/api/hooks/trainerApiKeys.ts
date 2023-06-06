import { GetTrainerTimetableRequest } from "../types/types";

export const trainerApiKeys = {
  all: ["trainer-api"],
  getTimetableAll: () => [...trainerApiKeys.all, "get-timetable"],
  getTimetable: (request: GetTrainerTimetableRequest) => [
    ...trainerApiKeys.getTimetableAll(),
    request,
  ],
  createLesson: () => [...trainerApiKeys.all, "create-lesson"],
};
