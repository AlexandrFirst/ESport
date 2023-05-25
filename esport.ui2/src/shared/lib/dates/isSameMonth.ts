import dayjs from "dayjs";

export const isSameMonth = (
  date1: dayjs.ConfigType,
  date2: dayjs.ConfigType
) => {
  if (!date1 || !date2) return false;

  if (typeof date2 === "number") {
    return dayjs(date1).month() === date2;
  }
  if (typeof date1 === "number") {
    return dayjs(date2).month() === date1;
  }
  return dayjs(date1).isSame(dayjs(date2), "month");
};
