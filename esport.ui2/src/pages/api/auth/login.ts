// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import https from "https";
import fs from "fs";
import path from "path";
import { setCookie } from "cookies-next";
import { addMonths } from "@/shared/lib/utils/add-months";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const httpsAgent = new https.Agent({
      rejectUnauthorized: true,
      cert: fs.readFileSync(path.resolve(".cerfs", "fullchain.pem")),
      key: fs.readFileSync(path.resolve(".cerfs", "privkey.pem")),
      passphrase: process.env.LOGIN_API_PASSPHRASE ?? "",
    });

    const { data } = await axios.post<{ token: string }>(
      `${process.env.LOGIN_API_URL}/apiLogin`,
      req.body,
      {
        httpsAgent,
        withCredentials: true,
      }
    );
    setCookie("ESportCookie", data.token, {
      httpOnly: true,
      expires: addMonths(new Date(), 1),
      secure: true,
      sameSite: "none",
      path: "/",
      req,
      res,
    });
    return res.status(200).json(data);
  }
  return res.status(200).json({ message: "Hello World" });
}
