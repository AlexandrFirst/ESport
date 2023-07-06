import { CreateLessonRequest } from "@/entities/trainer";
import { DayOfTheWeek } from "@/shared/constants";

import { IAddLessonForm } from "../../../model/types/AddLessonForm";

export const transformLessonToCreate = (
  data: IAddLessonForm,
  dayOfTheWeek: DayOfTheWeek,
  trainerScheduleId?: number
): CreateLessonRequest => {
  return {
    lessonType: data.lessonType.value,
    lessonTimeOverride: {
      toTime: data.to,
      fromTime: data.from,
      dayOfTheWeek: dayOfTheWeek,
    },
    trainerScheduleId: trainerScheduleId ?? 0,
  };
};
