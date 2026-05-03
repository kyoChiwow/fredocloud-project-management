"use client";

import { useNotificationStore } from "@/app/store/notification.store";
import api from "@/lib/axios";
import { Bell, CheckCheck, Info, Sparkles, X, UserPlus, Check, Trash2 } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import toast from "react-hot-toast";

export default function Navbar() {
  const { notifications, fetchNotifications, markAllAsRead } = useNotificationStore();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleAcceptInvite = async (inviteId) => {
  try {
    await api.post("/invite/accept", { inviteId });

    // remove notification locally
    useNotificationStore.setState((state) => ({
      notifications: state.notifications.filter(
        (n) => n.meta?.inviteId !== inviteId
      ),
    }));
  } catch (err) {
    console.error("Accept invite failed", err);
  }
};

  const handleRejectInvite = async (inviteId) => {
  try {
    await api.patch("/invite/reject", { inviteId });

    useNotificationStore.setState((state) => ({
      notifications: state.notifications.filter(
        (n) => n.meta?.inviteId !== inviteId
      ),
    }));
  } catch (err) {
    console.error("Reject invite failed", err);
  }
};

  const unread = notifications.filter((n) => !n.isRead).length;

  return (
    <nav className="h-16 bg-white/80 backdrop-blur-md border-b border-slate-200 px-8 flex items-center justify-between sticky top-0 z-50">
      {/* Brand */}
      <div className="flex items-center gap-2 group cursor-pointer">
        <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-200 group-hover:rotate-6 transition-transform">
          <Sparkles className="h-5 w-5 text-white" />
        </div>
        <h1 className="font-black text-xl text-slate-900 tracking-tighter">
          PackN<span className="text-blue-600">Go</span>
        </h1>
      </div>

      <div className="flex items-center gap-6">
        <div className="relative" ref={dropdownRef}>
          <button 
            onClick={() => setOpen(!open)} 
            className={`p-2 rounded-full transition-all relative ${open ? 'bg-slate-100 text-blue-600' : 'text-slate-500 hover:bg-slate-50'}`}
          >
            <Bell className={`h-6 w-6 ${unread > 0 ? 'animate-pulse' : ''}`} />
            {unread > 0 && (
              <span className="absolute top-1.5 right-1.5 h-4 w-4 text-[10px] font-bold bg-red-500 text-white rounded-full flex items-center justify-center border-2 border-white ring-1 ring-red-100">
                {unread}
              </span>
            )}
          </button>

          {open && (
            <div className="absolute right-0 mt-3 w-96 bg-white shadow-2xl shadow-slate-200 border border-slate-100 rounded-2xl overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-200">
              <div className="px-5 py-4 border-b border-slate-50 flex items-center justify-between bg-slate-50/50">
                <h3 className="font-bold text-slate-900 flex items-center gap-2">
                  Inbox {unread > 0 && <span className="bg-blue-100 text-blue-600 text-[10px] px-2 py-0.5 rounded-full">{unread} new</span>}
                </h3>
                <button onClick={() => markAllAsRead?.()} className="text-[11px] font-bold text-blue-600 hover:text-blue-700 uppercase tracking-wider">
                  Clear all
                </button>
              </div>

              <div className="max-h-112.5 overflow-y-auto overflow-x-hidden">
                {notifications.length === 0 ? (
                  <div className="py-12 flex flex-col items-center justify-center text-slate-400">
                    <Bell className="h-12 w-12 text-slate-100 mb-3" />
                    <p className="text-sm font-medium">All caught up!</p>
                  </div>
                ) : (
                  notifications.map((n) => (
                    <div
                      key={n.id}
                      className={`px-5 py-4 border-b border-slate-50 last:border-0 hover:bg-slate-50/80 transition-colors flex gap-4 relative ${!n.isRead ? 'bg-blue-50/30' : ''}`}
                    >
                      {!n.isRead && <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-600" />}
                      
                      <div className={`h-10 w-10 rounded-xl flex shrink-0 items-center justify-center ${n.type === 'INVITE' ? 'bg-amber-100 text-amber-600' : !n.isRead ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-400'}`}>
                        {n.type === 'INVITE' ? <UserPlus className="h-5 w-5" /> : <Info className="h-5 w-5" />}
                      </div>

                      <div className="flex-1 space-y-2">
                        <div className="space-y-1">
                          <p className={`text-sm leading-snug ${!n.isRead ? 'text-slate-900 font-bold' : 'text-slate-600 font-medium'}`}>
                            {n.message}
                          </p>
                          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest flex items-center gap-1">
                            <CheckCheck className="h-3 w-3" /> Just now
                          </p>
                        </div>

                        {/* BEAUTIFIED INVITE ACTIONS */}
                        {n.type === "INVITE" && (
                          <div className="flex gap-2 pt-1">
                            <button
                              onClick={(e) => { e.stopPropagation(); handleAcceptInvite(n.meta?.inviteId); }}
                              className="flex-1 flex items-center justify-center gap-1.5 px-3 py-1.5 text-[11px] font-black uppercase tracking-wider bg-slate-900 text-white rounded-lg hover:bg-blue-600 transition-all active:scale-95"
                            >
                              <Check className="h-3 w-3" />
                              Accept
                            </button>

                            <button
                              onClick={(e) => { e.stopPropagation(); handleRejectInvite(n.meta?.inviteId); }}
                              className="px-3 py-1.5 text-[11px] font-black uppercase tracking-wider bg-white text-slate-400 border border-slate-200 rounded-lg hover:text-red-500 hover:border-red-100 hover:bg-red-50 transition-all"
                            >
                              <Trash2 className="h-3 w-3" />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>

              <button className="w-full py-3 text-center text-xs font-bold text-slate-500 bg-slate-50/50 hover:bg-slate-100 border-t border-slate-100">
                View all notifications
              </button>
            </div>
          )}
        </div>

        <div className="h-9 w-9 rounded-full bg-linear-to-tr from-slate-200 to-slate-100 border border-slate-200 flex items-center justify-center cursor-pointer hover:ring-4 hover:ring-slate-50 transition-all shadow-sm">
          <span className="text-xs font-bold text-slate-600">JD</span>
        </div>
      </div>
    </nav>
  );
}
