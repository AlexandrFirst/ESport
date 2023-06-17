// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

import { routes } from "@/shared/config";
import { AuthService } from "@/entities/user";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const api = await AuthService();
      await api.confirm(req.query.token as string);
      res.redirect(`${routes.Home()}?success=Account activated`);
    } catch (e: any) {
      res.redirect(
        `${routes.Home()}?error=${e.message ?? "Something went wrong"}`
      );
    }
  }
}
