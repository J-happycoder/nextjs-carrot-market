import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next";

declare module "iron-session" {
  interface IronSessionData {
    userId?: number;
  }
}

const sessionOptions = {
  cookieName: process.env.COOKIE_NAME + "",
  password: process.env.COOKIE_PASSWORD + "",
};

export default function withSession(handler: (req: NextApiRequest, res: NextApiResponse) => void) {
  return withIronSessionApiRoute(handler, sessionOptions);
}
