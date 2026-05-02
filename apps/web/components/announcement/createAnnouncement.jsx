"use client";

import { useAnnouncementStore } from "@/app/store/announcement.store";
import { useWorkspaceStore } from "@/app/store/workspace.store";
import { useParams } from "next/navigation";
import { useState } from "react";
import { Send, Megaphone, Info } from "lucide-react"; // npm install lucide-react

export default function CreateAnnouncement() {
  const { id } = useParams();
  const { createAnnouncement, isLoading } = useAnnouncementStore();
  
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    if (!title.trim()) return;

    await createAnnouncement({
      title,
      content,
      workspaceId: id,
    });

    setTitle("");
    setContent("");
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden transition-all focus-within:border-slate-400 focus-within:shadow-md">
      {/* Header Info */}
      <div className="bg-slate-50/50 border-b border-slate-100 px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-2 text-slate-500">
          <Megaphone className="h-3.5 w-3.5" />
          <span className="text-[10px] font-bold uppercase tracking-widest">New Update</span>
        </div>
        <div className="flex items-center gap-1 text-[10px] text-slate-400 font-medium italic">
          <Info className="h-3 w-3" />
          Visible to everyone in this workspace
        </div>
      </div>

      <div className="p-5 space-y-3">
        <input
          className="w-full text-xl font-bold text-slate-900 placeholder:text-slate-300 outline-none border-none p-0 focus:ring-0"
          placeholder="Give it a title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className="w-full text-sm text-slate-600 placeholder:text-slate-400 outline-none border-none p-0 focus:ring-0 resize-none min-h-20 leading-relaxed"
          placeholder="What's the news? Write it here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <div className="flex justify-end pt-3 border-t border-slate-50">
          <button
            onClick={handleSubmit}
            disabled={isLoading || !title.trim()}
            className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 disabled:bg-slate-200 disabled:cursor-not-allowed text-white px-5 py-2 rounded-xl text-sm font-bold transition-all active:scale-95 shadow-sm"
          >
            {isLoading ? "Posting..." : "Share Update"}
            <Send className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
