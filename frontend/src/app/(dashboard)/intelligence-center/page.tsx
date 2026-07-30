"use client";

import { 
  Cpu, 
  Sparkles, 
  BrainCircuit, 
  Clock, 
  AlertTriangle, 
  CheckCircle2, 
  RotateCcw, 
  DollarSign, 
  Database,
  Play,
  Pause
} from "lucide-react";
import { DashboardShell } from "@/components/layout/DashboardShell";

export default function IntelligenceCenterPage() {
  const agents = [
    { name: "Research Agent", status: "RUNNING", confidence: "98%", execution_time: "1.2s", cost: "$0.00" },
    { name: "Offer Agent", status: "RUNNING", confidence: "94%", execution_time: "2.4s", cost: "$0.00" },
    { name: "AEGIS Copywriter", status: "IDLE", confidence: "96%", execution_time: "1.8s", cost: "$0.00" },
    { name: "Quality Agent", status: "IDLE", confidence: "99%", execution_time: "0.8s", cost: "$0.00" },
    { name: "Deliverability Engine", status: "RUNNING", confidence: "100%", execution_time: "0.4s", cost: "$0.00" },
    { name: "Meeting Agent", status: "IDLE", confidence: "92%", execution_time: "1.5s", cost: "$0.00" },
    { name: "Optimizer", status: "IDLE", confidence: "95%", execution_time: "3.1s", cost: "$0.00" },
  ];

  const metrics = [
    { label: "Running Agents", value: "3 Active", icon: Cpu },
    { label: "Queue Depth", value: "14 Tasks", icon: Clock },
    { label: "Avg Confidence", value: "96.3%", icon: Sparkles },
    { label: "Memory Usage", value: "1.4 GB / 4 GB", icon: Database },
    { label: "Est. Daily Cost", value: "$0.00 (Free Tier)", icon: DollarSign },
    { label: "Retries & Failures", value: "0 Failures", icon: AlertTriangle },
  ];

  return (
    <DashboardShell>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 pb-6">
          <div>
            <div className="flex items-center space-x-2 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
              <span>Master Supervision Layer</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight flex items-center space-x-3">
              <Cpu className="w-7 h-7 text-slate-900" />
              <span>Intelligence Center</span>
            </h1>
          </div>

          <div className="flex items-center space-x-3">
            <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 font-semibold border border-emerald-200 flex items-center space-x-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>AI Executive Online</span>
            </span>
          </div>
        </div>

        {/* 6 Top Mission Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {metrics.map((m, i) => (
            <div key={i} className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between text-slate-400 mb-2">
                <m.icon className="w-4 h-4 text-slate-600" />
              </div>
              <div className="text-lg font-bold text-slate-900 mb-1">{m.value}</div>
              <div className="text-xs text-slate-500">{m.label}</div>
            </div>
          ))}
        </div>

        {/* Running Agents Table */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-100 flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900">Agent Fleet Supervision</h3>
            <span className="text-xs text-slate-500">7 Autonomous Agents Configured</span>
          </div>

          <div className="divide-y divide-slate-100 text-xs">
            {agents.map((agent, i) => (
              <div key={i} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                <div className="flex items-center space-x-3">
                  <div className={`w-2.5 h-2.5 rounded-full ${agent.status === "RUNNING" ? "bg-emerald-500 animate-pulse" : "bg-slate-300"}`} />
                  <div>
                    <div className="font-semibold text-slate-900">{agent.name}</div>
                    <div className="text-slate-400">Execution Time: {agent.execution_time}</div>
                  </div>
                </div>

                <div className="flex items-center space-x-6">
                  <div>
                    <span className="text-slate-400">Confidence: </span>
                    <span className="font-bold text-slate-900">{agent.confidence}</span>
                  </div>
                  <div>
                    <span className="text-slate-400">Provider Cost: </span>
                    <span className="font-bold text-emerald-600">{agent.cost}</span>
                  </div>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    agent.status === "RUNNING" ? "bg-emerald-100 text-emerald-800" : "bg-slate-100 text-slate-600"
                  }`}>
                    {agent.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
