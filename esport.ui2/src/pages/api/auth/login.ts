// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import https from "https";
import fs from "fs";
import path from "path";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = "0";

    const httpsAgent = new https.Agent({
      rejectUnauthorized: false,
      cert: fs.readFileSync(path.resolve(".cerfs", "localhost.pem")),
      key: fs.readFileSync(path.resolve(".cerfs", "localhost-key.pem")),
      passphrase: process.env.LOGIN_API_PASSPHRASE ?? "",
      family: 4,
    });

    const api = axios.create({
      httpsAgent,
      withCredentials: true,
    });

    const { data } = await api.post<{ token: string }>(
      `${process.env.LOGIN_API_URL}/apiLogin`,
      req.body,
      {}
    );
    // setCookie({req}, "ESportCookie", data.token, {
    //   httpOnly: true,
    //   expires: addMonths(new Date(), 1),
    //   secure: true,
    //   sameSite: "none",
    //   path: "/",
    //   req,
    //   res,
    // });
    return res.status(200).json(data);
  }
  return res.status(200).json({ message: "Hello World" });
}
