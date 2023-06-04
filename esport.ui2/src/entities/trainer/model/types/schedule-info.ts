import { DayOfTheWeek } from "@/shared/constants";

export interface IScheduleInfo {
  gymId: number;
  shiftId: number;
  from: string;
  to: string;
  dayOfTheWeek: DayOfTheWeek;
}
