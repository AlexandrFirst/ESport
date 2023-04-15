// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { routes } from "@/shared/config";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      await axios.get(
        `${process.env.LOGIN_API_URL}/confirm?token=${req.query.token}`
      );
      res.redirect(`${routes.Main}?success=Account activated`);
    } catch (e: any) {
      res.redirect(
        `${routes.Main}?error=${e.message ?? "Something went wrong"}`
      );
    }
  }
}
