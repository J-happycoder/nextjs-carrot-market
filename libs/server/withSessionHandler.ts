import { NextApiRequest, NextApiResponse } from "next";
import withSession from "@libs/server/withSession";
import prisma from "@libs/server/prismaClient";

export default function withSessionHandler(
  handler: (req: NextApiRequest, res: NextApiResponse) => void,
  options: {
    method: "GET" | "POST" | "DELETE";
    routeType?: "public" | "entered";
  }
) {
  return withSession(async function (req: NextApiRequest, res: NextApiResponse) {
    const { userId } = req.session;
    let user;
    if (userId) {
      user = await prisma.user.findUnique({ where: { id: userId } });
    }
    const forbidden =
      req.method !== options.method ||
      (options.routeType === "public" && user) ||
      (options.routeType === "entered" && !user);
    if (forbidden) {
      return res.status(403).end();
    }
    return handler(req, res);
  });
}
