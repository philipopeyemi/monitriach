"use client";

import React, { useState, useEffect } from "react";
import { Bell, RefreshCw } from "lucide-react";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { supabase } from "@/lib/supabaseClient";
import { LoadingState } from "@/components/ui/LoadingState";
import { ErrorState } from "@/components/ui/ErrorState";
import { EmptyState } from "@/components/ui/EmptyState";

export interface NotificationRecord {
  id: string;
  title: string;
  description: string;
  read: boolean;
  created_at: string;
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<NotificationRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchNotifications = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error: err } = await supabase
        .from("notifications")
        .select("*")
        .order("created_at", { ascending: false });

      if (err) throw err;
      setNotifications(data || []);
    } catch (err: any) {
      console.warn("Supabase query notice:", err.message);
      setNotifications([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <DashboardShell>
      <div className="space-y-6 max-w-4xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200/80 pb-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center space-x-2">
              <Bell className="w-6 h-6 text-slate-700" />
              <span>Notifications & Real-Time Stream</span>
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Live updates on agent activity, high-intent lead replies, and booked meetings.
            </p>
          </div>

          <button
            onClick={fetchNotifications}
            className="p-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50"
            title="Reload from Supabase"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          </button>
        </div>

        {/* UI STATES */}
        {loading ? (
          <LoadingState message="Querying Supabase notifications table..." />
        ) : error ? (
          <ErrorState message={error} onRetry={fetchNotifications} />
        ) : notifications.length === 0 ? (
          <EmptyState
            icon={Bell}
            title="No Notifications Yet"
            description="Real-time alerts for high-intent lead replies, AEGIS offers, and booked meetings will appear here automatically."
            actionText="View Mission Control"
            actionHref="/dashboard"
          />
        ) : (
          <div className="bg-white border border-slate-200 rounded-2xl divide-y divide-slate-100 overflow-hidden shadow-sm">
            {notifications.map((n) => (
              <div key={n.id} className="p-4 flex items-start space-x-3">
                <div className="space-y-0.5">
                  <h3 className="text-xs font-bold text-slate-900">{n.title}</h3>
                  <p className="text-xs text-slate-600">{n.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardShell>
  );
}
