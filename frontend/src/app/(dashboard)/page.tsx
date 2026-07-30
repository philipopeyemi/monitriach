"use client";

import React from "react";
import {
  CheckSquare,
  Send,
  Users,
  Search,
  Mail,
  MessageSquare,
  Calendar,
  TrendingUp,
  Activity,
  Trophy,
  ArrowUpRight,
  Sparkles
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function CockpitDashboardPage() {
  const topWidgets = [
    { title: "Today's Tasks", value: "8 Pending", icon: CheckSquare, color: "text-blue-600", desc: "2 High priority" },
    { title: "Active Campaigns", value: "12 Live", icon: Send, color: "text-emerald-600", desc: "4,250 Active prospects" },
    { title: "Leads Waiting", value: "142 Unassigned", icon: Users, color: "text-purple-600", desc: "Awaiting AEGIS review" },
    { title: "Research Queue", value: "35 Companies", icon: Search, color: "text-amber-600", desc: "Crawling in background" },
    { title: "Emails Scheduled Today", value: "850 Outbound", icon: Mail, color: "text-indigo-600", desc: "98.4% Health index" },
    { title: "Replies Waiting", value: "14 Unread", icon: MessageSquare, color: "text-pink-600", desc: "3 Intent positive" },
    { title: "Meetings Today", value: "3 Demo Calls", icon: Calendar, color: "text-teal-600", desc: "Next: 2:00 PM EST" },
    { title: "Revenue Pipeline", value: "$185,000", icon: TrendingUp, color: "text-emerald-700", desc: "18 Qualified deals" },
    { title: "AI Activity", value: "1,420 Executions", icon: Activity, color: "text-slate-900", desc: "Groq & Claude-3.5" },
    { title: "Recent Wins", value: "4 Closed Deals", icon: Trophy, color: "text-amber-500", desc: "+$42k ARR this week" },
  ];

  const tasksList = [
    { title: "Review AEGIS Research output for Enterprise Fintech Corp", priority: "High", time: "Due in 1h" },
    { title: "Approve custom offer generation for 15 VP Sales prospects", priority: "High", time: "Due in 3h" },
    { title: "Confirm email deliverability domain warm-up stats", priority: "Medium", time: "Due Today" },
  ];

  return (
    <div className="space-y-8">
      {/* Action-Oriented Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200/80 pb-6">
        <div>
          <div className="flex items-center space-x-2">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-ping" />
            <h1 className="text-2xl font-bold text-slate-900">What should I do next?</h1>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            MONITRIACH CORE Autonomous Operating Cockpit — Real-time decision stream
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" size="sm">
            <Search className="mr-2 h-4 w-4" /> Trigger Research
          </Button>
          <Button size="sm">
            <Sparkles className="mr-2 h-4 w-4 text-amber-300" /> Execute AEGIS Cycle
          </Button>
        </div>
      </div>

      {/* 10 Top Cockpit Widgets */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {topWidgets.map((w, idx) => {
          const Icon = w.icon;
          return (
            <Card key={idx} className="p-4 space-y-2 hover:border-slate-300 transition-all">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500">{w.title}</span>
                <Icon className={`h-4 w-4 ${w.color}`} />
              </div>
              <p className="text-lg font-bold text-slate-900 leading-none">{w.value}</p>
              <p className="text-[11px] text-slate-400">{w.desc}</p>
            </Card>
          );
        })}
      </div>

      {/* Main Cockpit Section: Urgent Action Queue & AI Live Event Timeline */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Urgent Tasks Queue */}
        <Card className="lg:col-span-2 shadow-card border-slate-200">
          <CardHeader className="flex flex-row items-center justify-between pb-4">
            <div>
              <CardTitle className="text-base font-semibold">Priority Action Queue</CardTitle>
              <CardDescription>Actions requiring human approval or review</CardDescription>
            </div>
            <Badge variant="secondary">3 Required</Badge>
          </CardHeader>
          <CardContent className="divide-y divide-slate-100">
            {tasksList.map((task, i) => (
              <div key={i} className="py-3 flex items-center justify-between hover:bg-slate-50/50 px-2 rounded-lg transition-colors">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <Badge variant={task.priority === "High" ? "warning" : "secondary"}>
                      {task.priority}
                    </Badge>
                    <span className="text-sm font-medium text-slate-900">{task.title}</span>
                  </div>
                  <p className="text-xs text-slate-400">{task.time}</p>
                </div>
                <Button size="sm" variant="ghost">
                  Review <ArrowUpRight className="ml-1 h-3.5 w-3.5" />
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Live AI Activity Stream */}
        <Card className="shadow-card border-slate-200">
          <CardHeader className="pb-4">
            <CardTitle className="text-base font-semibold flex items-center space-x-2">
              <Activity className="h-4 w-4 text-emerald-600 animate-pulse" />
              <span>Live Event Stream</span>
            </CardTitle>
            <CardDescription>Real-time MONITRIACH CORE event bus log</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-xs">
            <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200/60">
              <div className="flex justify-between text-slate-500">
                <span className="font-semibold text-slate-900">RESEARCH_COMPLETED</span>
                <span>11:42 AM</span>
              </div>
              <p className="text-slate-600 mt-1">Crawled 12 pages for CloudScale Tech Inc.</p>
            </div>

            <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200/60">
              <div className="flex justify-between text-slate-500">
                <span className="font-semibold text-slate-900">OFFER_GENERATED</span>
                <span>11:43 AM</span>
              </div>
              <p className="text-slate-600 mt-1">AEGIS generated tailored SaaS offer.</p>
            </div>

            <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200/60">
              <div className="flex justify-between text-slate-500">
                <span className="font-semibold text-slate-900">EMAIL_SENT</span>
                <span>11:46 AM</span>
              </div>
              <p className="text-slate-600 mt-1">Outreach delivered to sarah@cloudscale.io</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
