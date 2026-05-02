import { create } from "zustand";
import { io } from "socket.io-client";
import { useGoalStore } from "./goal.store";
import { useAnnouncementStore } from "./announcement.store";

let socket;

export const useSocketStore = create((set) => ({
  socket: null,

  connect: () => {
    if (!socket) {
      socket = io(process.env.NEXT_PUBLIC_SOCKET_URL, {
        withCredentials: true,
      });

      set({ socket });

      // Remove any existing listeners before adding new ones
        socket.off("goal-created");
        socket.off("milestone-added");
        socket.off("goal-updated");
        socket.off("activity-added");
        socket.off("announcement-created");

      // 🔥 REGISTER ALL REALTIME EVENTS
      registerGoalEvents(socket);
      registerAnnouncementEvents(socket);
      socket.on("notification", (notification) => {
        console.log("🔔 New notification:", notification);

        const state = useNotificationStore.getState();

        useNotificationStore.setState({
        notifications: [notification, ...state.notifications],
      });
    });
    
      console.log("🚀 All socket events registered");
    }
  },

  joinWorkspace: (workspaceId, userId) => {
  if (!socket) return;
  console.log("JOIN WORKSPACE EMIT:", workspaceId, userId);

  socket.emit("join-workspace", {
    workspaceId,
    userId,
  });
},

  joinUser: (userId) => {
    socket.emit("join-user", { userId });
  },
}));

// 🔥 EVENT HANDLER FUNCTION
const registerGoalEvents = (socket) => {
  // ✅ NEW GOAL
  socket.on("goal-created", (newGoal) => {
    const state = useGoalStore.getState();
    const alreadyExists = state.goals.some((g) => g.id === newGoal.id);

    if (!alreadyExists) {
      useGoalStore.setState({ goals: [newGoal, ...state.goals] });
    }
  });

  // ✅ MILESTONE ADDED
  socket.on("milestone-added", ({ goalId, milestone }) => {
    const state = useGoalStore.getState();
    const goal = state.goals.find((g) => g.id === goalId);
    
    // Safety: Check if milestone already exists in the goal
    const milestoneExists = goal?.milestones?.some((m) => m.id === milestone.id);

    if (goal && !milestoneExists) {
      useGoalStore.setState({
        goals: state.goals.map((g) =>
          g.id === goalId
            ? { ...g, milestones: [...(g.milestones || []), milestone] }
            : g
        ),
      });
    }
  });

  // ✅ STATUS UPDATED
  socket.on("goal-updated", (updatedGoal) => {
    useGoalStore.setState((state) => ({
      goals: state.goals.map((g) =>
        g.id === updatedGoal.id ? { ...g, ...updatedGoal } : g
      ),
    }));
  });

  // ✅ ACTIVITY ADDED
  socket.on("activity-added", (activity) => {
    const state = useGoalStore.getState();
    const goal = state.goals.find((g) => g.id === activity.goalId);
    
    // Safety: Check if activity already exists in the goal
    const activityExists = goal?.activities?.some((a) => a.id === activity.id);

    if (goal && !activityExists) {
      useGoalStore.setState({
        goals: state.goals.map((g) =>
          g.id === activity.goalId
            ? { ...g, activities: [activity, ...(g.activities || [])] }
            : g
        ),
      });
    }
  });
};

const registerAnnouncementEvents = (socket) => {
  // ✅ ANNOUNCEMENT CREATED
  socket.on("announcement-created", (announcement) => {
    const state = useAnnouncementStore.getState();
    const exists = state.announcements.some((a) => a.id === announcement.id);
    if (!exists) {
      useAnnouncementStore.setState({
        announcements: [announcement, ...state.announcements],
      });
    }
  });

  // ✅ ANNOUNCEMENT UPDATED
  socket.on("announcement-updated", (updated) => {
  useAnnouncementStore.setState((state) => ({
    announcements: state.announcements.map((a) =>
      a.id === updated.id ? updated : a
    ),
  }));
});

  // ✅ REACTION ADDED
  socket.on("reaction-created", (reaction) => {
    const state = useAnnouncementStore.getState();
    useAnnouncementStore.setState({
      announcements: state.announcements.map((a) => {
        if (a.id !== reaction.announcementId) return a;

        // Check if this specific reaction record already exists in the list
        const exists = a.reactions?.some((r) => r.id === reaction.id);

        return {
          ...a,
          reactions: exists
            ? a.reactions.map((r) => (r.id === reaction.id ? reaction : r)) // Update emoji
            : [...(a.reactions || []), reaction], // Add new
        };
      }),
    });
  });

  // ✅ COMMENT ADDED
  socket.on("comment-created", (comment) => {
    const state = useAnnouncementStore.getState();
    useAnnouncementStore.setState({
      announcements: state.announcements.map((a) =>
        a.id === comment.announcementId
          ? { ...a, comments: [...(a.comments || []), comment] }
          : a
      ),
    });
  });
};