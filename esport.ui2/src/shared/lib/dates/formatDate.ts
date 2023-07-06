import dayjs, { ConfigType } from "dayjs";

export const formatDate = (date?: ConfigType, plug = "") => {
  if (!date) return plug;
  return dayjs(date).format("MMMM D, YYYY");
};
