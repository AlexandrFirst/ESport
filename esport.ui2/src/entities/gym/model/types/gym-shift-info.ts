import { DayOfTheWeek } from "@/shared/constants";

export interface IGymShiftInfo {
  gymShiftId: number;
  start: string;
  end: string;
  dayOfTheWeek: DayOfTheWeek;
  notifyOnUpdate: boolean;
  forceUpdateOverridenTimes: boolean;
}
