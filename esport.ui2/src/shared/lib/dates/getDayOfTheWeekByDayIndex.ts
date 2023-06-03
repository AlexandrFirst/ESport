import dayjs from "dayjs";
import { DayOfTheWeek } from "@/shared/constants";

export const getDayOfTheWeekByDayIndex = (currentDay: dayjs.ConfigType) => {
  switch (dayjs(currentDay).day()) {
    case 0:
      return DayOfTheWeek.SUNDAY;
    case 1:
      return DayOfTheWeek.MONDAY;
    case 2:
      return DayOfTheWeek.TUESDAY;
    case 3:
      return DayOfTheWeek.WEDNESDAY;
    case 4:
      return DayOfTheWeek.THURSDAY;
    case 5:
      return DayOfTheWeek.FRIDAY;
    case 6:
      return DayOfTheWeek.SATURDAY;
    default:
      return DayOfTheWeek.ALL;
  }
};
