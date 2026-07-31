"use client";

import { Cpu, Sparkles, Activity, CheckCircle2 } from "lucide-react";
import { DashboardShell } from "@/components/layout/DashboardShell";

export default function IntelligenceCenterPage() {
  const agents = [
    { name: "Research Agent", status: "Active", tasks: "24 Queue", confidence: "99%" },
    { name: "Offer Agent (AEGIS)", status: "Active", tasks: "12 Formulated", confidence: "98%" },
    { name: "Copywriter Agent", status: "Active", tasks: "45 Drafted", confidence: "97%" },
    { name: "Quality & Deliverability", status: "Active", tasks: "100 Verified", confidence: "100%" },
  ];

  return (
    <DashboardShell>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 pb-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center space-x-2">
              <Cpu className="w-6 h-6 text-slate-700" />
              <span>AI Executive Mission Control</span>
            </h1>
            <p className="text-xs text-slate-500">Real-time status of autonomous revenue agents and reasoning execution.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {agents.map((a, i) => (
            <div key={i} className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-slate-900">{a.name}</h3>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center space-x-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>{a.status}</span>
                </span>
              </div>
              <div className="flex items-center justify-between text-xs text-slate-600">
                <span>Task Queue: {a.tasks}</span>
                <span className="font-bold text-slate-900">Confidence: {a.confidence}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardShell>
  );
}
