import { NextApiRequest, NextApiResponse } from "next";
import withHandler from "../../libs/withHandler";

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  return res.end();
};

export default withHandler("POST", handler);
