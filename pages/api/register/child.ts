import { NextApiRequest, NextApiResponse } from "next";
import { createChild } from "@/services/childServices";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { parentId, name } = req.body;

    try {
      const childId = await createChild(req.body);
      res
        .status(200)
        .json({ message: "Child registered successfully", childId });
    } catch (error) {
      console.error("Database query error", error);
      res.status(500).json({ error: "Database query error" });
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
};

export default handler;
