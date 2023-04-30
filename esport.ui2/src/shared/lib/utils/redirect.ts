import { ServerResponse } from "http";

/*
 * should be used on server side only
 * */
export const redirect = (to: string, res?: ServerResponse) => {
  res?.writeHead(301, { Location: to });
  res?.end();
}