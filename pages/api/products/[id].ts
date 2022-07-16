import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  // Get the Product
  const product = {
    name: `iPhone 13 Pro`,
    likes: 1,
    sold: true,
  };
  return res.status(200).json({ product });
}
