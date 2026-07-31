"use client";

import React, { useState } from "react";
import { 
  Building2, 
  Database, 
  Sparkles, 
  Send, 
  Calendar, 
  BarChart3, 
  CheckSquare, 
  Cpu, 
  Clock, 
  BrainCircuit, 
  ArrowLeft,
  DollarSign,
  TrendingUp,
  CheckCircle2,
  AlertCircle,
  Mail,
  User,
  ExternalLink,
  ShieldCheck
} from "lucide-react";
import Link from "next/link";
import { DashboardShell } from "@/components/layout/DashboardShell";

export default function OpportunityInspectorPage({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState("overview");

  const tabs = [
    { id: "overview", label: "Overview", icon: Building2 },
    { id: "intelligence", label: "Company Intelligence", icon: Database },
    { id: "memory", label: "Business Memory", icon: BrainCircuit },
    { id: "timeline", label: "Timeline", icon: Clock },
    { id: "offers", label: "AEGIS Offers", icon: Sparkles },
    { id: "emails", label: "Emails", icon: Send },
    { id: "meetings", label: "Meetings", icon: Calendar },
    { id: "crm", label: "CRM Sync", icon: Building2 },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "tasks", label: "Tasks", icon: CheckSquare },
    { id: "agent", label: "AI Executive", icon: Cpu },
  ];

  return (
    <DashboardShell>
      <div className="space-y-6">
        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200/80 pb-6">
          <div className="flex items-center space-x-3">
            <Link href="/opportunities" className="p-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors">
              <ArrowLeft className="w-4 h-4 text-slate-600" />
            </Link>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Stripe, Inc.</h1>
                <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 font-bold text-xs border border-blue-200">
                  OFFER MATCHED
                </span>
              </div>
              <p className="text-xs text-slate-500 font-mono mt-0.5">
                Opportunity ID: {params.id || "opp-1"} • stripe.com • Added 10 mins ago
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 flex items-center space-x-1.5">
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Visit Website</span>
            </button>
            <button className="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition-all flex items-center space-x-1.5 shadow-sm">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Trigger AI Action</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation Bar */}
        <div className="flex items-center space-x-1 border-b border-slate-200 overflow-x-auto pb-1">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap flex items-center space-x-1.5 transition-all ${
                activeTab === t.id
                  ? "bg-slate-900 text-white shadow-sm"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              <t.icon className="w-3.5 h-3.5" />
              <span>{t.label}</span>
            </button>
          ))}
        </div>

        {/* Dynamic Tab Content */}
        {activeTab === "overview" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              {/* Account Intelligence Summary */}
              <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
                <h3 className="text-sm font-bold text-slate-900 flex items-center space-x-2">
                  <Sparkles className="w-4 h-4 text-emerald-600" />
                  <span>AI Research Summary</span>
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Stripe is currently scaling their global API infrastructure and expanding enterprise sales teams. 
                  Extracted tech stack indicates heavy use of custom internal developer tools with potential pain points around 
                  manual sales outreach throughput and deliverability management.
                </p>

                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-[11px] font-bold text-slate-400 block mb-1">BUYING SIGNALS</span>
                    <ul className="text-xs text-slate-700 space-y-1">
                      <li className="flex items-center space-x-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                        <span>Hiring VP AI Infrastructure</span>
                      </li>
                      <li className="flex items-center space-x-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                        <span>Expanding Global Sales Teams</span>
                      </li>
                    </ul>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-[11px] font-bold text-slate-400 block mb-1">EXTRACTED PAIN POINTS</span>
                    <ul className="text-xs text-slate-700 space-y-1">
                      <li className="flex items-center space-x-1.5">
                        <AlertCircle className="w-3.5 h-3.5 text-amber-500" />
                        <span>Legacy API Integration Bottlenecks</span>
                      </li>
                      <li className="flex items-center space-x-1.5">
                        <AlertCircle className="w-3.5 h-3.5 text-amber-500" />
                        <span>High Sales Touch Costs</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Formulated AEGIS Offer Card */}
              <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 text-white shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded bg-emerald-400/20 text-emerald-300 border border-emerald-400/30">
                    AEGIS OFFER MATCHED
                  </span>
                  <span className="text-xs font-mono text-slate-400">98% Confidence</span>
                </div>
                <h3 className="text-lg font-bold">Autonomous Revenue Acceleration Suite</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Automate outbound research, personalization, and meeting bookings for Stripe's enterprise sales team using MONITRIACH's multi-agent architecture.
                </p>
              </div>
            </div>

            {/* Sidebar Metrics */}
            <div className="space-y-6">
              <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
                <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3">Key Metrics</h3>
                
                <div className="space-y-3 text-xs">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500">Est. Contract Value</span>
                    <span className="font-bold text-slate-900">$120,000 / yr</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500">AI Confidence Score</span>
                    <span className="font-bold text-emerald-600">98%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500">Target Contact</span>
                    <span className="font-semibold text-slate-900">Patrick Collison</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500">Deliverability Score</span>
                    <span className="font-bold text-blue-600">99.4% (SES Clean)</span>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
                <h3 className="text-sm font-bold text-slate-900">Primary Contact</h3>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-xs">
                    PC
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">Patrick Collison</h4>
                    <p className="text-[11px] text-slate-500">CEO & Co-founder</p>
                    <p className="text-[11px] font-mono text-slate-400 mt-0.5">p.collison@stripe.com</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab !== "overview" && (
          <div className="p-8 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4 text-center py-12">
            <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-800">
              <Sparkles className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-bold text-slate-900 capitalize">{activeTab} Engine Module</h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                Real-time synchronized data layer active for {activeTab}. Connected to Supabase backend & AEGIS Agents.
              </p>
            </div>
          </div>
        )}
      </div>
    </DashboardShell>
  );
}
