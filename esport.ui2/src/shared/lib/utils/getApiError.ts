import { Logger } from "..";

export const getApiError = (e: any) => {
  Logger.Debug("===getApiError===", e);
  return e?.[0] || e?.data?.message || e?.message || "Something went wrong";
};
