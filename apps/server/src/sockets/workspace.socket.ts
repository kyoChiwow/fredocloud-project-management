/* eslint-disable @typescript-eslint/no-unused-vars */
import { Server, Socket } from "socket.io";

const onlineUsers = new Map<string, string>();
const workspaceUsers = new Map<string, Set<string>>();

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

  if (!workspaceUsers.has(workspaceId)) {
    workspaceUsers.set(workspaceId, new Set());
  }

  workspaceUsers.get(workspaceId)!.add(userId);

  io.to(`workspace:${workspaceId}`).emit(
    "online-users",
    Array.from(workspaceUsers.get(workspaceId)!)
  );
  });

  // ❌ DISCONNECT
  socket.on("disconnect", () => {
  const userId = onlineUsers.get(socket.id);

  onlineUsers.delete(socket.id);

  workspaceUsers.forEach((set) => {
    set.delete(userId!);
  });
});
};