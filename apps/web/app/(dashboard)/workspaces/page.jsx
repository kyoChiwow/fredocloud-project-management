"use client";

import { useEffect, useState } from "react";
import CreateWorkspaceModal from "@/components/createWorkspaceModal";
import WorkspaceCard from "@/components/workspaceCard";
import { useWorkspaceStore } from "@/app/store/workspace.store";
import { Plus, LayoutGrid, Loader2 } from "lucide-react"; // npm install lucide-react

export default function WorkspacesPage() {
  const { workspaces, fetchWorkspaces, isLoading } = useWorkspaceStore();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetchWorkspaces();
  }, [fetchWorkspaces]);

  return (
    <div className="min-h-screen bg-slate-50/50">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-10">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
              <LayoutGrid className="h-8 w-8 text-blue-600" />
              Your Workspaces
            </h1>
            <p className="text-slate-500">
              Manage your projects and collaborate with your team.
            </p>
          </div>

          <button
            onClick={() => setOpen(true)}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm shadow-blue-200 hover:bg-blue-700 transition-all active:scale-95"
          >
            <Plus className="h-5 w-5" />
            Create Workspace
          </button>
        </div>

        {/* Content Section */}
        {isLoading ? (
          <div className="flex h-64 items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-slate-300" />
          </div>
        ) : workspaces.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {workspaces.map((ws) => (
              <WorkspaceCard key={ws.id} workspace={ws} />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="flex flex-col items-center justify-center rounded-3xl border-2 border-dashed border-slate-200 bg-white p-20 text-center">
            <div className="rounded-full bg-slate-50 p-4">
              <LayoutGrid className="h-10 w-10 text-slate-300" />
            </div>
            <h3 className="mt-4 text-lg font-semibold text-slate-900">No workspaces found</h3>
            <p className="mt-2 text-sm text-slate-500 max-w-xs">
              Get started by creating your first workspace to organize your projects.
            </p>
            <button
              onClick={() => setOpen(true)}
              className="mt-6 text-sm font-bold text-blue-600 hover:text-blue-700"
            >
              + Create your first workspace
            </button>
          </div>
        )}
      </div>

      {open && <CreateWorkspaceModal onClose={() => setOpen(false)} />}
    </div>
  );
}
