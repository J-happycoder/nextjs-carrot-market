import prisma from "@libs/server/prismaClient";
import withSessionHandler from "@libs/server/withSessionHandler";
import { NextApiRequest, NextApiResponse } from "next";

const getItemsHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const items = await prisma.item.findMany({});
  return res.status(200).json({ items });
};

export default withSessionHandler(getItemsHandler, { method: "GET" });
