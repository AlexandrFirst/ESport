import { IReadSportInfo } from "@/entities/sport";
import { ITimeTableFilterUnit } from "./lesson-timetable-filter";

export interface ILessonRecommendation {
  lessonId: number;
  sportInfo: IReadSportInfo[];
  trainerId: number;
  trainerName: string;
  lessonTimeTable: ITimeTableFilterUnit[];
}
