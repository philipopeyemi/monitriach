"use client";

import Link from "next/link";
import { Building2, Search, ArrowUpRight, Sparkles, Filter, Plus } from "lucide-react";
import { DashboardShell } from "@/components/layout/DashboardShell";

export default function OpportunitiesListPage() {
  const opportunities = [
    { id: "opp-1", company: "Stripe, Inc.", website: "stripe.com", score: 98, status: "AEGIS Offer Ready", revenue: "$120,000", updated: "10 mins ago" },
    { id: "opp-2", company: "Vercel, Inc.", website: "vercel.com", score: 94, status: "Research Completed", revenue: "$85,000", updated: "25 mins ago" },
    { id: "opp-3", company: "Linear App", website: "linear.app", score: 91, status: "Email Dispatched", revenue: "$64,000", updated: "1 hour ago" },
    { id: "opp-4", company: "Supabase, Inc.", website: "supabase.com", score: 89, status: "Meeting Booked", revenue: "$150,000", updated: "2 hours ago" },
  ];

  return (
    <DashboardShell>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 pb-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center space-x-2">
              <Building2 className="w-6 h-6 text-slate-700" />
              <span>Revenue Opportunities</span>
            </h1>
            <p className="text-xs text-slate-500">Unified accounts with intelligence memory & AI action plans.</p>
          </div>

          <button className="px-4 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition-all flex items-center space-x-2 shadow-sm">
            <Plus className="w-4 h-4" />
            <span>Add Opportunity</span>
          </button>
        </div>

        <div className="flex items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search companies, domains, or status..."
              className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-slate-900"
            />
          </div>

          <button className="px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 flex items-center space-x-1.5">
            <Filter className="w-3.5 h-3.5" />
            <span>Filter</span>
          </button>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50 text-slate-500 font-semibold uppercase tracking-wider text-[11px]">
                <th className="p-4">Company</th>
                <th className="p-4">AI Score</th>
                <th className="p-4">Pipeline Status</th>
                <th className="p-4">Est. Value</th>
                <th className="p-4">Last Activity</th>
                <th className="p-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {opportunities.map((opp) => (
                <tr key={opp.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-4">
                    <div className="font-bold text-slate-900">{opp.company}</div>
                    <div className="text-[11px] text-slate-400 font-mono">{opp.website}</div>
                  </td>
                  <td className="p-4">
                    <span className="inline-flex items-center px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-bold border border-emerald-200">
                      <Sparkles className="w-3 h-3 mr-1" />
                      {opp.score}%
                    </span>
                  </td>
                  <td className="p-4 text-slate-700">{opp.status}</td>
                  <td className="p-4 font-bold text-slate-900">{opp.revenue}</td>
                  <td className="p-4 text-slate-400">{opp.updated}</td>
                  <td className="p-4 text-right">
                    <Link
                      href={`/opportunities/${opp.id}`}
                      className="inline-flex items-center space-x-1 px-3 py-1 rounded-lg bg-slate-100 text-slate-900 hover:bg-slate-900 hover:text-white transition-all font-semibold"
                    >
                      <span>Inspect</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardShell>
  );
}
