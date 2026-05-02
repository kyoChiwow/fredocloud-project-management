/* eslint-disable no-undef */
import { io } from "socket.io-client";

// ⚠️ Replace with your actual workspace ID
const WORKSPACE_ID = "1ae0d37c-007c-41e1-ab84-d511b1a4b761";
const USER_ID = "66a74d6a-0216-4281-8acd-0727f1034080"; // any user

const socket = io("http://localhost:5000", {
  // withCredentials: true, // if you need cookies, uncomment
});

socket.on("connect", () => {
  console.log("✅ Connected to socket server");

  // Join the workspace room
  socket.emit("join-workspace", {
    workspaceId: WORKSPACE_ID,
    userId: USER_ID,
  });

  console.log(`📢 Joined workspace ${WORKSPACE_ID}`);
  console.log(
    "Listening for events: announcement-created, reaction-created, comment-created, action-updated\n",
  );

  // --- Listeners for all real-time events ---
  socket.on("announcement-created", (data) => {
    console.log("📢 announcement-created:", data.title, data.id);
  });

  socket.on("reaction-created", (data) => {
    console.log(
      "👍 reaction-created:",
      data.emoji,
      "on announcement",
      data.announcementId,
    );
  });

  socket.on("comment-created", (data) => {
    console.log("💬 comment-created:", data.content, "by", data.user?.name);
  });

  socket.on("action-updated", (data) => {
    console.log("✅ action-updated:", data.title, "→", data.status);
  });
  
  socket.on("goal-updated", (data) => {
    console.log("✅ goal-updated:", data.title, "→", data.status);
  });
});

socket.on("disconnect", () => {
  console.log("❌ Disconnected");
});
