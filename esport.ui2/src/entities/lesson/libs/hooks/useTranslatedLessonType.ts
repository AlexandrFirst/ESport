import { LessonType } from "../../constants/lesson-type";

export const useTranslatedLessonType = (): Record<LessonType, string> => {
  return {
    [LessonType.Group]: "Group",
    [LessonType.Individual]: "Individual",
  };
};
