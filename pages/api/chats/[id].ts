import prisma from "@libs/server/prismaClient";
import withSessionHandler from "@libs/server/withSessionHandler";
import { NextApiRequest, NextApiResponse } from "next";

const chatHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  if (!id) {
    return res.status(400).end();
  }
  const chat = await prisma.chat.findUnique({
    where: { id: +id },
    include: {
      item: true,
      messages: true,
    },
  });
  return res.status(200).json(chat);
};

export default withSessionHandler(chatHandler, { method: "GET" });
