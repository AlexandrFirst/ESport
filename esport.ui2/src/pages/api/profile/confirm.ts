import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { routes } from "@/shared/config";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const token = req.query.token;
      if (!token) {
        throw new Error("Token is required");
      }
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/user-email-confirm}`,
        { Token: token }
      );
      res.redirect(`${routes.Home()}?success=Profile successfully activated`);
    } catch (e: any) {
      res.redirect(
        `${routes.Home()}?error=${e.message ?? "Something went wrong"}`
      );
    }
  }
}
