import dayjs from "dayjs";

export const isToday = (day: dayjs.ConfigType) => {
  return dayjs().isSame(day, "day");
};
