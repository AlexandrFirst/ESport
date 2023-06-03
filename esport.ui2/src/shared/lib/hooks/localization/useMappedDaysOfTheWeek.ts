import { DayOfTheWeek } from "@/shared/constants";
import { useMemo } from "react";

export const useMappedDaysOfTheWeek = (): Record<DayOfTheWeek, string> => {
  return useMemo(
    () => ({
      [DayOfTheWeek.MONDAY]: "Monday",
      [DayOfTheWeek.TUESDAY]: "Tuesday",
      [DayOfTheWeek.WEDNESDAY]: "Wednesday",
      [DayOfTheWeek.THURSDAY]: "Thursday",
      [DayOfTheWeek.FRIDAY]: "Friday",
      [DayOfTheWeek.SATURDAY]: "Saturday",
      [DayOfTheWeek.SUNDAY]: "Sunday",
      [DayOfTheWeek.ALL]: "All",
    }),
    []
  );
};
