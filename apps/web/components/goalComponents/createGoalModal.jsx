"use client";

import { useGoalStore } from "@/app/store/goal.store";
import { useForm } from "react-hook-form";
import { X, Target, Calendar } from "lucide-react"; // npm install lucide-react

export default function CreateGoalModal({ workspaceId, onClose }) {
  const { register, handleSubmit, formState: { isSubmitting } } = useForm();
  const createGoal = useGoalStore((s) => s.createGoal);

  const onSubmit = async (data) => {
    try {
      await createGoal({
        ...data,
        workspaceId,
      });
      onClose();
    } catch (error) {
      console.error("Failed to create goal", error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity" 
        onClick={onClose} 
      />

      {/* Modal Card */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="relative w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-8 shadow-2xl border border-slate-100 transition-all"
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 rounded-lg">
              <Target className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900">Set a New Goal</h2>
              <p className="text-xs text-slate-500 font-medium">What do you want to achieve?</p>
            </div>
          </div>
          <button 
            type="button"
            onClick={onClose}
            className="rounded-full p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-5">
          {/* Title */}
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-slate-700 ml-1">Goal Title</label>
            <input
              {...register("title", { required: true })}
              placeholder="e.g. Complete Q3 Roadmap"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            />
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-slate-700 ml-1">Description (Optional)</label>
            <textarea
              {...register("description")}
              placeholder="Provide some context..."
              rows={3}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none"
            />
          </div>

          {/* Due Date */}
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-slate-700 ml-1 flex items-center gap-2">
              <Calendar className="h-4 w-4 text-slate-400" />
              Target Date
            </label>
            <input
              {...register("dueDate")}
              type="date"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-slate-600"
            />
          </div>
        </div>

        <div className="mt-8 flex gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 px-4 py-3 rounded-xl border border-slate-200 text-slate-600 font-semibold hover:bg-slate-50 transition-colors"
          >
            Cancel
          </button>
          <button
            disabled={isSubmitting}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl shadow-md shadow-blue-200 transition-all active:scale-[0.98] disabled:opacity-70"
          >
            {isSubmitting ? "Saving..." : "Create Goal"}
          </button>
        </div>
      </form>
    </div>
  );
}
