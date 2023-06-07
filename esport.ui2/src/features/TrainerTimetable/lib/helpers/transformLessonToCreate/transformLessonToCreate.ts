import { CreateLessonRequest } from "@/entities/trainer";
import { IAddLessonForm } from "../../../model/types/AddLessonForm";
import { DayOfTheWeek } from "@/shared/constants";

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
