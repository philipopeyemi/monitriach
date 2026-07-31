"use client";
import { Bell } from "lucide-react";
import { DashboardShell } from "@/components/layout/DashboardShell";
export default function NotificationsPage() {
  return (
    <DashboardShell>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center space-x-2">
          <Bell className="w-6 h-6 text-slate-700" />
          <span>Notifications</span>
        </h1>
        <p className="text-xs text-slate-500">Real-time alerts for high-intent replies & booked meetings.</p>
      </div>
    </DashboardShell>
  );
}
