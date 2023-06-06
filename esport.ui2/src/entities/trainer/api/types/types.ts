import { LessonType } from "@/entities/lesson";
import { DayOfTheWeek } from "@/shared/constants";

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
