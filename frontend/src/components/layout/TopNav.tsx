"use client";

import React from "react";
import { Search, Command } from "lucide-react";
import { useUIStore } from "@/store/useUIStore";
import { NotificationPopover } from "@/components/layout/NotificationPopover";
import { UserMenu } from "@/components/layout/UserMenu";

export function TopNav() {
  const { toggleCommandPalette } = useUIStore();

  return (
    <header className="h-16 border-b border-slate-200/80 bg-white px-8 flex items-center justify-between sticky top-0 z-20 shadow-soft">
      {/* Search / Command Palette Trigger */}
      <button
        onClick={toggleCommandPalette}
        className="flex items-center space-x-3 text-slate-400 bg-slate-50 border border-slate-200/80 px-3.5 py-1.5 rounded-lg hover:bg-slate-100/80 transition-colors w-72 justify-between"
      >
        <div className="flex items-center space-x-2">
          <Search className="h-4 w-4 text-slate-400" />
          <span className="text-xs font-normal">Search or command...</span>
        </div>
        <kbd className="inline-flex items-center gap-0.5 rounded border border-slate-200 bg-white px-1.5 font-mono text-[10px] font-medium text-slate-500 shadow-2xs">
          <Command className="h-2.5 w-2.5" /> K
        </kbd>
      </button>

      {/* Right Header Actions */}
      <div className="flex items-center space-x-4">
        <NotificationPopover />
        <div className="h-4 w-px bg-slate-200" />
        <UserMenu />
      </div>
    </header>
  );
}
