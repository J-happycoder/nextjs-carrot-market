import prisma from "@libs/server/prismaClient";
import withSessionHandler from "@libs/server/withSessionHandler";
import { NextApiRequest, NextApiResponse } from "next";

const updateProfileHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { email, phone, name, id } = req.body;
  const { userId } = req.session;
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!email && !phone) return res.status(404).end();

  const emailEdited = email !== user?.email;
  const phoneEdited = phone !== user?.phone;

  if (email && emailEdited) {
    const sameEmails = await prisma.user.count({ where: { email } });
    if (sameEmails > 0) {
      return res
        .status(400)
        .json({ ok: false, error: { message: "Email address is already in use." } });
    }
  }
  if (phone && phoneEdited) {
    const samePhoneNumbers = await prisma.user.count({ where: { phone } });
    if (samePhoneNumbers > 0) {
      return res
        .status(400)
        .json({ ok: false, error: { message: "Phone number is already in use." } });
    }
  }
  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      email: email ? email : null,
      phone: phone ? phone : null,
      name: name ? name : null,
      avatarId: id ? id : null,
    },
  });
  return res.status(200).json({ ok: true });
};

export default withSessionHandler(updateProfileHandler, { method: "POST", routeType: "entered" });
