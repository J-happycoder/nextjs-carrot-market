import prisma from "@libs/server/prismaClient";
import withSessionHandler from "@libs/server/withSessionHandler";
import { NextApiRequest, NextApiResponse } from "next";

const itemHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  if (!id) {
    return res.status(400).end();
  }
  const data = req.body;
  await prisma.item.update({ where: { id: +id }, data });
  return res.status(200).json({ ok: true });
};

export default withSessionHandler(itemHandler, { method: "PATCH", routeType: "entered" });
