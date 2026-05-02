"use client";

import { useGoalStore } from "@/app/store/goal.store";
import { useState } from "react";
import { ChevronDown, ChevronUp, Target, CheckCircle2, Clock, PlayCircle } from "lucide-react";
import MilestoneForm from "./mileStoneForm";
import ActivityFeed from "./activityFeed";

export default function GoalCard({ goal }) {
  const updateStatus = useGoalStore((s) => s.updateStatus);
  const [open, setOpen] = useState(false);

  const statusConfig = {
    PENDING: { color: "text-slate-500 bg-slate-100", icon: <Clock className="h-3 w-3" /> },
    IN_PROGRESS: { color: "text-blue-600 bg-blue-50", icon: <PlayCircle className="h-3 w-3" /> },
    COMPLETED: { color: "text-green-600 bg-green-50", icon: <CheckCircle2 className="h-3 w-3" /> },
  };

  return (
    <div className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:shadow-md">
      {/* Header: Title & Status */}
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1">
          <h2 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
            {goal.title}
          </h2>
          <p className="text-sm text-slate-500 line-clamp-2">{goal.description}</p>
        </div>

        <div className="relative">
          <select
            value={goal.status}
            onChange={(e) => updateStatus(goal.id, e.target.value, goal.workspaceId)}
            className={`appearance-none cursor-pointer rounded-full px-4 py-1 text-xs font-bold uppercase tracking-wider outline-none border-none ${statusConfig[goal.status].color}`}
          >
            <option value="PENDING">Pending</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="COMPLETED">Completed</option>
          </select>
        </div>
      </div>

      {/* Milestones Section */}
      <div className="mt-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="flex items-center gap-2 text-sm font-semibold text-slate-700">
            <Target className="h-4 w-4 text-slate-400" />
            Milestones
          </h3>
          <span className="text-xs font-medium text-slate-400">
            {goal.milestones?.length || 0} Total
          </span>
        </div>

        <div className="space-y-3">
          {goal.milestones?.map((m) => (
            <div key={m.id} className="space-y-1.5">
              <div className="flex justify-between text-xs font-medium">
                <span className="text-slate-600">{m.title}</span>
                <span className="text-slate-400">{m.progress}%</span>
              </div>
              {/* Custom Progress Bar */}
              <div className="h-1.5 w-full rounded-full bg-slate-100 overflow-hidden">
                <div 
                  className="h-full bg-blue-500 transition-all duration-500" 
                  style={{ width: `${m.progress}%` }} 
                />
              </div>
            </div>
          ))}
        </div>

        <div className="pt-2">
          <MilestoneForm goalId={goal.id} />
        </div>
      </div>

      {/* Activity Toggle */}
      <div className="mt-6 border-t border-slate-50 pt-4">
        <button
          onClick={() => setOpen(!open)}
          className="flex w-full items-center justify-between text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-blue-600 transition-colors"
        >
          <span>{open ? "Hide Activity" : "View History"}</span>
          {open ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </button>

        {open && (
          <div className="mt-4 rounded-xl bg-slate-50/50 p-4 animate-in fade-in slide-in-from-top-2 duration-300">
            <ActivityFeed activities={goal.activities} />
          </div>
        )}
      </div>
    </div>
  );
}
