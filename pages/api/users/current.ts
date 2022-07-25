import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../libs/server/prismaClient";
import withSessionHandler from "../../../libs/server/withSessionHandler";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { userId } = req.session;
  let user;
  if (userId) {
    user = await prisma.user.findUnique({ where: { id: userId } });
  }
  return res.status(200).json({ user });
};

export default withSessionHandler(handler, { method: "GET" });
