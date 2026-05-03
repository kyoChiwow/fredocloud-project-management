"use client";

import { useAnnouncementStore } from "@/app/store/announcement.store";
import { useWorkspaceStore } from "@/app/store/workspace.store";
import AnnouncementCard from "@/components/announcement/announcementCard";
import CreateAnnouncement from "@/components/announcement/createAnnouncement";
import { useEffect } from "react";
import { Pin, Megaphone, Loader2, Sparkles, Bell } from "lucide-react";
import { useParams } from "next/navigation";

export default function AnnouncementsPage() {
  const { currentWorkspace } = useWorkspaceStore();
  const { id } = useParams();
  const { announcements, fetchAnnouncements, isLoading } = useAnnouncementStore();

  useEffect(() => {
    if (id) {
      fetchAnnouncements(id);
    }
  }, [id, fetchAnnouncements]);

  const pinned = announcements.filter((a) => a.isPinned);
  const others = announcements.filter((a) => !a.isPinned);

  return (
    <div className="min-h-screen bg-[#f8fafc] pb-24 relative overflow-x-hidden">
      {/* Decorative Top Gradient */}
      <div className="absolute top-0 left-0 right-0 h-64 bg-linear-to-b from-blue-50/50 to-transparent pointer-events-none" />

      <div className="max-w-3xl mx-auto px-6 pt-12 relative z-10">
        
        {/* Modern Header */}
        <header className="mb-12 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-[10px] font-black uppercase tracking-wider mb-2 border border-blue-100">
              <Sparkles className="h-3 w-3" />
              Live Updates
            </div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">
              Feed
            </h1>
            <p className="text-slate-500 font-medium">
              Broadcasts for <span className="text-blue-600 font-bold">@{currentWorkspace?.name?.toLowerCase().replace(/\s/g, '') || "team"}</span>
            </p>
          </div>

          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-xl shadow-slate-200/50 border border-slate-100 relative group">
            <Bell className="h-6 w-6 text-slate-400 group-hover:text-blue-600 transition-colors" />
            <span className="absolute top-3 right-3 h-2.5 w-2.5 rounded-full bg-red-500 border-2 border-white" />
          </div>
        </header>

        <div className="space-y-16">
          {/* Post Creation Area */}
          <section className="bg-white rounded-3xl p-1.5 shadow-sm ring-1 ring-slate-200/60 relative z-20">
            <CreateAnnouncement />
          </section>

          {/* Feed Content */}
          <div className="relative space-y-12">
            
            {/* Loading State */}
            {isLoading && (
              <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border border-slate-100 shadow-sm relative z-20">
                <Loader2 className="h-10 w-10 animate-spin text-blue-600 mb-4" />
                <p className="text-slate-900 font-bold tracking-tight text-lg">Fetching updates</p>
                <p className="text-sm text-slate-400">Syncing with your workspace...</p>
              </div>
            )}

            {/* Pinned Section */}
            {pinned.length > 0 && (
              <div className="space-y-6 relative z-20">
                <div className="flex items-center justify-between px-2">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-orange-100 text-orange-600">
                      <Pin className="h-4 w-4 fill-current" />
                    </div>
                    <h2 className="text-sm font-black uppercase tracking-widest text-slate-800">Priority</h2>
                  </div>
                  <span className="text-[10px] font-bold text-slate-400">{pinned.length} PINNED</span>
                </div>
                
                <div className="grid gap-6">
                  {pinned.map((a) => (
                    <div key={a.id} className="ring-2 ring-orange-500/10 rounded-2xl bg-white shadow-sm">
                      <AnnouncementCard announcement={a} />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Regular Feed with Timeline Line Fix */}
            {others.length > 0 && (
              <div className="space-y-8 relative">
                {/* THE LINE: Lower Z-index to stay BEHIND cards */}
                <div className="absolute left-6.75 top-10 bottom-0 w-0.5 bg-slate-200/60 hidden sm:block z-0" />

                <div className="flex items-center gap-2 px-2 relative z-10">
                  {/* THE DOT: Sits ON the line */}
                  <div className="h-6 w-6 rounded-full bg-white border-2 border-slate-200 flex items-center justify-center shadow-sm">
                    <div className="h-1.5 w-1.5 rounded-full bg-slate-400" />
                  </div>
                  <h2 className="text-sm font-black uppercase tracking-widest text-slate-800">Recent Stream</h2>
                </div>

                <div className="grid gap-8 relative z-10">
                  {others.map((a) => (
                    <div 
                      key={a.id} 
                      className="transition-transform duration-300 hover:scale-[1.01] relative z-10"
                    >
                      {/* AnnouncementCard should have bg-white internally to hide the line beneath it */}
                      <AnnouncementCard announcement={a} />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Empty State */}
            {!isLoading && announcements.length === 0 && (
              <div className="text-center py-24 bg-white rounded-[40px] border border-slate-100 shadow-sm relative z-20">
                <div className="h-20 w-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Megaphone className="h-10 w-10 text-slate-200" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Quiet in here...</h3>
                <p className="text-slate-400 mt-2 max-w-xs mx-auto">This workspace hasnt shared any news. Start the conversation!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
