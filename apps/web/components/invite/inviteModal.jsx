"use client";

import { useState } from "react";
import { Mail, X, UserPlus, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import api from "@/lib/axios";

export default function InviteModal({ workspaceId, onClose }) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInvite = async (e) => {
    if (e) e.preventDefault();
    if (!email.trim()) return toast.error("Please enter an email");

    try {
      setLoading(true);
      await api.post("/invite/invite", {
        email,
        workspaceId,
        role: "MEMBER",
      });

      toast.success(`Invite sent to ${email}`);
      onClose();
    } catch (err) {
      console.error(err);
      toast.error("Failed to send invite");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-150 flex items-center justify-center p-4">
      {/* Animated Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity animate-in fade-in duration-300" 
        onClick={onClose} 
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-md transform overflow-hidden rounded-3xl bg-white p-8 shadow-2xl border border-slate-100 animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 shadow-inner">
              <UserPlus className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-xl font-black text-slate-900 tracking-tight">Invite Member</h2>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Grow your team</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleInvite} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-black text-slate-700 ml-1">Email Address</label>
            <div className="relative group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors">
                <Mail className="h-4 w-4" />
              </div>
              <input
                type="email"
                placeholder="colleague@company.com"
                className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-slate-200 bg-slate-50/50 outline-none focus:bg-white focus:ring-4 focus:ring-blue-50 focus:border-blue-500 transition-all font-medium text-slate-900 placeholder:text-slate-400"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
              />
            </div>
            <p className="text-[10px] text-slate-400 ml-1 italic font-medium">
              They will receive an email to join this workspace.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 pt-2">
            <button 
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3.5 rounded-2xl font-bold text-slate-600 hover:bg-slate-50 transition-colors border border-transparent"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading || !email.trim()}
              className="flex-1 bg-slate-900 hover:bg-slate-800 disabled:bg-slate-100 disabled:text-slate-400 text-white font-bold py-3.5 rounded-2xl shadow-xl shadow-slate-200 transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                "Send Invite"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
