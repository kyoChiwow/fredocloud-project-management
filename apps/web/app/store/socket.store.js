import { create } from "zustand";
import { getSocket } from "@/lib/socket";

export const useSocketStore = create((set, get) => ({
  socket: null,
  onlineUsers: [],
  notifications: [],

  connect: () => {
    const socket = getSocket();

    socket.connect();

    socket.on("online-users", (users) => {
      set({ onlineUsers: users });
    });

    socket.on("notification", (data) => {
      set((state) => ({
        notifications: [data, ...state.notifications],
      }));
    });

    set({ socket });
  },

  joinUser: (userId) => {
    get().socket?.emit("join-user", { userId });
  },

  joinWorkspace: (workspaceId, userId) => {
    get().socket?.emit("join-workspace", { workspaceId, userId });
  },
}));