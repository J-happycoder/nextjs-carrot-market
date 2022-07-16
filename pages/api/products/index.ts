import { NextApiRequest, NextApiResponse } from "next";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const products = [10, 11, 13, 14, 7, 4, 6, 1, 2, 3, 12].map((number) => ({
    name: `iPhone ${number} Pro`,
    id: number,
    likes: number,
    sold: number === 11,
  }));
  return res.status(200).json({ products });
}
