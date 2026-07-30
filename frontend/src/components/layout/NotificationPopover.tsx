"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Bell, CheckCircle2, AlertTriangle, Info, Calendar, Mail } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function NotificationPopover() {
  const [open, setOpen] = useState(false);

  const sampleNotifications = [
    { id: "1", title: "Meeting Booked", desc: "John Doe (Acme Corp) scheduled a demo for tomorrow.", type: "success", time: "10m ago" },
    { id: "2", title: "Campaign Finished", desc: "Outbound Q3 Tech Leaders outreach has completed.", type: "info", time: "1h ago" },
    { id: "3", title: "SES Warning", desc: "Bounce rate threshold approaching 2.1%.", type: "warning", time: "3h ago" },
  ];

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="relative rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900 transition-colors"
      >
        <Bell className="h-5 w-5" />
        <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-emerald-500 ring-2 ring-white" />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-80 rounded-xl border border-slate-200 bg-white p-3 shadow-modal z-50">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2.5 px-1">
            <h4 className="text-sm font-semibold text-slate-900">Notifications</h4>
            <Badge variant="secondary">3 New</Badge>
          </div>

          <div className="divide-y divide-slate-100 max-h-72 overflow-y-auto my-2">
            {sampleNotifications.map((item) => (
              <div key={item.id} className="py-2.5 px-1 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer">
                <div className="flex items-start space-x-2.5">
                  {item.type === "success" && <Calendar className="h-4 w-4 text-emerald-600 mt-0.5" />}
                  {item.type === "info" && <Mail className="h-4 w-4 text-blue-600 mt-0.5" />}
                  {item.type === "warning" && <AlertTriangle className="h-4 w-4 text-amber-600 mt-0.5" />}
                  <div className="flex-1">
                    <p className="text-xs font-semibold text-slate-900">{item.title}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{item.desc}</p>
                    <span className="text-[10px] text-slate-400 mt-1 block">{item.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-slate-100 pt-2 text-center">
            <Link
              href="/notifications"
              onClick={() => setOpen(false)}
              className="text-xs font-medium text-slate-900 hover:underline"
            >
              View Notification Center →
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
