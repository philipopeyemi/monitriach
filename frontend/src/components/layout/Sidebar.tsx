"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  TrendingUp,
  Users,
  Send,
  Inbox,
  BrainCircuit,
  Sparkles,
  BarChart3,
  Bell,
  Settings,
  ShieldCheck,
  ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useUIStore } from "@/store/useUIStore";

const navItems = [
  { name: "Cockpit Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Revenue Opportunities", href: "/opportunities", icon: TrendingUp },
  { name: "Leads Engine", href: "/leads", icon: Users },
  { name: "Outreach Campaigns", href: "/campaigns", icon: Send },
  { name: "Unified Inbox", href: "/inbox", icon: Inbox },
  { name: "Company Intelligence", href: "/business-brain", icon: BrainCircuit },
  { name: "Intelligence Center", href: "/intelligence-center", icon: Sparkles },
  { name: "Analytics & Revenue", href: "/analytics", icon: BarChart3 },
  { name: "Notifications", href: "/notifications", icon: Bell },
  { name: "System Settings", href: "/settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const { activeWorkspace } = useUIStore();

  return (
    <aside className="w-64 border-r border-slate-200/80 bg-white flex flex-col h-screen sticky top-0 z-30">
      {/* Brand Header */}
      <div className="h-16 flex items-center px-6 border-b border-slate-100">
        <div className="flex items-center space-x-3">
          <div className="h-9 w-9 rounded-xl bg-slate-900 flex items-center justify-center text-white font-bold shadow-sm">
            M
          </div>
          <div>
            <span className="font-bold text-slate-900 tracking-tight text-base block leading-none">MONITRIACH</span>
            <span className="text-[10px] uppercase tracking-wider font-semibold text-slate-400">REVENUE OS</span>
          </div>
        </div>
      </div>

      {/* Workspace Selector */}
      <div className="p-4 border-b border-slate-100/80">
        <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 border border-slate-200/60 cursor-pointer hover:bg-slate-100/60 transition-colors">
          <div className="flex items-center space-x-2.5 overflow-hidden">
            <ShieldCheck className="h-4 w-4 text-emerald-600 flex-shrink-0" />
            <span className="text-xs font-semibold text-slate-800 truncate">{activeWorkspace}</span>
          </div>
          <ChevronRight className="h-3.5 w-3.5 text-slate-400 flex-shrink-0" />
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
          const Icon = item.icon;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all group",
                isActive
                  ? "bg-slate-900 text-white shadow-soft"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/80"
              )}
            >
              <Icon className={cn("h-4 w-4 transition-colors", isActive ? "text-white" : "text-slate-400 group-hover:text-slate-700")} />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer System Status */}
      <div className="p-4 border-t border-slate-100">
        <div className="flex items-center justify-between text-xs text-slate-500">
          <span className="flex items-center space-x-1.5">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>AI OS Active</span>
          </span>
          <span className="font-mono text-[10px] text-slate-400">v1.0.0</span>
        </div>
      </div>
    </aside>
  );
}
