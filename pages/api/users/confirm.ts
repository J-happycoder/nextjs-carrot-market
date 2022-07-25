import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@libs/server/prismaClient";
import withSessionHandler from "@libs/server/withSessionHandler";

const confirmHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { token, email, phone } = req.body;
  if (!email && !phone) {
    return res.status(400).json({ ok: false });
  }
  const user = await prisma.user.findUnique({ where: { ...(email ? { email } : { phone }) } });
  if (!user) {
    return res.status(404).json({ ok: false });
  }
  const userToken = { userId: user.id, token };
  const dbToken = await prisma.token.findUnique({ where: { userToken } });
  if (dbToken) {
    req.session.userId = user.id;
    await req.session.save();
    await prisma.token.delete({ where: { userToken } });
    return res.status(200).json({ ok: true });
  }
  return res.status(200).json({ ok: false });
};

export default withSessionHandler(confirmHandler, { method: "POST", routeType: "public" });
