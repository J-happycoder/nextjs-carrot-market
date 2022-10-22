import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@libs/server/prismaClient";
import mailClient from "@sendgrid/mail";
import twilio from "twilio";
import withSessionHandler from "@libs/server/withSessionHandler";

const smsClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

const returnOrCreateUser = async (email: string | undefined, phone: string | undefined) => {
  const where = { ...(phone && { phone }), ...(email && { email }) };
  const create = { ...(phone && { phone }), ...(email && { email }) };
  const user = await prisma.user.upsert({
    where,
    create,
    update: {},
  });
  return user;
};

const returnOrCreateToken = async (userId: number) => {
  const token = Math.floor(100000 + Math.random() * 899999) + "";
  await prisma.token.upsert({
    where: {
      userToken: {
        token,
        userId,
      },
    },
    create: {
      token,
      user: {
        connect: { id: userId },
      },
    },
    update: {},
  });
  return token;
};

const sendEmail = async (token: string, email: string) => {
  if (process.env.SENDGRID_API_KEY) {
    mailClient.setApiKey(process.env.SENDGRID_API_KEY);
    await mailClient.send({
      from: "kyle.responses@gmail.com",
      to: email,
      subject: "Carrot Verification Code",
      text: "d",
      html: `<strong>Your verification code is ${token}.</strong>`,
    });
  }
};

const sendSMS = async (token: string, phone: string) => {
  await smsClient.messages.create({
    from: process.env.TWILIO_PHONE_NUMBER,
    to: phone,
    body: `Carrot: Your verification code is ${token}.`,
  });
};

const enterHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { email, phone } = req.body;
  if (!email && !phone) {
    return res.status(400).json({ ok: false });
  }
  const { id } = await returnOrCreateUser(email, phone);
  const token = await returnOrCreateToken(id);
  // if (email) await sendEmail(token, email);
  // else await sendSMS(token, phone);
  return res.status(200).json({ ok: true });
};

export default withSessionHandler(enterHandler, { method: "POST", routeType: "public" });
