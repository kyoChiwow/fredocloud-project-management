import { createServer, Server as HTTPServer } from "http";
import { Server as SocketIOServer } from "socket.io";
import app from "./app";
import { envVars } from "./app/config/env";

let server: HTTPServer;
let io: SocketIOServer;

const startServer = async () => {
  try {
    // Step 1: Create HTTP Server using the express app
    server = createServer(app);

    // Step 2: Initialize Socket.io
    io = new SocketIOServer(server, {
      cors: {
        origin: envVars.FRONTEND_URL,
        credentials: true,
      },
    });

    // Step 3: Basic Socket Connection Logic
    io.on("connection", (socket) => {
      console.log("User Connected", socket.id);

      socket.on("error", (err) => {
        console.log(`Socket Error from ${socket.id}: ${err.message}`);
      });

      socket.on("disconnect", () => {
        console.log("User Disconnected");
      });
    });

    // Step 4: Start the HTTP server
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

// Export the IO
export { io };

// Unhandled rejection error
process.on("unhandledRejection", (err) => {
  console.log("Unhandled rejection detected. Server is shutting down!", err);

  if (server) {
    server.close(() => {
      console.log("Server closed");
      process.exit(1);
    });
  }
  process.exit(1);
});

// Uncaught exception error
process.on("uncaughtException", (err) => {
  console.log("Uncaught exception detected. Server is shutting down!", err);

  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }

  process.exit(1);
});

// Signal termination (SigTerm)
process.on("SIGTERM", () => {
  console.log("Signal termination detected, Server is shutting down");
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

// Signal interruption (SigInt)
process.on("SIGINT", () => {
  console.log("Signal interruption detected, Server is shutting down");
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});
