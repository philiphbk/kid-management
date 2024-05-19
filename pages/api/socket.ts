import { NextApiRequest, NextApiResponse } from "next";
import { Server as IOServer } from "socket.io";
import { Server as HttpServer } from "http";
import { Socket as NetSocket } from "net";

interface SocketServer extends HttpServer {
  io?: IOServer | undefined;
}

interface SocketWithIO extends NetSocket {
  server: SocketServer;
}

interface NextApiResponseWithSocket extends NextApiResponse {
  socket: SocketWithIO;
}

const ioHandler = (req: NextApiRequest, res: NextApiResponseWithSocket) => {
  if (!res.socket.server.io) {
    console.log("Initializing Socket.IO");
    const httpServer: SocketServer = res.socket.server;
    const io = new IOServer(httpServer, {
      path: "/api/socket",
    });

    io.on("connection", (socket) => {
      console.log("New client connected");

      socket.on("disconnect", () => {
        console.log("Client disconnected");
      });
    });

    res.socket.server.io = io;
  } else {
    console.log("Socket.IO already initialized");
  }
  res.end();
};

export default ioHandler;
