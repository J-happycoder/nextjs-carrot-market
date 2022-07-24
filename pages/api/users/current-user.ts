import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../libs/server/prismaClient";
import withSessionHandler from "../../../libs/server/withSessionHandler";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { userId } = req.session;
  if (userId) {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    return res.status(200).json(user);
  } else {
    return res.status(200).end();
  }
};

export default withSessionHandler(handler, { method: "GET" });
