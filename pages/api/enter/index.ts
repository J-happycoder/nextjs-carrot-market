import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../libs/prismaClient";
import withHandler from "../../../libs/withHandler";

const exists = (target: string | undefined) => {
  return target && target !== "";
};

interface CreateUserProps {
  email: string | undefined;
  phone: string | undefined;
}

const createUser = async ({ email, phone }: CreateUserProps) => {
  if (exists(email) || exists(phone)) {
    const where = { ...(phone && { phone: +phone }), ...(email && { email }) };
    const create = { ...(phone && { phone: +phone }), ...(email && { email }) };
    const user = await prisma.user.upsert({
      where,
      create,
      update: {},
    });
    console.log(user);
  }
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { email, phone, oneTimePassword } = req.body;
  if (exists(oneTimePassword) && exists(phone)) {
    // Confirm
  }
  if (!exists(oneTimePassword)) {
    createUser({ email, phone });
    return res.status(200).end();
  }
  return res.status(400).end();
};

export default withHandler("POST", handler);
