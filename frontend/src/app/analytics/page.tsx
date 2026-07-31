"use client";

import React from "react";
import { 
  BarChart3, 
  TrendingUp, 
  DollarSign, 
  Users, 
  Send, 
  Calendar, 
  ArrowUpRight,
  Sparkles
} from "lucide-react";
import { DashboardShell } from "@/components/layout/DashboardShell";

export default function AnalyticsPage() {
  return (
    <DashboardShell>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 pb-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center space-x-2">
              <BarChart3 className="w-6 h-6 text-slate-700" />
              <span>Full-Funnel Revenue Analytics</span>
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Pipeline conversion velocity, reply intent metrics, and closed-won revenue forecast.
            </p>
          </div>
        </div>

        {/* Top Analytics Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
            <div className="flex justify-between items-center text-slate-400">
              <span className="text-[11px] font-bold uppercase">Pipeline Value</span>
              <DollarSign className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-2xl font-bold text-slate-900">$669,000</div>
            <p className="text-[11px] text-emerald-600 font-semibold flex items-center">
              <TrendingUp className="w-3 h-3 mr-1" />
              +24% vs last month
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
            <div className="flex justify-between items-center text-slate-400">
              <span className="text-[11px] font-bold uppercase">Outreach Deliverability</span>
              <Send className="w-4 h-4 text-blue-600" />
            </div>
            <div className="text-2xl font-bold text-slate-900">99.4%</div>
            <p className="text-[11px] text-blue-600 font-semibold">AWS SES Clean Reputation</p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
            <div className="flex justify-between items-center text-slate-400">
              <span className="text-[11px] font-bold uppercase">High Intent Reply Rate</span>
              <Sparkles className="w-4 h-4 text-purple-600" />
            </div>
            <div className="text-2xl font-bold text-purple-600">24.2%</div>
            <p className="text-[11px] text-purple-600 font-semibold">3.8x Industry Benchmark</p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
            <div className="flex justify-between items-center text-slate-400">
              <span className="text-[11px] font-bold uppercase">Meetings Booked</span>
              <Calendar className="w-4 h-4 text-amber-600" />
            </div>
            <div className="text-2xl font-bold text-slate-900">38</div>
            <p className="text-[11px] text-amber-600 font-semibold">+12 scheduled this week</p>
          </div>
        </div>

        {/* Analytics Breakdown Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-900">Pipeline Stage Distribution</h3>
            <div className="space-y-3 text-xs">
              <div>
                <div className="flex justify-between text-slate-700 font-medium mb-1">
                  <span>Offer Matched ($370,000)</span>
                  <span className="font-bold">55%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                  <div className="h-full bg-blue-600 rounded-full" style={{ width: "55%" }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-slate-700 font-medium mb-1">
                  <span>Outreach Sent ($149,000)</span>
                  <span className="font-bold">22%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                  <div className="h-full bg-purple-600 rounded-full" style={{ width: "22%" }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-slate-700 font-medium mb-1">
                  <span>Meeting Booked ($150,000)</span>
                  <span className="font-bold">23%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                  <div className="h-full bg-emerald-600 rounded-full" style={{ width: "23%" }} />
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-900">AI Confidence & Intent Conversion</h3>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-800">High Confidence Matches (&gt;90% Score)</span>
                <span className="font-bold text-emerald-600">89% Win Rate</span>
              </div>
              <p className="text-xs text-slate-600">
                Opportunities with AI confidence scores above 90% convert to booked executive meetings 4x faster.
              </p>
            </div>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
