import { create } from "zustand";
import api from "@/lib/axios";
import { useSocketStore } from "./socket.store";

export const useWorkspaceStore = create((set, get) => ({
  workspaces: [],
  currentWorkspace: null,

  fetchWorkspaces: async () => {
    const res = await api.get("/workspace");
    set({ workspaces: res.data.data });
  },

  createWorkspace: async (data) => {
    const res = await api.post("/workspace", data);

    set({
      workspaces: [...get().workspaces, res.data.data],
    });
  },

  setCurrentWorkspace: (workspace) => {
    set({ currentWorkspace: workspace });

    // 🔥 JOIN SOCKET ROOM
    const socketStore = useSocketStore.getState();
    socketStore.joinWorkspace(workspace.id);
  },
}));