import { create } from "zustand";
import api from "@/lib/axios";

export const useNotificationStore = create((set, get) => ({
  notifications: [],

  fetchNotifications: async () => {
    const res = await api.get("/notifications");
    set({ notifications: res.data.data });
  },

  acceptInvite: async (inviteId) => {
    await api.post("/invite/accept", { inviteId });

    set({
      notifications: get().notifications.filter(
        (n) => n.meta?.inviteId !== inviteId
      ),
    });
  },
}));