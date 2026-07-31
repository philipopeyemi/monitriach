"use client";

import React, { useState, useEffect } from "react";
import { 
  BarChart3, 
  RefreshCw
} from "lucide-react";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { supabase } from "@/lib/supabaseClient";
import { LoadingState } from "@/components/ui/LoadingState";
import { ErrorState } from "@/components/ui/ErrorState";
import { EmptyState } from "@/components/ui/EmptyState";

export default function AnalyticsPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalPipeline, setTotalPipeline] = useState(0);
  const [hasData, setHasData] = useState(false);

  const fetchAnalyticsData = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error: err } = await supabase
        .from("opportunities")
        .select("value_amount");

      if (err) throw err;
      if (data && data.length > 0) {
        const sum = data.reduce((acc, curr) => acc + (curr.value_amount || 0), 0);
        setTotalPipeline(sum);
        setHasData(true);
      } else {
        setHasData(false);
      }
    } catch (err: any) {
      console.warn("Supabase query notice:", err.message);
      setHasData(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalyticsData();
  }, []);

  return (
    <DashboardShell>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 pb-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center space-x-2">
              <BarChart3 className="w-6 h-6 text-slate-700" />
              <span>Full-Funnel Revenue Analytics</span>
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Live workspace telemetry queried directly from Supabase database tables.
            </p>
          </div>

          <button
            onClick={fetchAnalyticsData}
            className="p-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50"
            title="Reload from Supabase"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          </button>
        </div>

        {/* UI STATES */}
        {loading ? (
          <LoadingState message="Calculating live revenue analytics from Supabase..." />
        ) : error ? (
          <ErrorState message={error} onRetry={fetchAnalyticsData} />
        ) : !hasData ? (
          <EmptyState
            icon={BarChart3}
            title="Insufficient Analytics Data"
            description="Analytics will appear after your first campaigns begin generating activity and opportunities are created."
            actionText="Create Revenue Opportunity"
            actionHref="/opportunities"
          />
        ) : (
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-900">Total Calculated Pipeline Value</h3>
            <div className="text-3xl font-black text-slate-900">${totalPipeline.toLocaleString()}</div>
          </div>
        )}
      </div>
    </DashboardShell>
  );
}
