"use client";
import { Send } from "lucide-react";
import { DashboardShell } from "@/components/layout/DashboardShell";
export default function CampaignsPage() {
  return (
    <DashboardShell>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center space-x-2">
          <Send className="w-6 h-6 text-slate-700" />
          <span>Outbound Campaigns</span>
        </h1>
        <p className="text-xs text-slate-500">AEGIS automated multi-channel campaign sequences.</p>
      </div>
    </DashboardShell>
  );
}
