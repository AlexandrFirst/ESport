import {
  ILessonSportFilter,
  ILessonTimetableFilter,
  LessonType,
} from "@/entities/lesson";
import { ITraumaHistoryRecord } from "@/entities/trauma";

export interface TraineeRecommendationFiltersSchema {
  lessonType: LessonType;
  traumaHistoryRecords: ITraumaHistoryRecord[];
  lessonSportFilter: ILessonSportFilter;
  lessonTimeTableFilter: ILessonTimetableFilter;
}
