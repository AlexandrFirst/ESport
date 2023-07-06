import { LessonType } from "@/entities/lesson";

export interface IAddLessonForm {
  from: string;
  to: string;
  lessonType: { title: string; value: LessonType };
}
