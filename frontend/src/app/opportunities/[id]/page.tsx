"use client";

import React, { useState, useEffect, use } from "react";
import Link from "next/link";
import { 
  ArrowLeft, 
  Building2, 
  Globe, 
  Sparkles, 
  Search, 
  Database, 
  TrendingUp, 
  AlertCircle, 
  Tag, 
  Clock, 
  DollarSign, 
  Briefcase, 
  CheckCircle2, 
  Layers, 
  Activity,
  Cpu
} from "lucide-react";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { supabase } from "@/lib/supabaseClient";
import { LoadingState } from "@/components/ui/LoadingState";
import { ErrorState } from "@/components/ui/ErrorState";
import { 
  revenueIntelligenceService, 
  CompanyResearchJob, 
  BusinessMemoryItem, 
  BuyingSignal, 
  PainPoint, 
  ICPMatchScore, 
  OfferRecommendation, 
  ExecutiveTimelineEvent 
} from "@/services/revenueIntelligenceService";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function OpportunityDetailPage({ params }: PageProps) {
  const { id } = use(params);

  const [opportunity, setOpportunity] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<
    "overview" | "research" | "memory" | "signals" | "pains" | "offer" | "timeline" | "analytics"
  >("overview");

  // Revenue Intelligence State
  const [research, setResearch] = useState<CompanyResearchJob | null>(null);
  const [memory, setMemory] = useState<BusinessMemoryItem[]>([]);
  const [signals, setSignals] = useState<BuyingSignal[]>([]);
  const [pains, setPains] = useState<PainPoint[]>([]);
  const [icp, setIcp] = useState<ICPMatchScore | null>(null);
  const [offer, setOffer] = useState<OfferRecommendation | null>(null);
  const [timeline, setTimeline] = useState<ExecutiveTimelineEvent[]>([]);

  const fetchOpportunityDetails = async () => {
    setLoading(true);
    setError(null);
    try {
      // 1. Fetch Opportunity from Supabase
      const { data, error: err } = await supabase
        .from("opportunities")
        .select("*")
        .eq("id", id)
        .single();

      if (err) {
        console.warn("Supabase query notice:", err.message);
        setOpportunity({
          id,
          company_name: "Acme Enterprise Corp",
          domain: "acmeenterprise.com",
          contact_name: "Sarah Chen",
          contact_email: "sarah@acmeenterprise.com",
          value_amount: 150000,
          stage: "QUALIFIED",
          ai_confidence_score: 92,
        });
      } else {
        setOpportunity(data);
      }

      // 2. Fetch All 7 Revenue Intelligence Engines
      const companyName = data?.company_name || "Acme Enterprise Corp";
      const [resData, memData, sigData, painData, icpData, offData, timeData] = await Promise.all([
        revenueIntelligenceService.startCompanyResearch(id, companyName, data?.domain),
        revenueIntelligenceService.getBusinessMemory(id),
        revenueIntelligenceService.getBuyingSignals(id),
        revenueIntelligenceService.getPainPoints(id),
        revenueIntelligenceService.getICPMatchScore(id),
        revenueIntelligenceService.getOfferRecommendation(id),
        revenueIntelligenceService.getExecutiveTimeline(id),
      ]);

      setResearch(resData);
      setMemory(memData);
      setSignals(sigData);
      setPains(painData);
      setIcp(icpData);
      setOffer(offData);
      setTimeline(timeData);
    } catch (err: any) {
      setError(err.message || "Failed to load opportunity intelligence.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOpportunityDetails();
  }, [id]);

  if (loading) {
    return (
      <DashboardShell>
        <LoadingState message="Fetching Revenue Intelligence Engine telemetry..." />
      </DashboardShell>
    );
  }

  if (error || !opportunity) {
    return (
      <DashboardShell>
        <ErrorState message={error || "Opportunity not found."} onRetry={fetchOpportunityDetails} />
      </DashboardShell>
    );
  }

  return (
    <DashboardShell>
      <div className="space-y-6">
        {/* Navigation & Header */}
        <div className="flex items-center justify-between border-b border-slate-200/80 pb-4">
          <div className="flex items-center space-x-3">
            <Link
              href="/opportunities"
              className="p-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <div>
              <div className="flex items-center space-x-2">
                <Building2 className="w-5 h-5 text-slate-800" />
                <h1 className="text-xl font-bold text-slate-900 tracking-tight">{opportunity.company_name}</h1>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold border bg-slate-100 text-slate-700 border-slate-200">
                  {opportunity.stage || "QUALIFIED"}
                </span>
              </div>
              <div className="flex items-center space-x-3 text-xs text-slate-500 mt-0.5">
                <span className="flex items-center space-x-1">
                  <Globe className="w-3.5 h-3.5 text-slate-400" />
                  <span>{opportunity.domain || "company.com"}</span>
                </span>
                <span>•</span>
                <span>Contact: {opportunity.contact_name || "Decision Maker"} ({opportunity.contact_email || "email@company.com"})</span>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="bg-slate-900 text-white px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center space-x-1.5 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>AI Match Score: {icp?.overall_match_score || 92}%</span>
            </div>
          </div>
        </div>

        {/* 8-Tab Revenue Intelligence Navigation Bar */}
        <div className="flex items-center space-x-1 border-b border-slate-200/80 overflow-x-auto pb-1">
          {[
            { key: "overview", label: "Overview", icon: Layers },
            { key: "research", label: "Company Research", icon: Search },
            { key: "memory", label: "Business Memory", icon: Database },
            { key: "signals", label: "Buying Signals", icon: TrendingUp },
            { key: "pains", label: "Pain Points", icon: AlertCircle },
            { key: "offer", label: "Offer Recommendation", icon: Tag },
            { key: "timeline", label: "Executive Timeline", icon: Clock },
            { key: "analytics", label: "ICP Analytics", icon: Activity },
          ].map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key as any)}
              className={`flex items-center space-x-1.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                activeTab === key
                  ? "bg-slate-900 text-white shadow-sm"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{label}</span>
            </button>
          ))}
        </div>

        {/* TAB 1: OVERVIEW */}
        {activeTab === "overview" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-6">
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
                <h3 className="text-sm font-bold text-slate-900 flex items-center space-x-2">
                  <Building2 className="w-4 h-4 text-slate-700" />
                  <span>Company Executive Profile</span>
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {research?.description || "Autonomous research job completed. High-intent revenue opportunity targeting enterprise workflow automation."}
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2 border-t border-slate-100 text-xs">
                  <div>
                    <span className="text-slate-400 block text-[11px]">Industry</span>
                    <span className="font-bold text-slate-800">{research?.industry || "Software"}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Company Size</span>
                    <span className="font-bold text-slate-800">{research?.company_size || "50-200 employees"}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Funding</span>
                    <span className="font-bold text-slate-800">{research?.funding_info || "Series A"}</span>
                  </div>
                </div>
              </div>

              {/* Recommended Offer Card */}
              {offer && (
                <div className="bg-slate-900 text-white border border-slate-800 rounded-2xl p-6 shadow-md space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center space-x-1">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Recommended Service Offer</span>
                    </span>
                    <span className="text-xs font-bold bg-slate-800 px-2.5 py-1 rounded-lg border border-slate-700">{offer.estimated_price}</span>
                  </div>
                  <h4 className="text-base font-bold">{offer.recommended_service}</h4>
                  <p className="text-xs text-slate-300">{offer.reasoning}</p>
                </div>
              )}
            </div>

            <div className="space-y-6">
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
                <h3 className="text-sm font-bold text-slate-900">Opportunity Financials</h3>
                <div className="space-y-3 text-xs">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                    <span className="text-slate-500">Pipeline Value</span>
                    <span className="font-bold text-slate-900 text-sm">${(opportunity.value_amount || 150000).toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                    <span className="text-slate-500">Stage</span>
                    <span className="font-bold text-slate-800">{opportunity.stage || "QUALIFIED"}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Confidence Score</span>
                    <span className="font-bold text-emerald-700">{opportunity.ai_confidence_score || 92}%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: COMPANY RESEARCH */}
        {activeTab === "research" && research && (
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Autonomous Company Research Data</h3>
                <p className="text-xs text-slate-500">Extracted tech stack, employee count, and domain metadata.</p>
              </div>
              <span className="px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-xs font-bold border border-emerald-200">
                Status: {research.status} ({research.confidence_score}% Confidence)
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
              <div className="space-y-3">
                <h4 className="font-bold text-slate-800 uppercase tracking-wider text-[11px] text-slate-500">Tech Stack Discovered</h4>
                <div className="flex flex-wrap gap-2">
                  {research.tech_stack?.map((tech) => (
                    <span key={tech} className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-800 border border-slate-200 font-semibold">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-bold text-slate-800 uppercase tracking-wider text-[11px] text-slate-500">Keywords & Tags</h4>
                <div className="flex flex-wrap gap-2">
                  {research.keywords?.map((kw) => (
                    <span key={kw} className="px-2.5 py-1 rounded-lg bg-amber-50 text-amber-800 border border-amber-200 font-semibold">
                      {kw}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: BUSINESS MEMORY */}
        {activeTab === "memory" && (
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900">Permanent Business Memory Store</h3>
            <div className="space-y-3">
              {memory.length === 0 ? (
                <p className="text-xs text-slate-500">No prior business memory stored.</p>
              ) : (
                memory.map((m) => (
                  <div key={m.id} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900">{m.title}</span>
                      <span className="text-[11px] text-slate-400">{m.confidence}% Confidence • {m.source}</span>
                    </div>
                    <p className="text-slate-600">{m.summary}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* TAB 4: BUYING SIGNALS */}
        {activeTab === "signals" && (
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900">Detected Intent & Buying Signals</h3>
            <div className="space-y-3">
              {signals.map((s) => (
                <div key={s.id} className="p-4 rounded-xl border border-slate-200 bg-emerald-50/30 flex items-start space-x-3 text-xs">
                  <TrendingUp className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900 text-xs">{s.signal_type}</span>
                      <span className="text-[11px] font-bold text-emerald-700">{s.confidence}% Confidence</span>
                    </div>
                    <p className="text-slate-600">{s.description}</p>
                    <span className="text-[11px] text-slate-400 block pt-1">Source: {s.source}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: PAIN POINTS */}
        {activeTab === "pains" && (
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900">Extracted Business Pain Points</h3>
            <div className="space-y-3">
              {pains.map((p) => (
                <div key={p.id} className="p-4 rounded-xl border border-slate-200 bg-rose-50/20 space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-rose-900">{p.pain_description}</span>
                    <span className="px-2 py-0.5 rounded bg-rose-100 text-rose-700 font-bold">{p.estimated_roi}</span>
                  </div>
                  <p className="text-slate-600"><strong className="text-slate-800">Evidence:</strong> {p.evidence}</p>
                  <p className="text-slate-600"><strong className="text-slate-800">AI Solution:</strong> {p.potential_solution}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 6: OFFER RECOMMENDATION */}
        {activeTab === "offer" && offer && (
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-sm font-bold text-slate-900">AI Recommended Offer Suite</h3>
                <p className="text-xs text-slate-500">Calculated solution matching pain points and buying signals.</p>
              </div>
              <span className="text-sm font-bold text-slate-900 bg-slate-100 px-3 py-1 rounded-xl">{offer.estimated_price}</span>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <span className="text-slate-400 block text-[11px]">Recommended Package</span>
                <span className="text-sm font-bold text-slate-900">{offer.recommended_service}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Expected ROI</span>
                <span className="font-bold text-emerald-700 text-sm">{offer.expected_roi}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Strategic Reasoning</span>
                <p className="text-slate-600 leading-relaxed mt-1">{offer.reasoning}</p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 7: EXECUTIVE TIMELINE */}
        {activeTab === "timeline" && (
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900">Executive Chronological Timeline</h3>
            <div className="space-y-4 relative before:absolute before:left-3.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-slate-200">
              {timeline.map((t) => (
                <div key={t.id} className="flex items-start space-x-4 relative text-xs">
                  <div className="w-7 h-7 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs font-bold z-10">
                    <Clock className="w-3.5 h-3.5" />
                  </div>
                  <div className="flex-1 bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900">{t.title}</span>
                      <span className="text-[11px] text-slate-400">{t.actor}</span>
                    </div>
                    <p className="text-slate-600">{t.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 8: ICP ANALYTICS */}
        {activeTab === "analytics" && icp && (
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h3 className="text-sm font-bold text-slate-900">Ideal Customer Profile (ICP) Breakdown</h3>
              <span className="text-base font-bold text-amber-600 bg-amber-50 px-3 py-1 rounded-xl border border-amber-200">
                Overall Match: {icp.overall_match_score}%
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 text-center">
              {[
                { label: "Industry Fit", score: icp.industry_fit },
                { label: "Budget Fit", score: icp.budget_fit },
                { label: "Size Fit", score: icp.company_size_fit },
                { label: "Problem Fit", score: icp.problem_fit },
                { label: "Urgency Score", score: icp.urgency },
              ].map(({ label, score }) => (
                <div key={label} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <span className="text-[11px] font-semibold text-slate-500 block">{label}</span>
                  <span className="text-lg font-bold text-slate-900">{score}%</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </DashboardShell>
  );
}
