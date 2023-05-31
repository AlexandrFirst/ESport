import { DayOfTheWeek } from "@/shared/constants";
import { ITimetableLesson } from "./timetable-lesson";

export interface IDayTimetable {
  from: Date;
  to: Date;
  shiftId: number;
  timeTableLessons: ITimetableLesson[];
}

export interface IGymTimetable {
  gymId: number;
  dayOfTheWeek: DayOfTheWeek;
  dayTimeTable: IDayTimetable[];
}
