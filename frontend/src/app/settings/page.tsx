"use client";
import { Settings } from "lucide-react";
import { DashboardShell } from "@/components/layout/DashboardShell";
export default function SettingsPage() {
  return (
    <DashboardShell>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center space-x-2">
          <Settings className="w-6 h-6 text-slate-700" />
          <span>Organization & Workspace Settings</span>
        </h1>
        <p className="text-xs text-slate-500">Configure team members, Supabase integration, and SES domains.</p>
      </div>
    </DashboardShell>
  );
}
