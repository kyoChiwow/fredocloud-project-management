"use client";

import { useAnnouncementStore } from "@/app/store/announcement.store";
import { useWorkspaceStore } from "@/app/store/workspace.store";
import { useState } from "react";
import { Send, MessageCircle, MoreHorizontal } from "lucide-react";

export default function CommentSection({ announcement }) {
  const [text, setText] = useState("");
  const { addComment } = useAnnouncementStore();
  const { currentWorkspace } = useWorkspaceStore();

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    if (!text.trim()) return;

    const workspaceId = currentWorkspace?.id || currentWorkspace?.workspaceId;

    addComment({
      announcementId: announcement.id,
      content: text,
      workspaceId: workspaceId,
    });

    setText("");
  };

  return (
    <div className="mt-4 space-y-6">
      {/* Comments List */}
      {announcement.comments?.length > 0 && (
        <div className="space-y-4 pt-2 border-l-2 border-slate-50 ml-3.5">
          {announcement.comments.map((c) => (
            <div key={c.id} className="flex gap-3 group relative pl-5">
              {/* Timeline Connector Dot */}
              <div className="absolute -left-2.25 top-4 h-4 w-4 rounded-full border-4 border-slate-50 bg-slate-200 group-hover:bg-blue-400 transition-colors" />
              
              {/* Avatar */}
              <div className="h-8 w-8 rounded-full bg-linear-to-br from-slate-100 to-slate-200 shrink-0 flex items-center justify-center text-[10px] font-bold text-slate-600 border border-white shadow-sm">
                {c.user?.name?.charAt(0).toUpperCase() || "U"}
              </div>
              
              <div className="flex flex-col flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold text-slate-900">
                    {c.user?.name}
                  </span>
                  <span className="text-[10px] font-medium text-slate-400 uppercase tracking-tighter">
                    {/* Fallback to 'Just now' if no date exists */}
                    {c.createdAt ? new Date(c.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Just now'}
                  </span>
                </div>
                
                <div className="bg-slate-50/80 px-4 py-2.5 rounded-2xl rounded-tl-none border border-slate-100 group-hover:bg-white group-hover:shadow-sm transition-all max-w-fit">
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {c.content}
                  </p>
                </div>
              </div>

              {/* Secret Hover Action (e.g., delete/report) */}
              <button className="opacity-0 group-hover:opacity-100 p-1 text-slate-400 hover:text-slate-600 transition-opacity self-center">
                <MoreHorizontal className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Input Area */}
      <form 
        onSubmit={handleSubmit}
        className="flex items-center gap-3"
      >
        {/* Current User Avatar Placeholder */}
        <div className="h-8 w-8 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center text-[10px] font-bold text-blue-600 shrink-0">
          Me
        </div>

        <div className="relative flex-1 flex items-center bg-white rounded-2xl border border-slate-200 px-3 py-1 focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-50 transition-all">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Write a reply..."
            className="flex-1 bg-transparent border-none outline-none text-sm py-2 text-slate-700 placeholder:text-slate-400"
          />
          <button 
            type="submit"
            disabled={!text.trim()}
            className="ml-2 p-1.5 text-blue-600 hover:bg-blue-50 disabled:text-slate-300 rounded-lg transition-all active:scale-90"
          >
            <Send className="h-4 w-4 fill-current" />
          </button>
        </div>
      </form>
    </div>
  );
}
