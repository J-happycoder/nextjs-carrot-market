import { NextApiRequest, NextApiResponse } from "next";
import withHandler from "../../../libs/withHandler";
import twilio from "twilio";

const twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log(req.body);
  return res.end();
};

export default withHandler("POST", handler);
