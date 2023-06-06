import { getTimeFromTimeSpan } from "..";

interface GetFromToStringParams {
  from?: string;
  to?: string;
}

export const getTimeRangeStr = (params: GetFromToStringParams) => {
  return `${getTimeFromTimeSpan(params.from)} - ${getTimeFromTimeSpan(
    params.to
  )}`;
};
