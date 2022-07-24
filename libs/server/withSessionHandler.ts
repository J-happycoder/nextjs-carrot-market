import { NextApiRequest, NextApiResponse } from "next";
import withSession from "./withSession";

export default function withSessionHandler(
  handler: (req: NextApiRequest, res: NextApiResponse) => void,
  options: {
    method: "GET" | "POST" | "DELETE";
    routeType?: "public" | "entered";
  }
) {
  return async function (req: NextApiRequest, res: NextApiResponse) {
    const { userId } = req.session;
    const forbidden =
      req.method === options.method ||
      (options.routeType === "public" && userId) ||
      (options.routeType === "entered" && !userId);
    if (forbidden) {
      return res.status(403).end();
    }
    return withSession(handler)(req, res);
  };
}
