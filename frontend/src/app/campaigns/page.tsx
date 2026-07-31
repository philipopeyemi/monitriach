"use client";

import React, { useState } from "react";
import { 
  Send, 
  Plus, 
  Search, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  TrendingUp, 
  BarChart3, 
  Play, 
  Pause,
  X,
  Layers
} from "lucide-react";
import { DashboardShell } from "@/components/layout/DashboardShell";

export interface Campaign {
  id: string;
  name: string;
  targetAudience: string;
  status: "ACTIVE" | "PAUSED" | "COMPLETED" | "DRAFT";
  sentCount: number;
  openRate: number;
  replyRate: number;
  meetingsBooked: number;
  createdDate: string;
}

const SEEDED_CAMPAIGNS: Campaign[] = [
  { id: "camp-1", name: "Q3 Enterprise Fintech Outbound", targetAudience: "Fintech CTOs & VPs", status: "ACTIVE", sentCount: 1420, openRate: 68.4, replyRate: 24.2, meetingsBooked: 18, createdDate: "Jul 15, 2026" },
  { id: "camp-2", name: "DevTools Infrastructure Sequence", targetAudience: "DevOps & Cloud Leaders", status: "ACTIVE", sentCount: 980, openRate: 72.1, replyRate: 28.5, meetingsBooked: 14, createdDate: "Jul 20, 2026" },
  { id: "camp-3", name: "AI Startup Founder Outreach", targetAudience: "AI Founders (Series A/B)", status: "PAUSED", sentCount: 450, openRate: 64.0, replyRate: 19.8, meetingsBooked: 6, createdDate: "Jul 05, 2026" },
];

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>(SEEDED_CAMPAIGNS);
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const [newCampaignName, setNewCampaignName] = useState("");
  const [newAudience, setNewAudience] = useState("");

  const handleCreateCampaign = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCampaignName) return;

    const newCamp: Campaign = {
      id: `camp-${Date.now()}`,
      name: newCampaignName,
      targetAudience: newAudience || "B2B Decision Makers",
      status: "ACTIVE",
      sentCount: 0,
      openRate: 0,
      replyRate: 0,
      meetingsBooked: 0,
      createdDate: "Just now"
    };

    setCampaigns([newCamp, ...campaigns]);
    setNewCampaignName("");
    setNewAudience("");
    setIsCreateModalOpen(false);
  };

  const getStatusBadge = (status: Campaign["status"]) => {
    switch (status) {
      case "ACTIVE": return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "PAUSED": return "bg-amber-50 text-amber-700 border-amber-200";
      case "COMPLETED": return "bg-blue-50 text-blue-700 border-blue-200";
      default: return "bg-slate-100 text-slate-700 border-slate-200";
    }
  };

  return (
    <DashboardShell>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 pb-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center space-x-2">
              <Send className="w-6 h-6 text-slate-700" />
              <span>Outbound Campaign Sequences</span>
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              AEGIS automated multi-step outreach with deliverability & response tracking.
            </p>
          </div>

          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition-all flex items-center space-x-1.5 shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Create Campaign</span>
          </button>
        </div>

        {/* Campaign Metrics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-1">
            <span className="text-[11px] font-bold text-slate-400 uppercase">Active Campaigns</span>
            <div className="text-2xl font-bold text-slate-900">2 Active</div>
          </div>
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-1">
            <span className="text-[11px] font-bold text-slate-400 uppercase">Total Emails Sent</span>
            <div className="text-2xl font-bold text-slate-900">2,850</div>
          </div>
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-1">
            <span className="text-[11px] font-bold text-slate-400 uppercase">Avg. Open Rate</span>
            <div className="text-2xl font-bold text-emerald-600">68.2%</div>
          </div>
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-1">
            <span className="text-[11px] font-bold text-slate-400 uppercase">Meetings Booked</span>
            <div className="text-2xl font-bold text-blue-600">38 Booked</div>
          </div>
        </div>

        {/* Campaign Table */}
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/50 text-slate-500 font-semibold uppercase tracking-wider text-[11px]">
                  <th className="p-4">Campaign Name</th>
                  <th className="p-4">Target Persona</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Emails Dispatched</th>
                  <th className="p-4">Open Rate</th>
                  <th className="p-4">Reply Rate</th>
                  <th className="p-4">Meetings</th>
                  <th className="p-4 text-right">Created</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {campaigns.map((camp) => (
                  <tr key={camp.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="p-4">
                      <div className="font-bold text-slate-900 text-sm">{camp.name}</div>
                    </td>
                    <td className="p-4 text-slate-600">{camp.targetAudience}</td>
                    <td className="p-4">
                      <span className={`inline-block px-2.5 py-1 rounded-full text-[11px] font-bold border ${getStatusBadge(camp.status)}`}>
                        {camp.status}
                      </span>
                    </td>
                    <td className="p-4 font-semibold text-slate-800">{camp.sentCount.toLocaleString()}</td>
                    <td className="p-4 font-bold text-emerald-600">{camp.openRate}%</td>
                    <td className="p-4 font-bold text-purple-600">{camp.replyRate}%</td>
                    <td className="p-4 font-bold text-slate-900">{camp.meetingsBooked}</td>
                    <td className="p-4 text-right text-slate-400">{camp.createdDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Create Campaign Modal */}
        {isCreateModalOpen && (
          <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white rounded-2xl border border-slate-200 shadow-2xl p-6 space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <h3 className="text-lg font-bold text-slate-900">Create Outbound Campaign</h3>
                <button onClick={() => setIsCreateModalOpen(false)} className="p-1 text-slate-400 hover:text-slate-900">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleCreateCampaign} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Campaign Name</label>
                  <input
                    type="text"
                    required
                    value={newCampaignName}
                    onChange={(e) => setNewCampaignName(e.target.value)}
                    placeholder="e.g. Q4 Cloud Infrastructure Campaign"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Target Audience / Persona</label>
                  <input
                    type="text"
                    value={newAudience}
                    onChange={(e) => setNewAudience(e.target.value)}
                    placeholder="e.g. VPs of Engineering & CTOs"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-slate-900"
                  />
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                  <span className="text-[11px] font-bold text-slate-700 uppercase block">Sequence Configuration</span>
                  <div className="text-xs text-slate-600 space-y-1">
                    <p>• Step 1: AEGIS Personalized Cold Outreach (Day 1)</p>
                    <p>• Step 2: Value Proof & Case Study Follow-up (Day 4)</p>
                    <p>• Step 3: Executive Meeting Invite (Day 8)</p>
                  </div>
                </div>

                <div className="flex items-center justify-end space-x-3 pt-4 border-t border-slate-100">
                  <button type="button" onClick={() => setIsCreateModalOpen(false)} className="px-4 py-2 text-xs font-semibold text-slate-600">
                    Cancel
                  </button>
                  <button type="submit" className="px-5 py-2 bg-slate-900 text-white rounded-xl text-xs font-semibold hover:bg-slate-800">
                    Launch Campaign
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </DashboardShell>
  );
}
