"use client";

import { useParams, useRouter, usePathname } from "next/navigation";
import { useAuthStore } from "@/app/store/auth.store";
import { 
  Target, 
  Megaphone, 
  ChevronLeft, 
  Settings, 
  Users,
  Layers,
  LogOut
} from "lucide-react";
import { HammerIcon } from "lucide-react";
import { ChartArea } from "lucide-react";

export default function WorkspaceLayout({ children }) {
  const { id } = useParams();
  const router = useRouter();
  const pathname = usePathname();
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = async () => {
    try {
      await logout();
      router.push("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const navItems = [
    {
      name: "Goals",
      path: `/workspace/${id}/goals`,
      icon: <Target className="h-4 w-4" />,
    },
    {
      name: "Announcements",
      path: `/workspace/${id}/announcements`,
      icon: <Megaphone className="h-4 w-4" />,
    },
    {
      name: "Actions",
      path: `/workspace/${id}/actions`,
      icon: <HammerIcon className="h-4 w-4" />,
    },
    {
      name: "Analytics",
      path: `/workspace/${id}/analytics`,
      icon: <ChartArea className="h-4 w-4" />,
    },
  ];

  return (
    <div className="flex min-h-screen bg-[#f8fafc]">
      
      {/* Sidebar */}
      <aside className="w-72 bg-white border-r border-slate-200 flex flex-col sticky top-0 h-screen">
        
        {/* Workspace Header */}
        <div className="p-6">
          <button 
            onClick={() => router.push('/workspaces')}
            className="group flex items-center gap-2 text-slate-400 hover:text-slate-900 transition-colors mb-6"
          >
            <ChevronLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            <span className="text-xs font-bold uppercase tracking-widest">All Workspaces</span>
          </button>

          <div className="flex items-center gap-3 px-2">
            <div className="h-10 w-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-200">
              <Layers className="h-6 w-6" />
            </div>
            <div>
              <h2 className="font-black text-slate-900 tracking-tight leading-none">Workspace</h2>
              <span className="text-[10px] font-bold text-blue-600 uppercase tracking-tighter">Pro Plan</span>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 space-y-1">
          <div className="px-4 py-2">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Menu</span>
          </div>
          
          {navItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <button
                key={item.name}
                onClick={() => router.push(item.path)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all duration-200 ${
                  isActive 
                    ? "bg-blue-50 text-blue-600 shadow-sm ring-1 ring-blue-100" 
                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <span className={`${isActive ? "text-blue-600" : "text-slate-400"}`}>
                  {item.icon}
                </span>
                {item.name}
                {isActive && <div className="ml-auto h-1.5 w-1.5 rounded-full bg-blue-600" />}
              </button>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 mt-auto border-t border-slate-100 space-y-1">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-500 hover:bg-slate-50 hover:text-slate-900 transition-all font-bold text-sm">
            <Users className="h-4 w-4" />
            Members
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-500 hover:bg-slate-50 hover:text-slate-900 transition-all font-bold text-sm">
            <Settings className="h-4 w-4" />
            Settings
          </button>
          
          {/* Logout Button */}
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 hover:text-red-600 transition-all font-bold text-sm mt-2"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col">
        <header className="h-16 border-b border-slate-200 bg-white/80 backdrop-blur-md sticky top-0 z-30 px-8 flex items-center justify-end">
          <div className="h-8 w-8 rounded-full bg-slate-200 border-2 border-white shadow-sm" />
        </header>

        <div className="flex-1 overflow-y-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
