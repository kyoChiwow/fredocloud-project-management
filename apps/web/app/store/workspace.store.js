import { create } from "zustand";
import api from "@/lib/axios";
import { useSocketStore } from "./socket.store";
import { useAuthStore } from "./auth.store";

export const useWorkspaceStore = create((set, get) => ({
  workspaces: [],
  currentWorkspace: null,

  fetchWorkspaces: async () => {
    try {
      const res = await api.get("/workspace");
      
      const formattedWorkspaces = res.data.data.map((item) => ({
        ...item.workspace,
        id: item.workspace.id, 
        membershipId: item.id,
        role: item.role,
      }));

      set({ workspaces: formattedWorkspaces });
    } catch (error) {
      console.error("Error fetching workspaces:", error);
    }
  },

  createWorkspace: async (data) => {
    try {
      const res = await api.post("/workspace", data);

      const item = res.data.data;
      const formattedNewWs = {
        ...(item.workspace || item),
        id: item.workspace?.id || item.id,
        membershipId: item.id,
        role: item.role || "ADMIN"
      };

      set({
        workspaces: [...get().workspaces, formattedNewWs],
      });
    } catch (error) {
      console.error("Error creating workspace:", error);
    }
  },

  setCurrentWorkspace: (workspace) => {
  set({ currentWorkspace: workspace });

  const socketStore = useSocketStore.getState();

  const userId = useAuthStore.getState().user?.id;

  if (workspace?.id && userId) {
    socketStore.joinWorkspace(workspace.id, userId);
  }
},
}));
