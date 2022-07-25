import withSessionHandler from "@libs/server/withSessionHandler";
import { NextApiRequest, NextApiResponse } from "next";

const logoutHandler = (req: NextApiRequest, res: NextApiResponse) => {
  req.session.destroy();
  return res.status(200).end();
};

export default withSessionHandler(logoutHandler, { method: "GET", routeType: "entered" });
