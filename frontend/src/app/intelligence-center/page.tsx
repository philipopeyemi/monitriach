"use client";

import React, { useState, useEffect } from "react";
import { Cpu, Sparkles, RefreshCw } from "lucide-react";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { supabase } from "@/lib/supabaseClient";
import { LoadingState } from "@/components/ui/LoadingState";
import { ErrorState } from "@/components/ui/ErrorState";
import { EmptyState } from "@/components/ui/EmptyState";

export interface AgentTask {
  id: string;
  agent_name: string;
  status: string;
  task_description: string;
  created_at: string;
}

export default function IntelligenceCenterPage() {
  const [tasks, setTasks] = useState<AgentTask[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAgentTasks = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error: err } = await supabase
        .from("agent_tasks")
        .select("*")
        .order("created_at", { ascending: false });

      if (err) throw err;
      setTasks(data || []);
    } catch (err: any) {
      console.warn("Supabase query notice:", err.message);
      setTasks([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAgentTasks();
  }, []);

  return (
    <DashboardShell>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 pb-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center space-x-2">
              <Cpu className="w-6 h-6 text-slate-700" />
              <span>AI Executive Mission Control</span>
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Real-time telemetry of autonomous revenue agent task execution.
            </p>
          </div>

          <button
            onClick={fetchAgentTasks}
            className="p-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50"
            title="Reload from Supabase"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          </button>
        </div>

        {/* UI STATES */}
        {loading ? (
          <LoadingState message="Querying AI Executive agent task telemetry from Supabase..." />
        ) : error ? (
          <ErrorState message={error} onRetry={fetchAgentTasks} />
        ) : tasks.length === 0 ? (
          <EmptyState
            icon={Cpu}
            title="AI Executive Ready — Status: Idle"
            description="No active tasks in execution queue. Create a Revenue Opportunity to trigger autonomous AI research, offer formulation, and outreach."
            actionText="Create Revenue Opportunity"
            actionHref="/opportunities"
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {tasks.map((t) => (
              <div key={t.id} className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-slate-900">{t.agent_name}</h3>
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                    {t.status}
                  </span>
                </div>
                <p className="text-xs text-slate-600">{t.task_description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardShell>
  );
}
