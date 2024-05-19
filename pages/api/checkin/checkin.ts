import { NextApiRequest, NextApiResponse } from "next";
import { Server as IOServer } from "socket.io";
import type { Server as HTTPServer } from "http";
import type { Socket as NetSocket } from "net";

import pool from "@/lib/db";

interface SocketServer extends HTTPServer {
  io?: IOServer | undefined;
}

interface SocketWithIO extends NetSocket {
  server: SocketServer;
}

interface NextApiResponseWithSocket extends NextApiResponse {
  socket: SocketWithIO;
}

const handler = async (req: NextApiRequest, res: NextApiResponseWithSocket) => {
  if (req.method === "POST") {
    const { childId, parentId } = req.body;
    // Check-in logic here
    try {
      const connection = await pool.getConnection();
      try {
        // Example query to handle check-in
        await connection.query(
          "INSERT INTO checkins (childId, parentId) VALUES (?, ?)",
          [childId, parentId]
        );
        const io = res.socket.server.io;
        if (io) {
          io.emit("notification", {
            message: "Child checked in",
            data: req.body,
          });
          res.status(200).json({ message: "Check-in successful" });
        } else {
          res.status(500).json({ error: "Socket.IO not initialized" });
        }
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
