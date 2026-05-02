/* eslint-disable @typescript-eslint/no-unused-vars */
import { createServer, Server as HTTPServer } from "http";
import { Server as SocketIOServer } from "socket.io";
import app from "./app";
import { envVars } from "./app/config/env";
import { initSocket } from "./sockets";

let server: HTTPServer;
let io: SocketIOServer;

const startServer = async () => {
  try {
    // Step 1: Create HTTP Server using the express app
    server = createServer(app);

    // Step 2: Initialize Socket.io
    const io = initSocket(server);
    console.log("Socket.io initialized!");
    

    // Step 3: Start the HTTP server
    server.listen(envVars.PORT, () => {
      console.log(`Server running on port ${envVars.PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

(async () => {
  await startServer();
})();

// Global Socket Export
export { initSocket } from "./sockets";

// Graceful shutdowns
const shutdown = (reason: string) => {
  console.log(`${reason} detected. Shutting down server...`);

  if (server) {
    server.close(() => {
      console.log("HTTP server closed");
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

process.on("unhandledRejection", (err) => {
  console.error("Unhandled rejection:", err);
  shutdown("Unhandled rejection");
});

process.on("uncaughtException", (err) => {
  console.error("Uncaught exception:", err);
  shutdown("Uncaught exception");
});

process.on("SIGTERM", () => shutdown("SIGTERM"));
process.on("SIGINT", () => shutdown("SIGINT"));
