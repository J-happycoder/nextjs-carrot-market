import prisma from "@libs/server/prismaClient";
import withSessionHandler from "@libs/server/withSessionHandler";
import { NextApiRequest, NextApiResponse } from "next";

const itemHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  if (!id || isNaN(+id)) {
    return res.status(400).end();
  }
  const item = await prisma.item.findUnique({ where: { id: +id } });
  return res.status(200).json({ item });
};

export default withSessionHandler(itemHandler, { method: "GET" });
