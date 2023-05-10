// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import https from "https";
import fs from "fs";
import path from "path";

import { IAccount } from "@/entities/user";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const httpsAgent = new https.Agent({
      rejectUnauthorized: false,
      cert: fs.readFileSync(path.resolve(".cerfs", "localhost.pem")),
      key: fs.readFileSync(path.resolve(".cerfs", "localhost-key.pem")),
      passphrase: process.env.LOGIN_API_PASSPHRASE ?? "",
      family: 4,
    });

    try {
      const { data } = await axios.get<IAccount>(
        `${process.env.LOGIN_API_URL}/info`,
        {
          httpsAgent,
          withCredentials: true,
          headers: {
            // @ts-ignore
            Cookie: `ESport ${req.cookies["ESportCookie"]}`,
          },
        }
      );
      return res.status(200).json(data);
      // res.redirect(`${routes.Home()}?success=Account activated`);
    } catch (e: any) {
      console.log("===e===", e);
      throw e;
    }
  }
}
