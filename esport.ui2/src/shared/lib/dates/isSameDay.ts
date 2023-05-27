import dayjs from "dayjs";

export const isSameDay = (day1: dayjs.ConfigType, day2: dayjs.ConfigType) => {
  const day = dayjs(day1);
  return day.isSame(day2, "day");
};
