import { DayOfTheWeek } from "@/shared/constants";
import { ITimeOverride } from "@/shared/types";

export interface IGymRequestItem {
  requestId: number;
  gymId: number;
  shiftId: number;
  gymName: string;
  requestDescription: string;
  from: string;
  to: string;
  dayOfTheWeeks: DayOfTheWeek[];
  timeOverrides: ITimeOverride[];
  isApplied: boolean;
}
