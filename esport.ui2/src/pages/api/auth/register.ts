// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    // const httpsAgent = new https.Agent({
    //   rejectUnauthorized: true,
    //   cert: fs.readFileSync(path.resolve(".cerfs", "fullchain.pem")),
    //   key: fs.readFileSync(path.resolve(".cerfs", "privkey.pem")),
    //   passphrase: process.env.LOGIN_API_PASSPHRASE ?? "",
    // });

    const { data } = await axios.post(
      `${process.env.LOGIN_API_URL}/register`,
      req.body
      // {
      //   httpsAgent,
      //   withCredentials: true,
      // }
    );
    res.status(200).json(data);
  }
  res.status(200).json({ message: "Hello World" });
}
