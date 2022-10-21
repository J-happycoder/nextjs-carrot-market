import prisma from "@libs/server/prismaClient";
import withSessionHandler from "@libs/server/withSessionHandler";
import { NextApiRequest, NextApiResponse } from "next";

const addLikes = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  if (!id) return res.status(400).end();
  await prisma.item.update({
    where: { id: +id },
    data: {
      likes: {
        increment: 1,
      },
    },
  });
  return res.status(200).json({ ok: true });
};

export default withSessionHandler(addLikes, { method: "PATCH", routeType: "entered" });
