import { LessonType } from "../../constants/lesson-type";

export interface ITimetableLesson {
  trainerSheduleId: number;
  lessonId: number;
  trainerId: number;
  trainerName: string;
  lessonType: LessonType;
  from: string;
  to: string;
}
