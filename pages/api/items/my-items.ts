import prisma from "@libs/server/prismaClient";
import withSessionHandler from "@libs/server/withSessionHandler";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { userId } = req.session;
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      items: true,
    },
  });
  if (user) {
    const { items } = user;
    return res.status(200).json({ items });
  }
  return res.status(404).json({ ok: false });
};

export default withSessionHandler(handler, { method: "GET", routeType: "entered" });
