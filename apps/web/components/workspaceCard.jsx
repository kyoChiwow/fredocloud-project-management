"use client";

import { useWorkspaceStore } from "@/app/store/workspace.store";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react"; // npm install lucide-react if you don't have it

export default function WorkspaceCard({ workspace }) {
  const router = useRouter();
  const setCurrentWorkspace = useWorkspaceStore((s) => s.setCurrentWorkspace);

  const handleEnter = () => {
    setCurrentWorkspace(workspace);
    router.push(`/workspace/${workspace.id}`);
  };

  return (
    <div
      onClick={handleEnter}
      className="group relative flex flex-col justify-between overflow-hidden rounded-xl border border-slate-200 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-lg hover:shadow-slate-100 cursor-pointer"
    >
      {/* Accent Line - Thinner and more elegant */}
      <div
        className="absolute top-0 left-0 h-1 w-full transition-opacity group-hover:opacity-100 opacity-80"
        style={{ backgroundColor: workspace.accentColor || "#3b82f6" }}
      />

      <div className="space-y-3">
        <div className="flex items-start justify-between">
          {/* Workspace Icon Placeholder */}
          <div 
            className="flex h-10 w-10 items-center justify-center rounded-lg text-white font-bold text-lg shadow-sm"
            style={{ backgroundColor: workspace.accentColor || "#3b82f6" }}
          >
            {workspace?.name?.charAt(0).toUpperCase()}
          </div>
          
          <ArrowRight className="h-5 w-5 text-slate-300 transition-all group-hover:translate-x-1 group-hover:text-slate-900" />
        </div>

        <div>
          <h2 className="text-lg font-semibold text-slate-900 line-clamp-1">
            {workspace.name}
          </h2>
          <p className="mt-1 text-sm leading-relaxed text-slate-500 line-clamp-2">
            {workspace.description || "No description provided for this workspace."}
          </p>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between border-t border-slate-50 pt-4">
        <span className="text-xs font-medium uppercase tracking-wider text-slate-400">
          Private Workspace
        </span>
        <div className="flex -space-x-2">
          {/* Dummy avatars for visual flair */}
          {[1, 2].map((i) => (
            <div key={i} className="h-6 w-6 rounded-full border-2 border-white bg-slate-200" />
          ))}
        </div>
      </div>
    </div>
  );
}
