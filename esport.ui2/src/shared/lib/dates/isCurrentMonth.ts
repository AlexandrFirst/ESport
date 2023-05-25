import dayjs from "dayjs";

export const isCurrentMonth = (day: dayjs.ConfigType) => {
  return dayjs(day).isSame(dayjs(), "month");
};
