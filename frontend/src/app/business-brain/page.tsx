"use client";

import { Database, Plus, Sparkles, CheckCircle2 } from "lucide-react";
import { DashboardShell } from "@/components/layout/DashboardShell";

export default function BusinessBrainPage() {
  const categories = [
    { title: "Services & Offerings", count: "12 Assets", desc: "Core products, pricing tiers, and service modules." },
    { title: "Case Studies & Proof", count: "8 Studies", desc: "Client ROI metrics, testimonials, and closed deal benchmarks." },
    { title: "Brand Voice & Guidelines", count: "Active", desc: "Tone, vocabulary rules, and communication style specifications." },
    { title: "Competitor Intelligence", count: "5 Profiles", desc: "Feature positioning matrix and objection handling frameworks." },
  ];

  return (
    <DashboardShell>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 pb-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center space-x-2">
              <Database className="w-6 h-6 text-slate-700" />
              <span>Company Intelligence</span>
            </h1>
            <p className="text-xs text-slate-500">Business memory repository powering AEGIS offers and outreach copy.</p>
          </div>

          <button className="px-4 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition-all flex items-center space-x-2 shadow-sm">
            <Plus className="w-4 h-4" />
            <span>Add Memory Asset</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {categories.map((c, i) => (
            <div key={i} className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-slate-900">{c.title}</h3>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700">{c.count}</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </DashboardShell>
  );
}
