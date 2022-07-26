import prisma from "@libs/server/prismaClient";
import withSessionHandler from "@libs/server/withSessionHandler";
import { NextApiRequest, NextApiResponse } from "next";

const updateProfileHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { email, phone, name } = req.body;
  const { userId } = req.session;
  if (!email && !phone) {
    return res.status(400).end();
  }
  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      email,
      phone,
      name,
    },
  });
  return res.status(200).json({ ok: true });
};

export default withSessionHandler(updateProfileHandler, { method: "POST", routeType: "entered" });
