import { DayOfTheWeek } from "@/shared/constants";

import { ITimetableLesson } from "@/entities/lesson";

export interface IDayTimetable {
  from: string;
  to: string;
  shiftId: number;
  timeTableLessons: ITimetableLesson[];
  trainerScheduleIds: number[];
}

export interface IGymTimetable {
  gymId: number;
  dayOfTheWeek: DayOfTheWeek;
  dayTimeTable: IDayTimetable[];
}

export interface IGymTimetableByDate {
  gymId: number;
  dateTime: Date;
  dayTimeTable: IDayTimetable[];
}
