import { LessonType } from "@/entities/lesson";

export interface ITimetableLesson {
  lessonId: number;
  trainerId: number;
  trainerName: string;
  lessonType: LessonType;
  from: Date;
  to: Date;
}
