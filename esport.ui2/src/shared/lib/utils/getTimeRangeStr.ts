import { getTimeFromTimeSpan } from "../dates/getTimeFromTimeSpan";

interface GetFromToStringParams {
  from?: string;
  to?: string;
}

export const getTimeRangeStr = (params: GetFromToStringParams) => {
  if (!params.from || !params.to) return "--";
  return `${getTimeFromTimeSpan(params.from)} - ${getTimeFromTimeSpan(
    params.to
  )}`;
};
