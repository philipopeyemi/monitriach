"use client";
import { MessageSquare } from "lucide-react";
import { DashboardShell } from "@/components/layout/DashboardShell";
export default function InboxPage() {
  return (
    <DashboardShell>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center space-x-2">
          <MessageSquare className="w-6 h-6 text-slate-700" />
          <span>Unified Reply Inbox</span>
        </h1>
        <p className="text-xs text-slate-500">Categorizes incoming replies & intent sentiment automatically.</p>
      </div>
    </DashboardShell>
  );
}
