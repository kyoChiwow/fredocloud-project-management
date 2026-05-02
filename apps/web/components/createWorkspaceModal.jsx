"use client";

import { useWorkspaceStore } from "@/app/store/workspace.store";
import { useForm } from "react-hook-form";
import { X } from "lucide-react";

export default function CreateWorkspaceModal({ onClose }) {
  const { register, handleSubmit, formState: { isSubmitting } } = useForm({
    defaultValues: {
      accentColor: "#3b82f6"
    }
  });
  const createWorkspace = useWorkspaceStore((s) => s.createWorkspace);

  const onSubmit = async (data) => {
    try {
      await createWorkspace(data);
      onClose();
    } catch (error) {
      console.error("Failed to create workspace", error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Animated Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity" 
        onClick={onClose} 
      />

      {/* Modal Card */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="relative w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-8 shadow-2xl transition-all border border-slate-100"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">New Workspace</h2>
            <p className="text-sm text-slate-500">Set up a space for your team projects.</p>
          </div>
          <button 
            type="button"
            onClick={onClose}
            className="rounded-full p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="space-y-5">
          {/* Workspace Name */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-slate-700 ml-1">Workspace Name</label>
            <input
              {...register("name", { required: true })}
              placeholder="e.g. Design Team, Marketing Hub"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all placeholder:text-slate-400"
            />
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-slate-700 ml-1">Description</label>
            <textarea
              {...register("description")}
              placeholder="What is this workspace for?"
              rows={3}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all placeholder:text-slate-400 resize-none"
            />
          </div>

          {/* Color Picker Section */}
          <div className="flex items-center gap-4 p-3 rounded-xl bg-slate-50 border border-slate-100">
            <div className="space-y-0.5 flex-1">
              <label className="text-sm font-medium text-slate-700">Theme Color</label>
              <p className="text-xs text-slate-500">Pick a color for your workspace icon.</p>
            </div>
            <div className="relative h-10 w-10 overflow-hidden rounded-full border-2 border-white shadow-sm">
              <input
                {...register("accentColor")}
                type="color"
                className="absolute inset-[-50%] h-[200%] w-[200%] cursor-pointer border-none"
              />
            </div>
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
            {isSubmitting ? "Creating..." : "Create Space"}
          </button>
        </div>
      </form>
    </div>
  );
}
