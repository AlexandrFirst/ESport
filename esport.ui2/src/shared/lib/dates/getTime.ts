import dayjs from "dayjs";

export const getTime = (date: dayjs.ConfigType) => {
  return dayjs(date).format("h:mm A");
};
