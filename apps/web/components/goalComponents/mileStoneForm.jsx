"use client";

import { useGoalStore } from "@/app/store/goal.store";
import { useForm } from "react-hook-form";
import { Plus } from "lucide-react";

export default function MilestoneForm({ goalId }) {
  const { register, handleSubmit, reset, formState: { isSubmitting } } = useForm({
    defaultValues: {
      progress: 0
    }
  });
  const addMilestone = useGoalStore((s) => s.addMilestone);

  const onSubmit = async (data) => {
    try {
      await addMilestone({
        ...data,
        goalId,
        progress: Number(data.progress),
      });
      reset();
    } catch (error) {
      console.error("Failed to add milestone", error);
    }
  };

  return (
    <form 
      onSubmit={handleSubmit(onSubmit)} 
      className="group flex items-center gap-1 mt-4 p-1.5 rounded-xl border border-slate-100 bg-slate-50/50 focus-within:bg-white focus-within:border-blue-200 focus-within:ring-4 focus-within:ring-blue-50/50 transition-all"
    >
      {/* Milestone Title Input */}
      <input 
        {...register("title", { required: true })} 
        placeholder="Add a new milestone..." 
        className="flex-1 bg-transparent px-3 py-1 text-sm outline-none placeholder:text-slate-400 text-slate-700" 
      />

      {/* Progress Percentage Input */}
      <div className="flex items-center gap-1 border-l border-slate-200 px-2">
        <input 
          {...register("progress", { required: true, min: 0, max: 100 })} 
          type="number" 
          placeholder="0" 
          className="w-10 bg-transparent text-center text-sm font-semibold outline-none text-blue-600 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" 
        />
        <span className="text-[10px] font-bold text-slate-400">%</span>
      </div>

      {/* Add Button */}
      <button 
        disabled={isSubmitting}
        className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white shadow-sm hover:bg-blue-700 active:scale-90 transition-all disabled:opacity-50"
      >
        <Plus className={`h-4 w-4 ${isSubmitting ? 'animate-spin' : ''}`} />
      </button>
    </form>
  );
}
