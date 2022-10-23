import prisma from "@libs/server/prismaClient";
import withSessionHandler from "@libs/server/withSessionHandler";
import { NextApiRequest, NextApiResponse } from "next";

const addLikes = async (req: NextApiRequest, res: NextApiResponse) => {
  const { userId } = req.session;
  if (!userId) return res.status(401).end();
  const { id } = req.query;
  if (!id) return res.status(404).end();
  const { action } = req.body;
  if (action === "add") {
    await prisma.item.update({
      where: { id: +id },
      data: {
        likes: {
          connectOrCreate: {
            create: { userId },
            where: { id: { itemId: +id, userId } },
          },
        },
      },
    });
  } else if (action === "remove") {
    await prisma.favoritesOnItems.delete({
      where: {
        unique: { itemId: +id, userId },
      },
    });
  }
  return res.status(200).json({ ok: true });
};

export default withSessionHandler(addLikes, {
  method: "POST",
  routeType: "entered",
});
