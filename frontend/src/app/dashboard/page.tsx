"use client";

import React, { useEffect, useState } from "react";
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
  Bell,
  Sparkles,
  CheckCircle2,
  Circle,
  ArrowRight,
  Plus,
  Upload,
  Settings,
  ShieldCheck,
  RefreshCw
} from "lucide-react";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { useAuthStore } from "@/store/useAuthStore";
import { supabase } from "@/lib/supabaseClient";

export interface WorkspaceMetrics {
  opportunityCount: number;
  campaignCount: number;
  leadCount: number;
  replyCount: number;
  meetingCount: number;
  pipelineValue: number;
}

export default function MissionControlDashboard() {
  const { user, organization, workspace } = useAuthStore();
  const [loading, setLoading] = useState(true);
  const [metrics, setMetrics] = useState<WorkspaceMetrics>({
    opportunityCount: 0,
    campaignCount: 0,
    leadCount: 0,
    replyCount: 0,
    meetingCount: 0,
    pipelineValue: 0,
  });

  const fetchLiveMetrics = async () => {
    setLoading(true);
    try {
      // Query live counts from Supabase
      const { count: oppCount } = await supabase
        .from("opportunities")
        .select("*", { count: "exact", head: true });

      const { count: campCount } = await supabase
        .from("campaigns")
        .select("*", { count: "exact", head: true });

      const { count: leadCount } = await supabase
        .from("leads")
        .select("*", { count: "exact", head: true });

      let localLeadsCount = 0;
      let localCampsCount = 0;
      let localOppsCount = 0;

      if (typeof window !== "undefined") {
        const cachedLeads = JSON.parse(localStorage.getItem("monitriach_leads_cache") || "[]");
        const cachedCamps = JSON.parse(localStorage.getItem("monitriach_campaigns_cache") || "[]");
        const cachedOpps = JSON.parse(localStorage.getItem("monitriach_opportunities_cache") || "[]");
        localLeadsCount = cachedLeads.length;
        localCampsCount = cachedCamps.length;
        localOppsCount = cachedOpps.length;
      }

      setMetrics({
        opportunityCount: Math.max(oppCount || 0, localOppsCount),
        campaignCount: Math.max(campCount || 0, localCampsCount),
        leadCount: Math.max(leadCount || 0, localLeadsCount),
        replyCount: 0,
        meetingCount: 0,
        pipelineValue: 0,
      });
    } catch (err) {
      console.warn("Notice querying Supabase metrics:", err);
      let localLeadsCount = 0;
      let localCampsCount = 0;
      let localOppsCount = 0;

      if (typeof window !== "undefined") {
        const cachedLeads = JSON.parse(localStorage.getItem("monitriach_leads_cache") || "[]");
        const cachedCamps = JSON.parse(localStorage.getItem("monitriach_campaigns_cache") || "[]");
        const cachedOpps = JSON.parse(localStorage.getItem("monitriach_opportunities_cache") || "[]");
        localLeadsCount = cachedLeads.length;
        localCampsCount = cachedCamps.length;
        localOppsCount = cachedOpps.length;
      }

      setMetrics({
        opportunityCount: localOppsCount,
        campaignCount: localCampsCount,
        leadCount: localLeadsCount,
        replyCount: 0,
        meetingCount: 0,
        pipelineValue: 0,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLiveMetrics();
  }, []);

  const isFirstTimeExperience = metrics.opportunityCount === 0 && metrics.campaignCount === 0 && metrics.leadCount === 0;

  const checklistItems = [
    { label: "Email Address Verified", completed: true, href: "#" },
    { label: "Connect Company Domain Website", completed: !!organization?.website, href: "/settings" },
    { label: "Configure AI Provider API Keys (OpenAI / Anthropic)", completed: false, href: "/settings" },
    { label: "Verify Amazon SES Outbound Deliverability", completed: false, href: "/settings" },
    { label: "Import Target Decision Maker Leads", completed: metrics.leadCount > 0, href: "/leads" },
    { label: "Create First Revenue Opportunity", completed: metrics.opportunityCount > 0, href: "/opportunities" },
    { label: "Launch First Outbound Campaign", completed: metrics.campaignCount > 0, href: "/campaigns" },
  ];

  const completedCount = checklistItems.filter((item) => item.completed).length;
  const completionPercentage = Math.round((completedCount / checklistItems.length) * 100);

  return (
    <DashboardShell>
      <div className="space-y-8">
        {/* Cockpit Top Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200/80 pb-6">
          <div>
            <div className="flex items-center space-x-2 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
              <span>{organization?.name || "My Organization"}</span>
              <span>•</span>
              <span className="text-slate-900">{workspace?.name || "Production Workspace"}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              {isFirstTimeExperience ? `Welcome, ${user?.full_name || "Founder"}` : "Mission Control"}
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              {isFirstTimeExperience
                ? "Let's build your Autonomous AI Revenue Operating System."
                : "Real-time workspace pipeline telemetry & daily action queue."}
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={fetchLiveMetrics}
              disabled={loading}
              className="p-2.5 rounded-xl border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors"
              title="Refresh Supabase Metrics"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin text-slate-900" : ""}`} />
            </button>

            <Link
              href="/opportunities"
              className="px-4 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition-all flex items-center space-x-1.5 shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>Create Opportunity</span>
            </Link>
          </div>
        </div>

        {/* CONDITION 1: FIRST-TIME SETUP CHECKLIST */}
        {isFirstTimeExperience ? (
          <div className="space-y-6">
            {/* Workspace Setup Progress Card */}
            <div className="p-8 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-850 to-slate-800 text-white shadow-lg space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                    WORKSPACE SETUP ENGINE
                  </span>
                  <h2 className="text-xl font-bold">Build Your AI Revenue Machine</h2>
                  <p className="text-xs text-slate-300">
                    Estimated setup time: <span className="font-semibold text-white">5 minutes</span>
                  </p>
                </div>

                <div className="text-right">
                  <span className="text-3xl font-black text-white">{completionPercentage}%</span>
                  <span className="text-xs text-slate-400 block font-medium">System Readiness</span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-3 rounded-full bg-slate-700/60 overflow-hidden p-0.5 border border-slate-600/50">
                <div
                  className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full transition-all duration-500 shadow-sm"
                  style={{ width: `${completionPercentage}%` }}
                />
              </div>
            </div>

            {/* Checklist Items Grid */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
              <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3">
                System Setup Action Checklist ({completedCount}/{checklistItems.length} Complete)
              </h3>

              <div className="divide-y divide-slate-100">
                {checklistItems.map((item, idx) => (
                  <div key={idx} className="py-3.5 flex items-center justify-between group">
                    <div className="flex items-center space-x-3">
                      {item.completed ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                      ) : (
                        <Circle className="w-5 h-5 text-slate-300 flex-shrink-0" />
                      )}
                      <span
                        className={`text-xs font-semibold ${
                          item.completed ? "text-slate-500 line-through" : "text-slate-900"
                        }`}
                      >
                        {item.label}
                      </span>
                    </div>

                    {!item.completed && item.href !== "#" && (
                      <Link
                        href={item.href}
                        className="inline-flex items-center space-x-1 text-xs font-bold text-slate-900 hover:text-emerald-600 transition-colors"
                      >
                        <span>Configure</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* CONDITION 2: LIVE MISSION CONTROL FOR ACTIVE WORKSPACES */
          <div className="space-y-8">
            {/* Live Metrics Grid queried from Supabase */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm space-y-1">
                <span className="text-[11px] font-bold text-slate-400 uppercase block">Opportunities</span>
                <div className="text-2xl font-bold text-slate-900">{metrics.opportunityCount}</div>
              </div>

              <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm space-y-1">
                <span className="text-[11px] font-bold text-slate-400 uppercase block">Active Campaigns</span>
                <div className="text-2xl font-bold text-slate-900">{metrics.campaignCount}</div>
              </div>

              <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm space-y-1">
                <span className="text-[11px] font-bold text-slate-400 uppercase block">Target Leads</span>
                <div className="text-2xl font-bold text-slate-900">{metrics.leadCount}</div>
              </div>

              <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm space-y-1">
                <span className="text-[11px] font-bold text-slate-400 uppercase block">Replies Waiting</span>
                <div className="text-2xl font-bold text-slate-900">{metrics.replyCount}</div>
              </div>

              <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm space-y-1">
                <span className="text-[11px] font-bold text-slate-400 uppercase block">Meetings Booked</span>
                <div className="text-2xl font-bold text-emerald-600">{metrics.meetingCount}</div>
              </div>

              <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm space-y-1">
                <span className="text-[11px] font-bold text-slate-400 uppercase block">Pipeline Value</span>
                <div className="text-2xl font-bold text-slate-900">${metrics.pipelineValue.toLocaleString()}</div>
              </div>
            </div>

            {/* Live Queue & Executive Stream */}
            <div className="p-8 rounded-2xl bg-white border border-slate-200 shadow-sm text-center py-12 space-y-3">
              <Sparkles className="w-8 h-8 text-slate-400 mx-auto" />
              <h3 className="text-base font-bold text-slate-900">AI Executive Active</h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                Monitoring live Supabase database tables for target account research & outbound triggers.
              </p>
            </div>
          </div>
        )}
      </div>
    </DashboardShell>
  );
}
