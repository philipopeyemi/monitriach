"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  Building2, 
  Globe, 
  Users, 
  BrainCircuit, 
  Database, 
  Clock, 
  Tag, 
  Mail, 
  Calendar, 
  CheckSquare, 
  BarChart3, 
  Cpu, 
  Sparkles,
  ArrowLeft,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { OpportunityTimeline } from "@/components/shared/OpportunityTimeline";

export default function OpportunityDetailPage({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState<string>("overview");

  const opportunity = {
    id: params?.id || "opp_stripe_01",
    company_name: "Stripe, Inc.",
    domain: "stripe.com",
    industry: "Fintech & Payments",
    employee_count: "8,000+",
    location: "San Francisco, CA",
    fit_score: 96,
    status: "QUALIFIED",
    assigned_agent: "AEGIS Executive Core",
    value: "$120,000",
    pain_points: [
      "Legacy email deliverability bottlenecks",
      "Manual SDR outreach research friction",
      "Low response rates on cold outreach"
    ],
    buying_signals: [
      "Hiring 15+ Enterprise Account Executives",
      "Announced expansion into EMEA market",
      "Updated tech stack with new CRM tools"
    ],
    memory_notes: "Prefers concise, value-focused outreach emphasizing technical deliverability and API integrations."
  };

  const tabs = [
    { id: "overview", label: "Overview", icon: Building2 },
    { id: "intelligence", label: "Company Intelligence", icon: Database },
    { id: "memory", label: "Business Memory", icon: BrainCircuit },
    { id: "timeline", label: "Timeline", icon: Clock },
    { id: "offers", label: "Offers", icon: Tag },
    { id: "emails", label: "Emails", icon: Mail },
    { id: "meetings", label: "Meetings", icon: Calendar },
    { id: "crm", label: "CRM", icon: Users },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "tasks", label: "Tasks", icon: CheckSquare },
    { id: "ai", label: "AI Executive", icon: Cpu },
  ];

  return (
    <DashboardShell>
      <div className="space-y-6">
        {/* Top Navigation Back Button & Opportunity Summary Header */}
        <div>
          <Link 
            href="/opportunities"
            className="inline-flex items-center space-x-2 text-xs font-medium text-slate-500 hover:text-slate-900 transition-colors mb-4"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Revenue Opportunities</span>
          </Link>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center space-x-4">
              <div className="w-14 h-14 rounded-2xl bg-slate-900 text-white font-bold flex items-center justify-center text-xl shadow-md">
                {opportunity.company_name.charAt(0)}
              </div>
              <div>
                <div className="flex items-center space-x-3 mb-1">
                  <h1 className="text-2xl font-bold text-slate-900">{opportunity.company_name}</h1>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-semibold border border-emerald-200">
                    {opportunity.fit_score}% Fit
                  </span>
                </div>
                <div className="flex items-center space-x-4 text-xs text-slate-500 font-medium">
                  <div className="flex items-center space-x-1">
                    <Globe className="w-3.5 h-3.5 text-slate-400" />
                    <span>{opportunity.domain}</span>
                  </div>
                  <span>•</span>
                  <span>{opportunity.industry}</span>
                  <span>•</span>
                  <span>{opportunity.employee_count} Employees</span>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="text-right mr-2 hidden sm:block">
                <div className="text-xs text-slate-400 font-medium">Opportunity Value</div>
                <div className="text-lg font-bold text-slate-900">{opportunity.value}</div>
              </div>
              <button className="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-medium hover:bg-slate-800 transition-all flex items-center space-x-2 shadow-sm">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <span>Run AEGIS Research</span>
              </button>
            </div>
          </div>
        </div>

        {/* 11 Navigation Tabs */}
        <div className="flex space-x-1 border-b border-slate-200/80 overflow-x-auto pb-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3.5 py-2 rounded-lg text-xs font-medium transition-all flex items-center space-x-2 whitespace-nowrap ${
                  isActive 
                    ? "bg-slate-900 text-white shadow-sm" 
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content Panels */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm min-h-[400px]">
          {activeTab === "overview" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-3">Identified Pain Points</h3>
                  <div className="space-y-2">
                    {opportunity.pain_points.map((pt, i) => (
                      <div key={i} className="flex items-center space-x-2 text-xs text-slate-700 p-2.5 rounded-lg bg-slate-50 border border-slate-200/60">
                        <AlertCircle className="w-4 h-4 text-amber-500 shrink-0" />
                        <span>{pt}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-3">Buying Signals</h3>
                  <div className="space-y-2">
                    {opportunity.buying_signals.map((sig, i) => (
                      <div key={i} className="flex items-center space-x-2 text-xs text-slate-700 p-2.5 rounded-lg bg-slate-50 border border-slate-200/60">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                        <span>{sig}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-3">Assigned AI Executive</h3>
                  <div className="p-4 rounded-xl bg-slate-900 text-white space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-400 font-mono">AEGIS_CORE_V2</span>
                      <span className="text-xs px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-medium">Active</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Supervising hypothesis formulation, email copywriting, and response handling for {opportunity.company_name}.
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-3">Persistent Memory Context</h3>
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 leading-relaxed">
                    {opportunity.memory_notes}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "timeline" && (
            <div>
              <h3 className="text-sm font-semibold text-slate-900 mb-6">Agent Activity Progression Timeline</h3>
              <OpportunityTimeline />
            </div>
          )}

          {activeTab === "intelligence" && (
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-slate-900">Company Intelligence Memory</h3>
              <p className="text-xs text-slate-500">Crawled domain services, value propositions, and competitor positioning.</p>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 font-mono">
                {`{
  "services": ["Payment Processing", "Billing Automation", "Fraud Detection"],
  "offer": "Enterprise Payment Infrastructure API",
  "brand_voice": "Technical, Crisp, Authoritative",
  "target_icp": "VP Engineering & Enterprise Revenue Ops"
}`}
              </div>
            </div>
          )}

          {activeTab !== "overview" && activeTab !== "timeline" && activeTab !== "intelligence" && (
            <div className="flex flex-col items-center justify-center py-12 text-center text-slate-500">
              <Sparkles className="w-8 h-8 text-slate-400 mb-3" />
              <h4 className="text-sm font-semibold text-slate-800">
                {tabs.find(t => t.id === activeTab)?.label} Context Store
              </h4>
              <p className="text-xs text-slate-500 max-w-sm mt-1">
                Data active in persistent business memory for {opportunity.company_name}.
              </p>
            </div>
          )}
        </div>
      </div>
    </DashboardShell>
  );
}
