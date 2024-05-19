import { NextApiRequest, NextApiResponse } from "next";
import pool from "@/lib/db";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { parent, child, caregiver } = req.body;

    try {
      const connection = await pool.getConnection();
      try {
        // Example query to insert registration data
        await connection.query(
          "INSERT INTO registrations (parent, child, caregiver) VALUES (?, ?, ?)",
          [parent, child, caregiver]
        );
        res.status(200).json({ message: "Registration successful" });
      } finally {
        connection.release();
      }
    } catch (error) {
      console.error("Database query error", error);
      res.status(500).json({ error: "Database query error" });
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
};

export default handler;
