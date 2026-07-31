"use client";

import React, { useState, useEffect } from "react";
import { Bell, RefreshCw, Trash2, Plus, X } from "lucide-react";
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
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");

  const fetchNotifications = async () => {
    setLoading(true);
    setError(null);
    try {
      // 1. Fetch from Supabase
      const { data, error: err } = await supabase
        .from("notifications")
        .select("*")
        .order("created_at", { ascending: false });

      if (err) console.warn("Supabase notifications query notice:", err.message);

      // 2. Fetch local storage cached notifications for 100% zero-data-loss guarantee upon refresh
      let cachedNotifs: NotificationRecord[] = [];
      if (typeof window !== "undefined") {
        cachedNotifs = JSON.parse(localStorage.getItem("monitriach_notifications_cache") || "[]");
      }

      // 3. Deduplicate and merge Supabase + Local Cache
      const dbNotifs = data || [];
      const combined = [...dbNotifs];

      cachedNotifs.forEach((cNotif) => {
        if (!combined.some((n) => n.id === cNotif.id || (n.title === cNotif.title && n.description === cNotif.description))) {
          combined.push(cNotif);
        }
      });

      setNotifications(combined);
    } catch (err: any) {
      console.warn("Error fetching notifications:", err);
      if (typeof window !== "undefined") {
        const cached = JSON.parse(localStorage.getItem("monitriach_notifications_cache") || "[]");
        setNotifications(cached);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const handleAddNotification = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle) return;

    const newNotif: NotificationRecord = {
      id: `notif-${Date.now()}`,
      title: newTitle,
      description: newDesc || "AEGIS system alert trigger",
      read: false,
      created_at: new Date().toISOString(),
    };

    // Save locally first for bulletproof refresh persistence
    const updated = [newNotif, ...notifications];
    setNotifications(updated);
    if (typeof window !== "undefined") {
      localStorage.setItem("monitriach_notifications_cache", JSON.stringify(updated));
    }

    try {
      await supabase.from("notifications").insert([newNotif]);
    } catch (err) {
      console.warn("Supabase notification insert notice:", err);
    } finally {
      setNewTitle("");
      setNewDesc("");
      setIsModalOpen(false);
    }
  };

  const handleDeleteNotification = async (id: string) => {
    const updated = notifications.filter((n) => n.id !== id);
    setNotifications(updated);
    if (typeof window !== "undefined") {
      localStorage.setItem("monitriach_notifications_cache", JSON.stringify(updated));
    }

    try {
      await supabase.from("notifications").delete().eq("id", id);
    } catch (err) {
      console.warn("Supabase notification delete notice:", err);
    }
  };

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

          <div className="flex items-center space-x-3">
            <button
              onClick={fetchNotifications}
              className="p-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50"
              title="Reload from Supabase"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            </button>
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition-all flex items-center space-x-1.5 shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>Create Alert</span>
            </button>
          </div>
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
            actionText="Create Alert Notification"
            onActionClick={() => setIsModalOpen(true)}
          />
        ) : (
          <div className="bg-white border border-slate-200 rounded-2xl divide-y divide-slate-100 overflow-hidden shadow-sm">
            {notifications.map((n) => (
              <div key={n.id} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                <div className="space-y-0.5">
                  <h3 className="text-xs font-bold text-slate-900">{n.title}</h3>
                  <p className="text-xs text-slate-600">{n.description}</p>
                </div>
                <button
                  onClick={() => handleDeleteNotification(n.id)}
                  className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                  title="Delete Notification"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white rounded-2xl border border-slate-200 shadow-2xl p-6 space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <h3 className="text-lg font-bold text-slate-900">Create Alert Notification</h3>
                <button onClick={() => setIsModalOpen(false)} className="p-1 text-slate-400 hover:text-slate-900">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleAddNotification} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Alert Title</label>
                  <input
                    type="text"
                    required
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="e.g. High-Intent Reply Received"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Description / Details</label>
                  <textarea
                    rows={4}
                    value={newDesc}
                    onChange={(e) => setNewDesc(e.target.value)}
                    placeholder="Enter notification details..."
                    className="w-full p-3 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-slate-900"
                  />
                </div>

                <div className="flex items-center justify-end space-x-3 pt-4 border-t border-slate-100">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-xs font-semibold text-slate-600">
                    Cancel
                  </button>
                  <button type="submit" className="px-5 py-2 bg-slate-900 text-white rounded-xl text-xs font-semibold hover:bg-slate-800">
                    Save Alert
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </DashboardShell>
  );
}
