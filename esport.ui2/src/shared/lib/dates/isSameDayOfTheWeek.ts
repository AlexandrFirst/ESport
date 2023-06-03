import { DayOfTheWeek } from "@/shared/constants";
import dayjs from "dayjs";

export const isSameDayOfTheWeek = (
  dayOfTheWeek: DayOfTheWeek,
  currentDay: dayjs.ConfigType
) => {
  switch (dayOfTheWeek) {
    case DayOfTheWeek.MONDAY:
      return dayjs(currentDay).day() === 1;
    case DayOfTheWeek.TUESDAY:
      return dayjs(currentDay).day() === 2;
    case DayOfTheWeek.WEDNESDAY:
      return dayjs(currentDay).day() === 3;
    case DayOfTheWeek.THURSDAY:
      return dayjs(currentDay).day() === 4;
    case DayOfTheWeek.FRIDAY:
      return dayjs(currentDay).day() === 5;
    case DayOfTheWeek.SATURDAY:
      return dayjs(currentDay).day() === 6;
    case DayOfTheWeek.SUNDAY:
      return dayjs(currentDay).day() === 0;
    case DayOfTheWeek.ALL:
      return true;
    default:
      return false;
  }
};
