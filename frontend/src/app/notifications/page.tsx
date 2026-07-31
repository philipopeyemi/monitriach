"use client";

import React, { useState } from "react";
import { 
  Bell, 
  CheckCircle2, 
  Sparkles, 
  Mail, 
  Calendar, 
  AlertTriangle,
  Check
} from "lucide-react";
import { DashboardShell } from "@/components/layout/DashboardShell";

export interface NotificationItem {
  id: string;
  type: "REPLY" | "MEETING" | "SYSTEM" | "ALERT";
  title: string;
  desc: string;
  time: string;
  read: boolean;
}

const SEEDED_NOTIFICATIONS: NotificationItem[] = [
  { id: "notif-1", type: "REPLY", title: "High-Intent Reply Received", desc: "Patrick Collison (Stripe, Inc.) requested a 2-page architecture summary.", time: "10 mins ago", read: false },
  { id: "notif-2", type: "MEETING", title: "Executive Demo Booked", desc: "Paul Copplestone (Supabase, Inc.) scheduled a demo for Tuesday at 10 AM PT.", time: "1 hour ago", read: false },
  { id: "notif-3", type: "SYSTEM", title: "AEGIS Offer Formulated", desc: "Formulated custom proposal for Open AI ($250,000 ARR opportunity).", time: "3 hours ago", read: true },
  { id: "notif-4", type: "ALERT", title: "SES Deliverability Clean", desc: "100% email deliverability score maintained across all active domains.", time: "1 day ago", read: true },
];

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<NotificationItem[]>(SEEDED_NOTIFICATIONS);

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  const getIcon = (type: NotificationItem["type"]) => {
    switch (type) {
      case "REPLY": return <Mail className="w-4 h-4 text-purple-600" />;
      case "MEETING": return <Calendar className="w-4 h-4 text-emerald-600" />;
      case "ALERT": return <AlertTriangle className="w-4 h-4 text-amber-600" />;
      default: return <Sparkles className="w-4 h-4 text-blue-600" />;
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
              <span>Notifications & Real-Time Intelligence Stream</span>
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Live updates on agent activity, high-intent lead replies, and booked meetings.
            </p>
          </div>

          <button
            onClick={markAllAsRead}
            className="px-3.5 py-2 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-700 hover:bg-slate-50 flex items-center space-x-1.5"
          >
            <Check className="w-3.5 h-3.5" />
            <span>Mark All as Read</span>
          </button>
        </div>

        {/* Notifications List */}
        <div className="bg-white border border-slate-200 rounded-2xl divide-y divide-slate-100 overflow-hidden shadow-sm">
          {notifications.map((n) => (
            <div
              key={n.id}
              className={`p-4 flex items-start space-x-4 transition-colors ${
                n.read ? "bg-white" : "bg-slate-50/70 font-medium"
              }`}
            >
              <div className="p-2.5 rounded-xl bg-slate-100 border border-slate-200/60 mt-0.5">
                {getIcon(n.type)}
              </div>

              <div className="flex-1 space-y-0.5">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold text-slate-900">{n.title}</h3>
                  <span className="text-[10px] font-mono text-slate-400">{n.time}</span>
                </div>
                <p className="text-xs text-slate-600">{n.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardShell>
  );
}
