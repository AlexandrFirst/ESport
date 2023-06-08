import { DayOfTheWeek, LogicalOperation } from "@/shared/constants";

export interface ILessonTimetableFilter {
  timeTableFilterUnits: ITimeTableFilterUnit[];
  logicalOperation: LogicalOperation;
}

export interface ITimeTableFilterUnit {
  dayOfTheWeek: DayOfTheWeek;
  from: string;
  to: string;
}
