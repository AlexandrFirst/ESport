// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { authService } from "../../../../entities/user/api/auth/authService";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  authService.confirm((req.query.token as string) ?? "");
  res.status(200).json({ name: "John Doe" });
}
