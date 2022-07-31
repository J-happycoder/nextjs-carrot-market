import { NextApiRequest, NextApiResponse } from "next";
import prisma from "./prismaClient";
import withSession from "@libs/server/withSession";

export default function withSessionHandler(
  handler: (req: NextApiRequest, res: NextApiResponse) => void,
  options: {
    method: "GET" | "POST" | "DELETE";
    routeType?: "public" | "entered";
  }
) {
  return withSession(async function (req: NextApiRequest, res: NextApiResponse) {
    const { userId } = req.session;
    const forbidden =
      req.method !== options.method ||
      (options.routeType === "public" && userId) ||
      (options.routeType === "entered" && !userId);
    if (forbidden) {
      return res.status(403).end();
    }
    return handler(req, res);
  });
}
