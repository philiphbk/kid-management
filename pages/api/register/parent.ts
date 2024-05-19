import { NextApiRequest, NextApiResponse } from "next";
import { createParent } from "@/services/parentService";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    try {
      const parentId = await createParent(req.body);
      res
        .status(200)
        .json({ message: "Parent registered successfully", parentId });
    } catch (error) {
      console.error("Database query error", error);
      res.status(500).json({ error: "Database query error" });
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
};

export default handler;
