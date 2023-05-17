import { ParsedUrlQuery } from "querystring";
import { ReturnUrl } from "@/shared/constants";

export const addReturnUrl = (to: string, query: ParsedUrlQuery) => {
  const returnUrl = query[ReturnUrl] as string;

  return returnUrl ? `${to}?${ReturnUrl}=${returnUrl}` : to;
};
