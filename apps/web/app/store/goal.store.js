import { create } from "zustand";
import api from "@/lib/axios";

export const useGoalStore = create((set, get) => ({
  goals: [],
  isLoading: false,

  // Fetches goals for a specific workspace
  fetchGoals: async (workspaceId) => {
    set({ isLoading: true });
    try {
      const res = await api.get(`/goals/workspace/${workspaceId}`);
      set({ goals: res.data.data, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      console.error("Error fetching goals:", error);
    }
  },

  // We remove the manual 'set' here because the Socket listener 
  // in socket.store.ts now handles adding the goal to the UI.
  createGoal: async (data) => {
    try {
      await api.post("/goals", data);
      // Goal will be added to state via socket "goal-created"
    } catch (error) {
      console.error("Error creating goal:", error);
    }
  },

  // Optimistic update for status remains safe because it maps by ID
  updateStatus: async (goalId, status) => {
    try {
      // Update UI immediately for better UX
      set({
        goals: get().goals.map((g) =>
          g.id === goalId ? { ...g, status } : g
        ),
      });

      await api.patch(`/goals/${goalId}/status`, { status });
    } catch (error) {
      console.error("Error updating status:", error);
      // Optionally re-fetch goals here if the update fails to sync state
    }
  },

  // We remove the manual 'set' here because the Socket listener
  // handles adding the milestone to the specific goal.
  addMilestone: async (data) => {
    try {
      await api.post("/goals/milestone", data);
      // Milestone will be added via socket "milestone-added"
    } catch (error) {
      console.error("Error adding milestone:", error);
    }
  },
}));
