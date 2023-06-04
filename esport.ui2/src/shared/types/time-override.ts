import { DayOfTheWeek } from "@/shared/constants";

export interface ITimeOverride {
  from: string;
  to: string;
  dayOfTheWeeks: DayOfTheWeek;
}
