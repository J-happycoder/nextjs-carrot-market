import { NextApiRequest, NextApiResponse } from "next";
import withHandler from "../../../libs/withHandler";
import twilio from "twilio";
import prisma from "../../../libs/prismaClient";

const twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { phone, oneTimePassword } = req.body;
  if (!phone || !oneTimePassword) {
    return res.status(400).end();
  }
  if (oneTimePassword === "" && phone !== "") {
    const user = await prisma.user.upsert({
      where: { phone: +phone },
      create: { phone: +phone },
      update: {},
    });
    console.log(user);
  }
  return res.end();
};

export default withHandler("POST", handler);
