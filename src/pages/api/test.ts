import type { NextApiHandler } from "next";

const handler: NextApiHandler = (req, res) => {
  res.json({ name: "demo" });
};

export default handler;
