export { Trainer } from "./ui/Trainer/Trainer";
export type { TrainerSchema } from "./model/types/trainerSchema";

export { TrainerCalendars } from "./ui/TrainerCalendars/TrainerCalendars";

//api
export { TrainerApi } from "./api/trainerApi";
export { trainerApiKeys } from "./api/hooks/trainerApiKeys";
export {
  useGetTrainerTimetable,
  getTrainerTimetable,
} from "./api/hooks/useGetTrainerTimetable";

//types
export type { ITrainerSportInfo } from "./model/types/trainer-sport-info";
export type { IPendingTrainerModel } from "./model/types/pending-trainer-model";
export type { ITrainerInfo } from "./model/types/trainer-info";

//api types
export type {
  GetTrainerTimetableRequest,
  CreateLessonRequest,
} from "./api/types/types";

export { transfornGymTimetableByDateToCalendarEvent } from "./lib/helpers/transfornGymTimetableByDateToCalendarEvent/transfornGymTimetableByDateToCalendarEvent";
