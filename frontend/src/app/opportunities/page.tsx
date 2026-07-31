"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { 
  Building2, 
  Search, 
  ArrowUpRight, 
  Sparkles, 
  Filter, 
  Plus,
  TrendingUp,
  X,
  CheckCircle2,
  AlertCircle,
  SlidersHorizontal,
  ChevronDown
} from "lucide-react";
import { DashboardShell } from "@/components/layout/DashboardShell";

export interface Opportunity {
  id: string;
  company: string;
  website: string;
  industry: string;
  contactName: string;
  contactEmail: string;
  score: number;
  stage: "RESEARCHING" | "OFFER_MATCHED" | "OUTREACH_SENT" | "ENGAGED" | "MEETING_BOOKED" | "WON";
  nextAction: string;
  revenue: number;
  updatedAt: string;
  buyingSignals: string[];
  painPoints: string[];
}

const DEFAULT_SEEDED_OPPORTUNITIES: Opportunity[] = [
  {
    id: "opp-1",
    company: "Stripe, Inc.",
    website: "stripe.com",
    industry: "Fintech & Payments",
    contactName: "Patrick Collison",
    contactEmail: "p.collison@stripe.com",
    score: 98,
    stage: "OFFER_MATCHED",
    nextAction: "Review AEGIS Enterprise AI Offer",
    revenue: 120000,
    updatedAt: "10 mins ago",
    buyingSignals: ["Hiring VP AI Infrastructure", "Expanding Global Sales"],
    painPoints: ["Legacy API Integration Bottlenecks", "High Sales Touch Costs"]
  },
  {
    id: "opp-2",
    company: "Vercel, Inc.",
    website: "vercel.com",
    industry: "DevTools & Cloud Infrastructure",
    contactName: "Guillermo Rauch",
    contactEmail: "rauchg@vercel.com",
    score: 94,
    stage: "RESEARCHING",
    nextAction: "Execute Website Crawl & Tech Stack Extraction",
    revenue: 85000,
    updatedAt: "25 mins ago",
    buyingSignals: ["Next.js 15 Launch", "Enterprise App Hosting Expansion"],
    painPoints: ["Cold Outreach Response Rate Dip", "Need Hyper-Personalized Copy"]
  },
  {
    id: "opp-3",
    company: "Linear App",
    website: "linear.app",
    industry: "B2B SaaS / Product Tools",
    contactName: "Karri Saarinen",
    contactEmail: "karri@linear.app",
    score: 91,
    stage: "OUTREACH_SENT",
    nextAction: "Monitor SES Email Engagement",
    revenue: 64000,
    updatedAt: "1 hour ago",
    buyingSignals: ["Design Systems Scaling", "New Sales Motion Launch"],
    painPoints: ["Manual Prospecting Hours", "Fragmented Lead Data"]
  },
  {
    id: "opp-4",
    company: "Supabase, Inc.",
    website: "supabase.com",
    industry: "Developer Infrastructure",
    contactName: "Paul Copplestone",
    contactEmail: "paul@supabase.com",
    score: 89,
    stage: "MEETING_BOOKED",
    nextAction: "Prepare Executive Sales Demo",
    revenue: 150000,
    updatedAt: "2 hours ago",
    buyingSignals: ["Postgres 16 Launch", "Enterprise Auth Demand"],
    painPoints: ["Automating Lead Qualification", "Multi-Tenant Workspaces"]
  },
  {
    id: "opp-5",
    company: "OpenAI, LLC",
    website: "openai.com",
    industry: "Artificial Intelligence",
    contactName: "Sam Altman",
    contactEmail: "sam@openai.com",
    score: 99,
    stage: "ENGAGED",
    nextAction: "Formulate Customs Agent Workflow",
    revenue: 250000,
    updatedAt: "3 hours ago",
    buyingSignals: ["Enterprise API Adoption", "Partner Ecosystem Scale"],
    painPoints: ["Managing High Pipeline Volume", "Strict Deliverability Rules"]
  }
];

export default function OpportunitiesPage() {
  const [opportunities, setOpportunities] = useState<Opportunity[]>(DEFAULT_SEEDED_OPPORTUNITIES);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStage, setSelectedStage] = useState<string>("ALL");
  const [sortBy, setSortBy] = useState<"score" | "revenue" | "company">("score");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [newCompany, setNewCompany] = useState("");
  const [newWebsite, setNewWebsite] = useState("");
  const [newIndustry, setNewIndustry] = useState("B2B SaaS");
  const [newRevenue, setNewRevenue] = useState("50000");

  const filteredOpportunities = useMemo(() => {
    return opportunities
      .filter((opp) => {
        const matchesSearch =
          opp.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
          opp.website.toLowerCase().includes(searchQuery.toLowerCase()) ||
          opp.contactName.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStage = selectedStage === "ALL" || opp.stage === selectedStage;
        return matchesSearch && matchesStage;
      })
      .sort((a, b) => {
        if (sortBy === "score") return b.score - a.score;
        if (sortBy === "revenue") return b.revenue - a.revenue;
        return a.company.localeCompare(b.company);
      });
  }, [opportunities, searchQuery, selectedStage, sortBy]);

  const handleAddOpportunity = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCompany) return;

    const newOpp: Opportunity = {
      id: `opp-${Date.now()}`,
      company: newCompany,
      website: newWebsite || `${newCompany.toLowerCase().replace(/[^a-z]/g, "")}.com`,
      industry: newIndustry,
      contactName: "Key Decision Maker",
      contactEmail: `contact@${newWebsite || "company.com"}`,
      score: 92,
      stage: "RESEARCHING",
      nextAction: "AI Crawl Scheduled",
      revenue: parseFloat(newRevenue) || 50000,
      updatedAt: "Just now",
      buyingSignals: ["Initial Import"],
      painPoints: ["Pending Intelligence Extraction"]
    };

    setOpportunities([newOpp, ...opportunities]);
    setNewCompany("");
    setNewWebsite("");
    setIsAddModalOpen(false);
  };

  const getStageBadge = (stage: Opportunity["stage"]) => {
    switch (stage) {
      case "MEETING_BOOKED":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "OFFER_MATCHED":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "OUTREACH_SENT":
        return "bg-purple-50 text-purple-700 border-purple-200";
      case "ENGAGED":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "WON":
        return "bg-green-50 text-green-700 border-green-200";
      default:
        return "bg-slate-100 text-slate-700 border-slate-200";
    }
  };

  return (
    <DashboardShell>
      <div className="space-y-8">
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 pb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight flex items-center space-x-2">
              <Building2 className="w-7 h-7 text-slate-800" />
              <span>Revenue Opportunities Engine</span>
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Centralized accounts combining research, AEGIS offers, business memory, and pipeline tracking.
            </p>
          </div>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition-all flex items-center space-x-2 shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Add Opportunity</span>
          </button>
        </div>

        {/* Filter and Search Bar */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search companies, domains, contacts, or industry..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-slate-900 bg-white"
            />
          </div>

          <div className="flex items-center space-x-3 overflow-x-auto pb-1 md:pb-0">
            {/* Stage Filter */}
            <div className="flex items-center space-x-1 bg-slate-100 p-1 rounded-xl">
              {["ALL", "RESEARCHING", "OFFER_MATCHED", "OUTREACH_SENT", "MEETING_BOOKED"].map((st) => (
                <button
                  key={st}
                  onClick={() => setSelectedStage(st)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                    selectedStage === st
                      ? "bg-white text-slate-900 shadow-sm"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  {st === "ALL" ? "All Stages" : st.replace("_", " ")}
                </button>
              ))}
            </div>

            {/* Sort Selector */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-2 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-700 focus:outline-none"
            >
              <option value="score">Sort by AI Score</option>
              <option value="revenue">Sort by Revenue Value</option>
              <option value="company">Sort by Company</option>
            </select>
          </div>
        </div>

        {/* Table Container */}
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
          {filteredOpportunities.length === 0 ? (
            <div className="p-12 text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
                <Search className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-bold text-slate-900">No Revenue Opportunities Found</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Try adjusting your search criteria or add a new opportunity to seed your pipeline.
                </p>
              </div>
              <button
                onClick={() => { setSearchQuery(""); setSelectedStage("ALL"); }}
                className="px-4 py-2 rounded-xl bg-slate-100 text-slate-800 text-xs font-semibold hover:bg-slate-200 transition-all"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50/50 text-slate-500 font-semibold uppercase tracking-wider text-[11px]">
                    <th className="p-4">Company & Domain</th>
                    <th className="p-4">Industry</th>
                    <th className="p-4">Contact</th>
                    <th className="p-4">AI Score</th>
                    <th className="p-4">Pipeline Stage</th>
                    <th className="p-4">Next Action</th>
                    <th className="p-4 text-right">Est. Revenue</th>
                    <th className="p-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {filteredOpportunities.map((opp) => (
                    <tr key={opp.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="p-4">
                        <div className="font-bold text-slate-900 text-sm">{opp.company}</div>
                        <div className="text-[11px] text-slate-400 font-mono">{opp.website}</div>
                      </td>
                      <td className="p-4 text-slate-600 font-medium">{opp.industry}</td>
                      <td className="p-4">
                        <div className="font-semibold text-slate-800">{opp.contactName}</div>
                        <div className="text-[11px] text-slate-400">{opp.contactEmail}</div>
                      </td>
                      <td className="p-4">
                        <span className="inline-flex items-center px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-bold border border-emerald-200">
                          <Sparkles className="w-3 h-3 mr-1 text-emerald-600" />
                          {opp.score}%
                        </span>
                      </td>
                      <td className="p-4">
                        <span className={`inline-block px-2.5 py-1 rounded-full text-[11px] font-bold border ${getStageBadge(opp.stage)}`}>
                          {opp.stage.replace("_", " ")}
                        </span>
                      </td>
                      <td className="p-4 text-slate-700 font-medium truncate max-w-[180px]">
                        {opp.nextAction}
                      </td>
                      <td className="p-4 text-right font-bold text-slate-900">
                        ${opp.revenue.toLocaleString()}
                      </td>
                      <td className="p-4 text-right">
                        <Link
                          href={`/opportunities/${opp.id}`}
                          className="inline-flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-slate-900 text-white hover:bg-slate-800 transition-all font-semibold shadow-xs"
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
          )}
        </div>

        {/* Modal for Adding New Opportunity */}
        {isAddModalOpen && (
          <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white rounded-2xl border border-slate-200 shadow-2xl p-6 space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <h3 className="text-lg font-bold text-slate-900">Add Revenue Opportunity</h3>
                <button
                  onClick={() => setIsAddModalOpen(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-900 hover:bg-slate-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleAddOpportunity} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Company Name</label>
                  <input
                    type="text"
                    required
                    value={newCompany}
                    onChange={(e) => setNewCompany(e.target.value)}
                    placeholder="e.g. Anthropic, PBC"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Company Website Domain</label>
                  <input
                    type="text"
                    value={newWebsite}
                    onChange={(e) => setNewWebsite(e.target.value)}
                    placeholder="anthropic.com"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Industry Category</label>
                  <select
                    value={newIndustry}
                    onChange={(e) => setNewIndustry(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-slate-900 bg-white"
                  >
                    <option value="B2B SaaS">B2B SaaS</option>
                    <option value="DevTools & Cloud Infrastructure">DevTools & Cloud Infrastructure</option>
                    <option value="Fintech & Payments">Fintech & Payments</option>
                    <option value="Artificial Intelligence">Artificial Intelligence</option>
                    <option value="Agencies & Services">Agencies & Services</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Estimated Annual Contract Value ($)</label>
                  <input
                    type="number"
                    value={newRevenue}
                    onChange={(e) => setNewRevenue(e.target.value)}
                    placeholder="50000"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-slate-900"
                  />
                </div>

                <div className="flex items-center justify-end space-x-3 pt-4 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setIsAddModalOpen(false)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition-all shadow-sm"
                  >
                    Save & Seed AI Research
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
