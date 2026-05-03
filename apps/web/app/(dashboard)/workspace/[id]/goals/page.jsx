"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import CreateGoalModal from "@/components/goalComponents/createGoalModal";
import InviteModal from "@/components/invite/inviteModal"; 
import GoalCard from "@/components/goalComponents/goalCard";
import { useGoalStore } from "@/app/store/goal.store";
import { Plus, Target, Layout, UserPlus } from "lucide-react"; 
import { useSocketStore } from "@/app/store/socket.store";
import { useAuthStore } from "@/app/store/auth.store";

export default function WorkspacePage() {
  const { id } = useParams();
  const { goals, fetchGoals, isLoading } = useGoalStore();
  const { connect, joinWorkspace } = useSocketStore();
  const { user } = useAuthStore();
  
  // 1. Separate states for each modal
  const [openGoalModal, setOpenGoalModal] = useState(false);
  const [openInviteModal, setOpenInviteModal] = useState(false);

  useEffect(() => {
    if (id) {
      fetchGoals(id);
      connect();
      if (user?.id) {
        joinWorkspace(id, user.id);
      }
    }
  }, [id, fetchGoals, connect, joinWorkspace, user?.id]);

  return (
    <div className="min-h-screen bg-slate-50/50">
      <div className="mx-auto max-w-5xl px-6 py-8">
        
        {/* Header Area */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-sm border border-slate-100 text-blue-600">
              <Layout className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">Workspace Goals</h1>
              <p className="text-sm font-medium text-slate-500">Track and manage your key objectives.</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* 2. New Invite Member Button */}
            <button
              onClick={() => setOpenInviteModal(true)}
              className="flex items-center justify-center gap-2 rounded-xl bg-white border border-slate-200 px-5 py-2.5 text-sm font-bold text-slate-700 transition-all hover:bg-slate-50 active:scale-95 shadow-sm"
            >
              <UserPlus className="h-4 w-4 text-blue-600" />
              Invite
            </button>

            <button
              onClick={() => setOpenGoalModal(true)}
              className="group flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-bold text-white transition-all hover:bg-slate-800 active:scale-95 shadow-lg shadow-slate-200"
            >
              <Plus className="h-4 w-4 transition-transform group-hover:rotate-90" />
              New Goal
            </button>
          </div>
        </div>

        {/* Goals List */}
        <div className="space-y-6">
          {isLoading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-32 w-full animate-pulse rounded-2xl bg-slate-200/50" />
              ))}
            </div>
          ) : goals.length > 0 ? (
            goals.map((goal) => (
              <GoalCard key={goal.id} goal={goal} />
            ))
          ) : (
            <div className="flex flex-col items-center justify-center rounded-3xl border-2 border-dashed border-slate-200 bg-white p-16 text-center shadow-sm">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-50 text-blue-600 mb-4">
                <Target className="h-8 w-8" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">No goals set yet</h3>
              <p className="mt-1 text-sm text-slate-500 max-w-xs">
                Break down your workspace vision into actionable goals to start tracking progress.
              </p>
              <button
                onClick={() => setOpenGoalModal(true)}
                className="mt-6 text-sm font-bold text-blue-600 hover:underline"
              >
                + Create your first goal
              </button>
            </div>
          )}
        </div>
      </div>

      {/* 3. Conditional Modals */}
      {openGoalModal && (
        <CreateGoalModal
          workspaceId={id}
          onClose={() => setOpenGoalModal(false)}
        />
      )}

      {openInviteModal && (
        <InviteModal
          workspaceId={id}
          onClose={() => setOpenInviteModal(false)}
        />
      )}
    </div>
  );
}
