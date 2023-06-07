import { LessonType } from "@/entities/lesson";
import { DayOfTheWeek } from "@/shared/constants";
import { IExerciseInfo } from "@/entities/exercise";

export interface GetTrainerTimetableRequest {
  trainerId: number;
  gymId?: number;
  startDateTime?: string;
  dayRange?: number;
}

export interface ILessonTimeOverride {
  fromTime: string;
  toTime: string;
  dayOfTheWeek: DayOfTheWeek;
}

export interface CreateLessonRequest {
  trainerScheduleId: number;
  lessonTimeOverride: ILessonTimeOverride;
  lessonType: LessonType;
}

export interface GetExerciseTrainerListingRequest {
  name: string;
  sports: number[];
  bodyParts: number[];
  isMine: boolean;
  page: number;
  pageSize: number;
}

export interface GetExerciseTrainerListingResponse {
  exerciseInfos: IExerciseInfo[];
}
