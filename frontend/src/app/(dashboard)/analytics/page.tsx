"use client";

import React from "react";
import { BarChart3, TrendingUp, DollarSign, Users, Mail, Calendar } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function AnalyticsPage() {
  const metrics = [
    { title: "Total Pipeline Value", value: "$485,000", change: "+24.5%", icon: DollarSign },
    { title: "Qualified Leads", value: "342", change: "+18.2%", icon: Users },
    { title: "Outreach Volume", value: "14,850", change: "+12.0%", icon: Mail },
    { title: "Meetings Scheduled", value: "48", change: "+32.1%", icon: Calendar },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200/80 pb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Analytics & Revenue</h1>
          <p className="text-sm text-slate-500 mt-1">Conversion funnels, AEGIS performance impact, and pipeline ROI</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((m, i) => {
          const Icon = m.icon;
          return (
            <Card key={i} className="p-6 shadow-card border-slate-200">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500">{m.title}</span>
                <Icon className="h-5 w-5 text-slate-700" />
              </div>
              <p className="text-2xl font-bold text-slate-900 mt-2">{m.value}</p>
              <span className="text-xs font-semibold text-emerald-600 mt-1 inline-block">{m.change} vs last month</span>
            </Card>
          );
        })}
      </div>

      <Card className="shadow-card border-slate-200 p-8 text-center min-h-[300px] flex flex-col items-center justify-center">
        <BarChart3 className="h-12 w-12 text-slate-300 mb-3" />
        <h3 className="text-base font-semibold text-slate-900">Pipeline Analytics Visualization Canvas</h3>
        <p className="text-xs text-slate-500 max-w-md mt-1">
          Detailed conversion breakdown by campaign, domain deliverability health index, and sales cycle velocity metrics.
        </p>
      </Card>
    </div>
  );
}
