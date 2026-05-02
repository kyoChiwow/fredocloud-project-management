import { create } from "zustand";
import api from "@/lib/axios";

export const useNotificationStore = create((set) => ({
  notifications: [],

  fetchNotifications: async () => {
    const res = await api.get("/notifications");
    set({ notifications: res.data.data });
  },
}));