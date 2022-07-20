import { NextApiRequest, NextApiResponse } from "next";
import withHandler from "../../../libs/withHandler";
import MailClient from "@sendgrid/mail";
import prisma from "../../../libs/prismaClient";

const sendEmail = async (email: string) => {
  if (process.env.SENDGRID_API_KEY) {
    MailClient.setApiKey(process.env.SENDGRID_API_KEY);
  }
  const message = {
    to: email,
    from: "kyle.responses@gmail.com",
    subject: "Hello, This is the first Sendgrid Email!!",
    text: "Hi, and thank you.",
  };
  await MailClient.send(message);
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).end();
  }
  if (email !== "") {
    const user = await prisma.user.upsert({
      where: { email },
      create: { email },
      update: {},
    });
  }
  return res.status(200).json({ ok: true });
};

export default withHandler("POST", handler);
