import { create } from "zustand";
import api from "@/lib/axios";

export const useAnnouncementStore = create((set, get) => ({
  announcements: [],
  isLoading: false,

  fetchAnnouncements: async (workspaceId) => {
    set({ isLoading: true });
    try {
      const res = await api.get(`/announcements/${workspaceId}`);
      set({ announcements: res.data.data, isLoading: false });
    } catch (err) {
      console.error(err);
      set({ isLoading: false });
    }
  },

  createAnnouncement: async (data) => {
    try {
      await api.post("/announcements", data);
      // socket will handle update
    } catch (err) {
      console.error(err);
    }
  },

  reactToAnnouncement: async (data) => {
    try {
      await api.post("/announcements/react", data);
    } catch (err) {
      console.error(err);
    }
  },

  addComment: async (data) => {
    try {
      await api.post("/announcements/comment", data);
    } catch (err) {
      console.error(err);
    }
  },

  togglePin: async (id) => {
    try {
      await api.patch(`/announcements/pin/${id}`);
    } catch (err) {
      console.error(err);
    }
  },
}));