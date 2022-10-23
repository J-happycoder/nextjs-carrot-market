import prisma from "@libs/server/prismaClient";
import withSessionHandler from "@libs/server/withSessionHandler";
import { NextApiRequest, NextApiResponse } from "next";

const uploadHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { name, price, description, id } = req.body;
  const { userId } = req.session;
  const item = await prisma.item.create({
    data: {
      name,
      price,
      description,
      owner: {
        connect: { id: userId },
      },
      photoId: id,
    },
  });
  return res.status(200).json({ itemId: item.id });
};

export default withSessionHandler(uploadHandler, {
  method: "POST",
  routeType: "entered",
});
