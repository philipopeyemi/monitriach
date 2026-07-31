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
  ArrowLeft 
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
        <div className="flex items-center space-x-3">
          <Link href="/opportunities" className="p-2 rounded-xl border border-slate-200 hover:bg-slate-50">
            <ArrowLeft className="w-4 h-4 text-slate-600" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Stripe, Inc.</h1>
            <p className="text-xs text-slate-500 font-mono">Opportunity ID: {params.id || "opp-1"} • stripe.com</p>
          </div>
        </div>

        {/* Tab Navigation Bar */}
        <div className="flex items-center space-x-1 border-b border-slate-200 overflow-x-auto pb-1">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={`px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap flex items-center space-x-1.5 transition-all ${
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

        {/* Tab Content */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-slate-900 capitalize">{activeTab} Details</h3>
          <p className="text-xs text-slate-600">
            Viewing structured revenue opportunity intelligence data for Stripe, Inc.
          </p>
        </div>
      </div>
    </DashboardShell>
  );
}
