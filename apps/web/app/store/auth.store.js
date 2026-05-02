import { create } from "zustand";
import api from "@/lib/axios";

export const useAuthStore = create((set) => ({
  user: null,
  loading: true,

  setUser: (user) => set({ user }),

  fetchUser: async () => {
    try {
      const res = await api.get("/auth/me");
      set({ user: res.data.data, loading: false });
    } catch {
      set({ user: null, loading: false });
    }
  },

  logout: async () => {
    await api.post("/auth/logout");
    set({ user: null });
  },
}));