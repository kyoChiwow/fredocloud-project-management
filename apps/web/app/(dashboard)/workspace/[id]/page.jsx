"use client";

import { useWorkspaceStore } from "@/app/store/workspace.store";
import { useParams } from "next/navigation";

export default function WorkspacePage() {
  const { id } = useParams();
  const { currentWorkspace } = useWorkspaceStore();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">
        {currentWorkspace?.name || "Workspace"}
      </h1>

      <p className="text-gray-500">
        {currentWorkspace?.description}
      </p>

      {/* Next: Goals / Announcements / Actions */}
    </div>
  );
}