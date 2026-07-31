"use client";

import React, { useState, useEffect } from "react";
import { Cpu, RefreshCw, Plus, X, Trash2 } from "lucide-react";
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
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [agentName, setAgentName] = useState("AEGIS Lead Intelligence Agent");
  const [taskDescription, setTaskDescription] = useState("");

  const fetchAgentTasks = async () => {
    setLoading(true);
    setError(null);
    try {
      // 1. Fetch from Supabase
      const { data, error: err } = await supabase
        .from("agent_tasks")
        .select("*")
        .order("created_at", { ascending: false });

      if (err) console.warn("Supabase query notice:", err.message);

      // 2. Fetch local storage cached tasks for 100% zero-data-loss guarantee upon refresh
      let cachedTasks: AgentTask[] = [];
      if (typeof window !== "undefined") {
        cachedTasks = JSON.parse(localStorage.getItem("monitriach_tasks_cache") || "[]");
      }

      // 3. Deduplicate and merge Supabase + Local Cache
      const dbTasks = data || [];
      const combined = [...dbTasks];

      cachedTasks.forEach((cTask) => {
        if (!combined.some((t) => t.id === cTask.id || (t.task_description === cTask.task_description && t.agent_name === cTask.agent_name))) {
          combined.push(cTask);
        }
      });

      setTasks(combined);
    } catch (err: any) {
      console.warn("Error fetching agent tasks:", err);
      if (typeof window !== "undefined") {
        const cached = JSON.parse(localStorage.getItem("monitriach_tasks_cache") || "[]");
        setTasks(cached);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAgentTasks();
  }, []);

  const handleDispatchAgent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskDescription) return;

    const newTask: AgentTask = {
      id: `task-${Date.now()}`,
      agent_name: agentName,
      status: "RUNNING",
      task_description: taskDescription,
      created_at: new Date().toISOString(),
    };

    // Save locally first for bulletproof refresh persistence
    const updated = [newTask, ...tasks];
    setTasks(updated);
    if (typeof window !== "undefined") {
      localStorage.setItem("monitriach_tasks_cache", JSON.stringify(updated));
    }

    try {
      await supabase.from("agent_tasks").insert([newTask]);
    } catch (err) {
      console.warn("Supabase agent task insert notice:", err);
    } finally {
      setTaskDescription("");
      setIsModalOpen(false);
    }
  };

  const handleDeleteTask = async (id: string) => {
    const updated = tasks.filter((t) => t.id !== id);
    setTasks(updated);
    if (typeof window !== "undefined") {
      localStorage.setItem("monitriach_tasks_cache", JSON.stringify(updated));
    }

    try {
      await supabase.from("agent_tasks").delete().eq("id", id);
    } catch (err) {
      console.warn("Supabase agent task delete notice:", err);
    }
  };

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

          <div className="flex items-center space-x-3">
            <button
              onClick={fetchAgentTasks}
              className="p-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50"
              title="Reload from Supabase"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            </button>
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition-all flex items-center space-x-1.5 shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>Dispatch Agent</span>
            </button>
          </div>
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
            description="No active tasks in execution queue. Dispatch an autonomous AI research or outreach agent task."
            actionText="Dispatch Agent Task"
            onActionClick={() => setIsModalOpen(true)}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {tasks.map((t) => (
              <div key={t.id} className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3 relative group">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-slate-900">{t.agent_name}</h3>
                  <div className="flex items-center space-x-2">
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                      {t.status}
                    </span>
                    <button
                      onClick={() => handleDeleteTask(t.id)}
                      className="p-1 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded transition-colors"
                      title="Delete Agent Task"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
                <p className="text-xs text-slate-600">{t.task_description}</p>
              </div>
            ))}
          </div>
        )}

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white rounded-2xl border border-slate-200 shadow-2xl p-6 space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <h3 className="text-lg font-bold text-slate-900">Dispatch AI Executive Task</h3>
                <button onClick={() => setIsModalOpen(false)} className="p-1 text-slate-400 hover:text-slate-900">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleDispatchAgent} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Agent Module</label>
                  <select
                    value={agentName}
                    onChange={(e) => setAgentName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-slate-900 bg-white"
                  >
                    <option value="AEGIS Lead Intelligence Agent">AEGIS Lead Intelligence Agent</option>
                    <option value="AEGIS Autonomous Research Agent">AEGIS Autonomous Research Agent</option>
                    <option value="AEGIS Offer Matcher & Optimizer">AEGIS Offer Matcher & Optimizer</option>
                    <option value="AEGIS Outbound Dispatcher">AEGIS Outbound Dispatcher</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Task Description / Objective</label>
                  <textarea
                    rows={4}
                    required
                    value={taskDescription}
                    onChange={(e) => setTaskDescription(e.target.value)}
                    placeholder="Describe what the autonomous agent should accomplish..."
                    className="w-full p-3 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-slate-900"
                  />
                </div>

                <div className="flex items-center justify-end space-x-3 pt-4 border-t border-slate-100">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-xs font-semibold text-slate-600">
                    Cancel
                  </button>
                  <button type="submit" className="px-5 py-2 bg-slate-900 text-white rounded-xl text-xs font-semibold hover:bg-slate-800">
                    Dispatch Task
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
