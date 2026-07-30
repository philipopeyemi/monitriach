"use client";

import React, { useState } from "react";
import Link from "next/link";
import { User, Settings, LogOut } from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";

export function UserMenu() {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuthStore();

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center space-x-3 rounded-lg p-1.5 hover:bg-slate-100 transition-colors"
      >
        <div className="h-8 w-8 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs font-semibold">
          {user?.full_name?.charAt(0) || "A"}
        </div>
        <div className="text-left hidden md:block">
          <p className="text-xs font-semibold text-slate-900 leading-tight">{user?.full_name || "Lead Architect"}</p>
          <p className="text-[10px] text-slate-500 leading-tight">{user?.email || "architect@monitriach.ai"}</p>
        </div>
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-56 rounded-xl border border-slate-200 bg-white p-2 shadow-modal z-50">
          <div className="px-3 py-2 border-b border-slate-100">
            <p className="text-xs font-semibold text-slate-900">{user?.full_name}</p>
            <p className="text-[10px] text-slate-500 truncate">{user?.email}</p>
          </div>
          <div className="py-1">
            <Link
              href="/settings"
              onClick={() => setOpen(false)}
              className="flex items-center space-x-2 px-3 py-2 text-xs text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <Settings className="h-3.5 w-3.5 text-slate-500" />
              <span>Workspace Settings</span>
            </Link>
            <button
              onClick={() => {
                setOpen(false);
                logout();
              }}
              className="flex w-full items-center space-x-2 px-3 py-2 text-xs text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <LogOut className="h-3.5 w-3.5 text-red-500" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
