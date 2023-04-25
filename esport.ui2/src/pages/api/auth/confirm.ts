// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { routes } from "@/shared/config";
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      await axios.get(
        `${process.env.LOGIN_API_URL}/confirm?token=${req.query.token}`
      );
      res.redirect(`${routes.Home()}?success=Account activated`);
    } catch (e: any) {
      res.redirect(
        `${routes.Home()}?error=${e.message ?? "Something went wrong"}`
      );
    }
  }
}
