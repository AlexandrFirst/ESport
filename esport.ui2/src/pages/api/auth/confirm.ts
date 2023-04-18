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
      console.log("===req.query===", req.query);
      const { data } = await axios.get(
        `${process.env.LOGIN_API_URL}/confirm?token=${req.query.token}`
      );
      // const { data } = await axios.get(
      //   "http://localhost:3001/api/v1/competitions/all"
      // );
      console.log("===data===", data);
      res.redirect(`${routes.Main}?success=Account activated`);
    } catch (e: any) {
      res.redirect(
        `${routes.Main}?error=${e.message ?? "Something went wrong"}`
      );
    }
  }
}
