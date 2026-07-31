"use client";
import { Users } from "lucide-react";
import { DashboardShell } from "@/components/layout/DashboardShell";
export default function LeadsPage() {
  return (
    <DashboardShell>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center space-x-2">
          <Users className="w-6 h-6 text-slate-700" />
          <span>Target Contacts & Leads</span>
        </h1>
        <p className="text-xs text-slate-500">Target contacts extracted from company website intelligence.</p>
      </div>
    </DashboardShell>
  );
}
