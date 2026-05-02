"use client";

import { Circle, Clock, MessageSquare, PlusCircle, Settings } from "lucide-react";

export default function ActivityFeed({ activities = [] }) {
  // Helper to pick icons based on activity type (optional logic)
  const getIcon = (type) => {
    switch (type) {
      case "create": return <PlusCircle className="h-3 w-3 text-blue-500" />;
      case "comment": return <MessageSquare className="h-3 w-3 text-green-500" />;
      case "update": return <Settings className="h-3 w-3 text-amber-500" />;
      default: return <Circle className="h-2 w-2 text-slate-400 fill-current" />;
    }
  };

  return (
    <div className="mt-6 space-y-4">
      <div className="flex items-center justify-between border-b border-slate-100 pb-2">
        <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
          Recent Activity
        </h3>
        <span className="text-[10px] font-medium bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full">
          {activities.length} Events
        </span>
      </div>

      <div className="relative space-y-6 before:absolute before:left-2.75 before:top-2 before:h-[calc(100%-16px)] before:w-px before:bg-slate-100">
        {activities.length > 0 ? (
          activities.map((a) => (
            <div key={a.id} className="relative pl-8 group">
              {/* Timeline Dot/Icon */}
              <div className="absolute left-0 top-1 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-white border border-slate-100 shadow-sm transition-colors group-hover:border-slate-300">
                {getIcon(a.type)}
              </div>

              <div className="flex flex-col space-y-1">
                <p className="text-sm text-slate-600 leading-relaxed">
                  <span className="font-semibold text-slate-900">{a.user?.name || "Someone"}</span>{" "}
                  {a.message}
                </p>
                
                <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-medium italic">
                  <Clock className="h-3 w-3" />
                  {/* Assumes a.createdAt is a valid date string */}
                  {new Date(a.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-sm text-slate-400 text-center py-4 italic">No recent activity found.</p>
        )}
      </div>
    </div>
  );
}
