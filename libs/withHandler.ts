import { NextApiRequest, NextApiResponse } from "next";

const withHandler = (
  method: "GET" | "POST" | "DELETE",
  handler: (req: NextApiRequest, res: NextApiResponse) => void
) => {
  return async function (req: NextApiRequest, res: NextApiResponse) {
    if (req.method === method) {
      handler(req, res);
    } else {
      return res.status(400).end();
    }
  };
};

export default withHandler;
