import prisma from "@libs/server/prismaClient";
import withSessionHandler from "@libs/server/withSessionHandler";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { itemId, customerId } = req.body;
  const existingChat = await prisma.chat.findFirst({
    where: {
      itemId: +itemId,
      customerId: +customerId,
    },
  });
  if (existingChat) {
    return res.status(200).json({ ok: true, id: existingChat.id });
  }
  const customer = await prisma.user.findUnique({ where: { id: customerId } });
  if (!customer) {
    return res.status(404).end();
  }
  const { id } = await prisma.chat.create({
    data: {
      customer: {
        connect: { id: +customerId },
      },
      item: {
        connect: { id: +itemId },
      },
    },
  });
  return res.status(200).json({ ok: true, id });
};

export default withSessionHandler(handler, { method: "POST", routeType: "entered" });
