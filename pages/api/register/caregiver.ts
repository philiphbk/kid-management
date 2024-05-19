import { NextApiRequest, NextApiResponse } from "next";
import { createCaregiver } from "@/services/caregiverService";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    try {
      const caregiverId = await createCaregiver(req.body);
      res
        .status(200)
        .json({ message: "Caregiver registered successfully", caregiverId });
    } catch (error) {
      console.error("Database query error", error);
      res.status(500).json({ error: "Database query error" });
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
};

export default handler;
