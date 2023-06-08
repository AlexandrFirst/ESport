import { BasePagintaionRequest } from "@/shared/types";

import {
  ILessonRecommendation,
  ILessonSportFilter,
  ILessonTimetableFilter,
  LessonType,
} from "@/entities/lesson";
import { ITraumaHistoryRecord } from "@/entities/trauma";

export interface GetTraineeRecommendationsRequest
  extends BasePagintaionRequest {
  trainerIds: number[];
  lessonType: LessonType;
  lessonSportFilter: ILessonSportFilter;
  lessonTimeTableFilter: ILessonTimetableFilter;
  traumaHistoryRecords: ITraumaHistoryRecord[];
}

export interface GetTraineeRecommendationsResponse {
  lessonRecomendations: ILessonRecommendation[];
}
