import { DayOfTheWeek } from "@/shared/constants";
import { useMemo } from "react";

interface UseMappedDaysOfTheWeekParams {
  listAllTranslations?: boolean;
}

export const useMappedDaysOfTheWeek = (
  config?: UseMappedDaysOfTheWeekParams
): Record<DayOfTheWeek, string> => {
  const { listAllTranslations } = config || {};
  return useMemo(
    () => ({
      [DayOfTheWeek.MONDAY]: "Monday",
      [DayOfTheWeek.TUESDAY]: "Tuesday",
      [DayOfTheWeek.WEDNESDAY]: "Wednesday",
      [DayOfTheWeek.THURSDAY]: "Thursday",
      [DayOfTheWeek.FRIDAY]: "Friday",
      [DayOfTheWeek.SATURDAY]: "Saturday",
      [DayOfTheWeek.SUNDAY]: "Sunday",
      [DayOfTheWeek.ALL]: listAllTranslations
        ? "Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday"
        : "All",
    }),
    [listAllTranslations]
  );
};
