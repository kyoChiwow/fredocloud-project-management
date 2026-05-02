"use client";

import { useSocketStore } from "../store/socket.store";
import { useWorkspaceStore } from "../store/workspace.store";
import { useAuthStore } from "../store/auth.store";
import { useEffect } from "react";
import { useParams } from "next/navigation";

export default function SocketProvider({ children }) {
  const connect = useSocketStore((s) => s.connect);
  const joinUser = useSocketStore((s) => s.joinUser);
  const joinWorkspace = useSocketStore((s) => s.joinWorkspace);

  const user = useAuthStore((s) => s.user);
  const params = useParams();
  const workspaceId = params?.id;

  console.log("USER:", user);
  console.log("WORKSPACE:", workspaceId);

 // connect once
  useEffect(() => {
    connect();
  }, []);

  // join user room
  useEffect(() => {
    if (user?.id) {
      joinUser(user.id);
    }
  }, [user?.id]);

  // join workspace room (FIXED)
  useEffect(() => {
    if (user?.id && workspaceId) {
      console.log("JOINING WORKSPACE:", workspaceId);

      joinWorkspace(workspaceId, user.id);
    }
  }, [user?.id, workspaceId]);

  return children;
}