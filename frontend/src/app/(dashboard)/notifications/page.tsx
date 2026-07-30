"use client";

import React from "react";
import { Bell, Calendar, Mail, AlertTriangle, CheckCircle2, Info, ShieldAlert } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function NotificationsPage() {
  const notificationsList = [
    { title: "Meeting Booked", desc: "John Doe (Acme Corp) scheduled a demo for tomorrow at 2:00 PM EST.", type: "Meeting Booked", time: "10 minutes ago", icon: Calendar, color: "text-emerald-600", bg: "bg-emerald-50" },
    { title: "Campaign Finished", desc: "Outbound Q3 Tech Leaders outreach sequence has completed all 5 steps.", type: "Campaign Finished", time: "1 hour ago", icon: CheckCircle2, color: "text-blue-600", bg: "bg-blue-50" },
    { title: "SES Warning Threshold", desc: "Primary AWS SES domain bounce rate reached 2.1%. Deliverability Engine paused sending temporarily.", type: "SES Warning", time: "3 hours ago", icon: AlertTriangle, color: "text-amber-600", bg: "bg-amber-50" },
    { title: "Research Failed", desc: "Web crawler encountered Cloudflare anti-bot lock on target domain target-corp.io.", type: "Research Failed", time: "5 hours ago", icon: ShieldAlert, color: "text-red-600", bg: "bg-red-50" },
    { title: "Reply Received", desc: "Amanda Smith (Vortex Labs) replied to email variant #2: 'Can you send pricing?'", type: "Reply Received", time: "6 hours ago", icon: Mail, color: "text-purple-600", bg: "bg-purple-50" },
    { title: "API Limit Reached", desc: "OpenRouter rate limit threshold hit for model anthropic/claude-3.5-sonnet. Falling back to Groq.", type: "API Limit", time: "Yesterday", icon: Info, color: "text-slate-700", bg: "bg-slate-100" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200/80 pb-6">
        <div>
          <div className="flex items-center space-x-2">
            <Bell className="h-6 w-6 text-slate-900" />
            <h1 className="text-2xl font-bold text-slate-900">Notification Center</h1>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            System alerts, campaign completions, deliverability warnings, and meeting confirmations
          </p>
        </div>
      </div>

      <Card className="shadow-card border-slate-200">
        <CardHeader className="pb-4">
          <CardTitle className="text-base font-semibold">Activity Alerts Log</CardTitle>
        </CardHeader>
        <CardContent className="divide-y divide-slate-100 p-0">
          {notificationsList.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="p-4 flex items-start space-x-4 hover:bg-slate-50 transition-colors">
                <div className={`p-2.5 rounded-xl ${item.bg} ${item.color}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-semibold text-slate-900">{item.title}</h4>
                    <span className="text-xs text-slate-400">{item.time}</span>
                  </div>
                  <p className="text-xs text-slate-600">{item.desc}</p>
                  <Badge variant="secondary" className="mt-2 text-[10px]">
                    {item.type}
                  </Badge>
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
}
