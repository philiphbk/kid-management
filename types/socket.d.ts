// src/types/socket.d.ts
import { Server as HttpServer } from "http";
import { Server as SocketIOServer } from "socket.io";

declare module "http" {
  interface Server {
    io?: SocketIOServer;
  }
}
