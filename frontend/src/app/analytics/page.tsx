"use client";
import { BarChart3 } from "lucide-react";
import { DashboardShell } from "@/components/layout/DashboardShell";
export default function AnalyticsPage() {
  return (
    <DashboardShell>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center space-x-2">
          <BarChart3 className="w-6 h-6 text-slate-700" />
          <span>Full-Funnel Analytics</span>
        </h1>
        <p className="text-xs text-slate-500">Pipeline conversion velocity and closed-won revenue metrics.</p>
      </div>
    </DashboardShell>
  );
}
