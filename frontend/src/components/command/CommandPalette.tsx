"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search, UserPlus, Play, Sparkles, Mail, Building, HelpCircle, Settings, X } from "lucide-react";
import { useUIStore } from "@/store/useUIStore";

export function CommandPalette() {
  const router = useRouter();
  const { commandPaletteOpen, setCommandPaletteOpen } = useUIStore();
  const [query, setQuery] = React.useState("");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setCommandPaletteOpen(!commandPaletteOpen);
      }
      if (e.key === "Escape" && commandPaletteOpen) {
        setCommandPaletteOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [commandPaletteOpen, setCommandPaletteOpen]);

  if (!commandPaletteOpen) return null;

  const actions = [
    { icon: <UserPlus className="h-4 w-4 text-emerald-500" />, label: "Upload New Leads (CSV)", category: "Quick Actions", href: "/leads" },
    { icon: <Play className="h-4 w-4 text-blue-500" />, label: "Create Campaign", category: "Quick Actions", href: "/campaigns" },
    { icon: <Sparkles className="h-4 w-4 text-purple-500" />, label: "Run Research Agent", category: "Intelligence", href: "/intelligence-center" },
    { icon: <Mail className="h-4 w-4 text-amber-500" />, label: "Compose Outreach Email", category: "Quick Actions", href: "/inbox" },
    { icon: <Building className="h-4 w-4 text-slate-500" />, label: "Add Knowledge Asset to Business Brain", category: "Business Brain", href: "/business-brain" },
    { icon: <Settings className="h-4 w-4 text-slate-500" />, label: "Configure AI Providers", category: "Settings", href: "/settings" },
  ];

  const filtered = actions.filter((a) => a.label.toLowerCase().includes(query.toLowerCase()));

  const handleSelect = (href: string) => {
    setCommandPaletteOpen(false);
    setQuery("");
    router.push(href);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-slate-900/40 p-4 pt-[15vh] backdrop-blur-xs transition-opacity">
      <div className="relative w-full max-w-xl overflow-hidden rounded-xl border border-slate-200 bg-white shadow-2xl">
        <div className="flex items-center border-b border-slate-100 px-4 py-3">
          <Search className="mr-3 h-5 w-5 text-slate-400" />
          <input
            type="text"
            placeholder="Type a command or search across MONITRIACH CORE... (Esc to close)"
            className="flex-1 bg-transparent text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
          />
          <button onClick={() => setCommandPaletteOpen(false)} className="rounded p-1 text-slate-400 hover:bg-slate-100">
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="max-h-[320px] overflow-y-auto p-2">
          {filtered.length === 0 ? (
            <div className="p-4 text-center text-sm text-slate-500">No matching commands found.</div>
          ) : (
            filtered.map((action, i) => (
              <button
                key={i}
                onClick={() => handleSelect(action.href)}
                className="flex w-full items-center rounded-lg px-3 py-2.5 text-left text-sm text-slate-700 hover:bg-slate-100 transition-colors"
              >
                <div className="mr-3">{action.icon}</div>
                <div className="flex-1 font-medium text-slate-900">{action.label}</div>
                <span className="text-xs text-slate-400">{action.category}</span>
              </button>
            ))
          )}
        </div>

        <div className="flex items-center justify-between border-t border-slate-100 bg-slate-50 px-4 py-2 text-xs text-slate-400">
          <span>Navigate with arrows</span>
          <span>Press Enter to select</span>
        </div>
      </div>
    </div>
  );
}
