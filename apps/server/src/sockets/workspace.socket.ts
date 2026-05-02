/* eslint-disable @typescript-eslint/no-unused-vars */
import { Server, Socket } from "socket.io";

const onlineUsers = new Map<string, string>(); // socketId -> userId

export const registerWorkspaceSocket = (io: Server, socket: Socket) => {
  socket.on("join-workspace", ({ workspaceId, userId }) => {
    socket.join(workspaceId);

    onlineUsers.set(socket.id, userId);

    const users = Array.from(onlineUsers.values());

    io.to(workspaceId).emit("online-users", users);
  });

  socket.on("disconnect", () => {
    const userId = onlineUsers.get(socket.id);
    onlineUsers.delete(socket.id);

    // You can optionally broadcast update here
  });
};