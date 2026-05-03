"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import KanbanBoard from "@/components/analytics/kanbanBoard";
import { useWorkspaceStore } from "@/app/store/workspace.store";

export default function ActionsPage({ params }) {
  const workspaceId = params.id;

  const [actions, setActions] = useState([]);
  const socket = useWorkspaceStore((s) => s.socket);

  // 📥 fetch actions manually
  const fetchActions = async () => {
    const res = await axios.get(
      `/action/${workspaceId}`
    );
    setActions(res.data.data);
  };

  // initial load
  useEffect(() => {
    fetchActions();
  }, []);

  // ⚡ listen to realtime updates
  useEffect(() => {
    if (!socket) return;

    socket.on("action-updated", (updated) => {
      setActions((prev) =>
        prev.map((a) => (a.id === updated.id ? updated : a))
      );
    });

    socket.on("action-moved", (updated) => {
      setActions((prev) =>
        prev.map((a) => (a.id === updated.id ? updated : a))
      );
    });

    return () => {
      socket.off("action-updated");
      socket.off("action-moved");
    };
  }, [socket]);

  // 🔁 move action
  const moveAction = async (id, status) => {
    await axios.patch(`/action/move/${id}`, {
      status,
    });

    // optional: optimistic update
    setActions((prev) =>
      prev.map((a) =>
        a.id === id ? { ...a, status } : a
      )
    );
  };

  return (
    <KanbanBoard items={actions} onMove={moveAction} />
  );
}