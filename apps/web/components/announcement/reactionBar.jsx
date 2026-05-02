"use client";

import { useAnnouncementStore } from "@/app/store/announcement.store";
import { useWorkspaceStore } from "@/app/store/workspace.store";
import { SmilePlus } from "lucide-react"; // npm install lucide-react

export default function ReactionBar({ announcement }) {
  const { reactToAnnouncement } = useAnnouncementStore();
  const { currentWorkspace } = useWorkspaceStore();

  const emojis = ["👍", "🔥", "🚀", "👏"];
  const workspaceId = currentWorkspace?.id || currentWorkspace?.workspaceId;

  return (
    <div className="flex flex-wrap items-center gap-2 mt-4">
      {/* Existing Reactions with Counts */}
      {announcement.reactions?.map((r) => (
        <button
          key={r.id}
          onClick={() => reactToAnnouncement({ announcementId: announcement.id, emoji: r.emoji, workspaceId })}
          className="flex items-center gap-1.5 rounded-full border border-blue-100 bg-blue-50/50 px-2.5 py-1 text-sm transition-all hover:bg-white hover:border-blue-300"
        >
          <span className="text-base">{r.emoji}</span>
          <span className="text-xs font-bold text-blue-600">{r.count || 1}</span>
        </button>
      ))}

      {/* Quick Add Emoji Buttons */}
      <div className="flex items-center gap-1 ml-1 pl-2 border-l border-slate-100">
        {emojis.map((emoji) => (
          <button
            key={emoji}
            onClick={() => reactToAnnouncement({ announcementId: announcement.id, emoji, workspaceId })}
            className="flex h-8 w-8 items-center justify-center rounded-full text-lg grayscale hover:grayscale-0 hover:bg-slate-50 transition-all active:scale-125"
          >
            {emoji}
          </button>
        ))}
        
        {/* Plus Button for more emojis */}
        <button className="flex h-8 w-8 items-center justify-center rounded-full text-slate-400 hover:bg-slate-50 hover:text-blue-600 transition-colors">
          <SmilePlus className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
