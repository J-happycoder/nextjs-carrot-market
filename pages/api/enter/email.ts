import { NextApiRequest, NextApiResponse } from "next";
import withHandler from "../../../libs/withHandler";
import MailClient from "@sendgrid/mail";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { email } = req.body;
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
  return res.end();
};

export default withHandler("POST", handler);
