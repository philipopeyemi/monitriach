"use client";

import Link from "next/link";
import { 
  Building2, 
  Search, 
  Send, 
  MessageSquare, 
  Calendar, 
  TrendingUp, 
  Cpu, 
  CheckSquare, 
  Trophy, 
  Bell,
  Sparkles,
  Clock
} from "lucide-react";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { useAuthStore } from "@/store/useAuthStore";

export default function CockpitDashboard() {
  const { organization, workspace } = useAuthStore();

  const widgets = [
    { label: "Revenue Opportunities", value: "148", change: "+12%", icon: Building2, href: "/opportunities" },
    { label: "Research Queue", value: "24", change: "In Progress", icon: Search, href: "/opportunities" },
    { label: "Campaign Queue", value: "86", change: "Scheduled", icon: Send, href: "/campaigns" },
    { label: "Replies Waiting", value: "9", change: "High Intent", icon: MessageSquare, href: "/inbox" },
    { label: "Meetings Today", value: "3", change: "Confirmed", icon: Calendar, href: "/inbox" },
    { label: "Revenue Pipeline", value: "$420,000", change: "+18%", icon: TrendingUp, href: "/analytics" },
    { label: "AI Executive Activity", value: "1,240", change: "Actions", icon: Cpu, href: "/intelligence-center" },
    { label: "Today's Tasks", value: "7", change: "Pending", icon: CheckSquare, href: "/opportunities" },
    { label: "Recent Wins", value: "4 Deals", change: "This Week", icon: Trophy, href: "/analytics" },
    { label: "Notifications", value: "12", change: "Unread", icon: Bell, href: "/notifications" },
  ];

  const tasks = [
    { id: 1, title: "Review AEGIS generated offer for Stripe, Inc.", type: "Review Offer", priority: "High", time: "10 mins ago" },
    { id: 2, title: "Approve 45 outreach emails scheduled for Vercel team", type: "Approve Campaign", priority: "Medium", time: "25 mins ago" },
    { id: 3, title: "Confirm meeting invite with VP Engineering at Linear", type: "Confirm Meeting", priority: "High", time: "1 hour ago" },
  ];

  return (
    <DashboardShell>
      <div className="space-y-8">
        {/* Top Cockpit Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200/80 pb-6">
          <div>
            <div className="flex items-center space-x-2 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
              <span>{organization?.name || "Acme OS"}</span>
              <span>•</span>
              <span className="text-slate-900">{workspace?.name || "Production Workspace"}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              What should I do today?
            </h1>
          </div>

          <div className="flex items-center space-x-3">
            <Link 
              href="/intelligence-center"
              className="px-4 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-medium hover:bg-slate-800 transition-all flex items-center space-x-2 shadow-sm"
            >
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>AI Executive Status</span>
            </Link>
          </div>
        </div>

        {/* 10 Top Metric Widgets */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {widgets.map((widget, i) => (
            <Link 
              key={i} 
              href={widget.href}
              className="p-4 rounded-xl bg-white border border-slate-200/80 hover:border-slate-300 shadow-sm hover:shadow transition-all group"
            >
              <div className="flex items-center justify-between text-slate-500 mb-2">
                <widget.icon className="w-4 h-4 text-slate-600 group-hover:text-slate-900 transition-colors" />
                <span className="text-[11px] font-medium px-1.5 py-0.5 rounded bg-slate-100 text-slate-600">
                  {widget.change}
                </span>
              </div>
              <div className="text-2xl font-bold text-slate-900 tracking-tight mb-1">
                {widget.value}
              </div>
              <div className="text-xs font-medium text-slate-500 truncate">
                {widget.label}
              </div>
            </Link>
          ))}
        </div>

        {/* Cockpit Action Queue & Activity Feed */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Priority Task Queue */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-900 flex items-center space-x-2">
                <CheckSquare className="w-5 h-5 text-slate-700" />
                <span>Today's Priority Action Queue</span>
              </h2>
              <span className="text-xs font-medium text-slate-500">3 Requires Attention</span>
            </div>

            <div className="space-y-3">
              {tasks.map((task) => (
                <div 
                  key={task.id} 
                  className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm flex items-center justify-between hover:border-slate-300 transition-all"
                >
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-800">
                        {task.type}
                      </span>
                      <span className={`text-[11px] font-bold ${task.priority === "High" ? "text-amber-600" : "text-slate-500"}`}>
                        {task.priority} Priority
                      </span>
                    </div>
                    <p className="text-sm font-semibold text-slate-900">{task.title}</p>
                    <div className="flex items-center space-x-1 text-xs text-slate-400">
                      <Clock className="w-3 h-3" />
                      <span>{task.time}</span>
                    </div>
                  </div>

                  <button className="px-3.5 py-1.5 rounded-lg bg-slate-900 text-white text-xs font-medium hover:bg-slate-800 transition-all">
                    Review
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* AI Executive Activity Stream */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-900 flex items-center space-x-2">
                <Cpu className="w-5 h-5 text-slate-700" />
                <span>AI Activity Stream</span>
              </h2>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            </div>

            <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm space-y-4 text-xs">
              <div className="border-l-2 border-emerald-500 pl-3 py-1 space-y-1">
                <p className="font-semibold text-slate-900">RESEARCH_COMPLETED</p>
                <p className="text-slate-600">Crawled domain <span className="font-mono text-slate-800">stripe.com</span> & extracted 4 pain points.</p>
                <span className="text-[10px] text-slate-400">2 mins ago</span>
              </div>

              <div className="border-l-2 border-blue-500 pl-3 py-1 space-y-1">
                <p className="font-semibold text-slate-900">OFFER_GENERATED</p>
                <p className="text-slate-600">AEGIS mapped "Enterprise AI Framework" for Vercel VP Engineering.</p>
                <span className="text-[10px] text-slate-400">12 mins ago</span>
              </div>

              <div className="border-l-2 border-purple-500 pl-3 py-1 space-y-1">
                <p className="font-semibold text-slate-900">EMAIL_SENT</p>
                <p className="text-slate-600">Amazon SES dispatched email to Linear CTO (Quality Score: 98%).</p>
                <span className="text-[10px] text-slate-400">28 mins ago</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
