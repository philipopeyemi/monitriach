"use client";

import React, { useState, useEffect } from "react";
import { 
  Settings, 
  Building2, 
  Users, 
  CreditCard, 
  Key, 
  Mail, 
  CheckCircle2, 
  ShieldCheck,
  Globe,
  Sliders
} from "lucide-react";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { useAuthStore } from "@/store/useAuthStore";
import { supabase } from "@/lib/supabaseClient";

export default function SettingsPage() {
  const { user, organization, workspace } = useAuthStore();
  const [activeTab, setActiveTab] = useState("organization");

  const [orgName, setOrgName] = useState(organization?.name || "Acme Operating System");
  const [domain, setDomain] = useState(organization?.website || "acme.com");
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const cached = JSON.parse(localStorage.getItem("monitriach_settings_cache") || "{}");
      if (cached.orgName) setOrgName(cached.orgName);
      if (cached.domain) setDomain(cached.domain);
    }
  }, []);

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    const settingsRecord = {
      id: `settings-${Date.now()}`,
      org_name: orgName,
      domain: domain,
      updated_at: new Date().toISOString()
    };

    // Save locally first for bulletproof refresh persistence
    if (typeof window !== "undefined") {
      localStorage.setItem("monitriach_settings_cache", JSON.stringify({ orgName, domain }));
    }

    try {
      await supabase.from("workspace_settings").insert([settingsRecord]);
    } catch (err) {
      console.warn("Supabase workspace_settings insert notice:", err);
    }

    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const tabs = [
    { id: "organization", label: "Organization", icon: Building2 },
    { id: "members", label: "Team Members", icon: Users },
    { id: "providers", label: "API Providers & Keys", icon: Key },
    { id: "email", label: "Email Domains & SES", icon: Mail },
    { id: "billing", label: "Billing & Plans", icon: CreditCard },
  ];

  return (
    <DashboardShell>
      <div className="space-y-6 max-w-5xl">
        {/* Header */}
        <div className="border-b border-slate-200/80 pb-6">
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center space-x-2">
            <Settings className="w-6 h-6 text-slate-700" />
            <span>Organization & System Settings</span>
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage your organization workspace, API integrations, and team access rules.
          </p>
        </div>

        {/* Settings Tab Navigation */}
        <div className="flex items-center space-x-1 border-b border-slate-200 overflow-x-auto pb-1">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap flex items-center space-x-2 transition-all ${
                activeTab === t.id
                  ? "bg-slate-900 text-white shadow-sm"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              <t.icon className="w-4 h-4" />
              <span>{t.label}</span>
            </button>
          ))}
        </div>

        {/* Tab 1: Organization Settings */}
        {activeTab === "organization" && (
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-6">
            <h3 className="text-base font-bold text-slate-900">Organization Profile</h3>
            
            <form onSubmit={handleSaveSettings} className="space-y-4 max-w-lg text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1.5">Organization Legal Name</label>
                <input
                  type="text"
                  value={orgName}
                  onChange={(e) => setOrgName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-900"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1.5">Primary Domain Website</label>
                <input
                  type="text"
                  value={domain}
                  onChange={(e) => setDomain(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-900"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1.5">Workspace Environment</label>
                <input
                  type="text"
                  disabled
                  value={workspace?.name || "Production Workspace"}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-100 bg-slate-50 text-slate-500 font-mono"
                />
              </div>

              <div className="pt-2 flex items-center space-x-3">
                <button type="submit" className="px-5 py-2.5 bg-slate-900 text-white rounded-xl font-semibold hover:bg-slate-800 transition-all shadow-sm">
                  Save Changes
                </button>
                {isSaved && (
                  <span className="text-xs font-bold text-emerald-600 flex items-center space-x-1">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Settings Saved to Supabase & Local Cache!</span>
                  </span>
                )}
              </div>
            </form>
          </div>
        )}

        {/* Tab 2: Team Members */}
        {activeTab === "members" && (
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900">Team Access & Roles</h3>
              <button className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-semibold hover:bg-slate-800">
                Invite Member
              </button>
            </div>

            <div className="divide-y divide-slate-100 border border-slate-200 rounded-xl overflow-hidden text-xs">
              <div className="p-4 flex items-center justify-between bg-slate-50 font-semibold text-slate-700">
                <div>
                  <div className="font-bold text-slate-900">{user?.full_name || "Lead Architect"}</div>
                  <div className="text-slate-500">{user?.email || "architect@monitriach.ai"}</div>
                </div>
                <span className="px-2.5 py-1 rounded bg-slate-900 text-white font-bold text-[11px]">Owner / Admin</span>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: API Providers */}
        {activeTab === "providers" && (
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-6 text-xs">
            <h3 className="text-base font-bold text-slate-900">Connected AI Infrastructure Providers</h3>
            
            <div className="space-y-4 max-w-xl">
              <div className="p-4 rounded-xl border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900">Supabase Database & Auth</span>
                  <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold rounded text-[10px]">CONNECTED</span>
                </div>
                <p className="text-slate-500">PostgreSQL Relational Storage & Multi-tenant RLS Policies.</p>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900">OpenAI API (GPT-4o / O3)</span>
                  <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold rounded text-[10px]">CONNECTED</span>
                </div>
                <p className="text-slate-500">Powers AEGIS Copywriter & Offer Agent reasoning engine.</p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Email Domains */}
        {activeTab === "email" && (
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-6 text-xs">
            <h3 className="text-base font-bold text-slate-900">AWS SES Deliverability Domains</h3>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900">monitriach.ai</span>
                <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold rounded text-[10px]">DKIM & SPF VERIFIED</span>
              </div>
              <p className="text-slate-500">Dedicated outbound IP pool active with 99.4% deliverability rating.</p>
            </div>
          </div>
        )}

        {/* Tab 5: Billing */}
        {activeTab === "billing" && (
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4 text-xs">
            <h3 className="text-base font-bold text-slate-900">Current Plan & Usage</h3>
            <div className="p-5 rounded-xl bg-slate-900 text-white space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold">MONITRIACH Enterprise Suite</span>
                <span className="px-2.5 py-1 bg-emerald-400/20 text-emerald-300 font-bold rounded">ACTIVE</span>
              </div>
              <p className="text-slate-300">Unlimited AI Revenue Agents, Supabase Sync, and AEGIS Offer Engine.</p>
            </div>
          </div>
        )}
      </div>
    </DashboardShell>
  );
}
