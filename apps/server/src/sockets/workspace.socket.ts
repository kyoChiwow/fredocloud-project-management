/* eslint-disable @typescript-eslint/no-unused-vars */
import { Server, Socket } from "socket.io";

const onlineUsers = new Map<string, string>(); // socketId -> userId

export const registerWorkspaceSocket = (io: Server, socket: Socket) => {
  // ✅ USER CONNECTED (join personal room)
  socket.on("join-user", ({ userId }) => {
    socket.join(`user:${userId}`);
    onlineUsers.set(socket.id, userId);

    console.log(`User ${userId} joined personal room`);
  });

  // ✅ JOIN WORKSPACE
  socket.on("join-workspace", ({ workspaceId, userId }) => {
    socket.join(`workspace:${workspaceId}`);

    console.log("JOIN WORKSPACE:", workspaceId, userId);

    onlineUsers.set(socket.id, userId);

    const users = Array.from(onlineUsers.values());

    io.to(`workspace:${workspaceId}`).emit("online-users", users);
  });

  // ❌ DISCONNECT
  socket.on("disconnect", () => {
    const userId = onlineUsers.get(socket.id);
    onlineUsers.delete(socket.id);

    console.log(`User disconnected: ${userId}`);
  });
};