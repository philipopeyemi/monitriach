"use client";

import React, { useState, useEffect } from "react";
import { Database, Plus, RefreshCw, X } from "lucide-react";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { supabase } from "@/lib/supabaseClient";
import { LoadingState } from "@/components/ui/LoadingState";
import { ErrorState } from "@/components/ui/ErrorState";
import { EmptyState } from "@/components/ui/EmptyState";

export interface MemoryAsset {
  id: string;
  category: string;
  title: string;
  content: string;
  created_at: string;
}

export default function BusinessBrainPage() {
  const [assets, setAssets] = useState<MemoryAsset[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState("Services & Offerings");
  const [newContent, setNewContent] = useState("");

  const fetchMemory = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error: err } = await supabase
        .from("business_memory")
        .select("*")
        .order("created_at", { ascending: false });

      if (err) throw err;
      setAssets(data || []);
    } catch (err: any) {
      console.warn("Supabase query notice:", err.message);
      setAssets([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMemory();
  }, []);

  const handleAddAsset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle) return;

    const newRecord = {
      category: newCategory,
      title: newTitle,
      content: newContent || "Structured memory payload",
    };

    try {
      const { data, error: insertErr } = await supabase
        .from("business_memory")
        .insert([newRecord])
        .select();

      if (insertErr) {
        console.warn("Supabase insert notice:", insertErr.message);
        setAssets([{ id: `mem-${Date.now()}`, ...newRecord, created_at: new Date().toISOString() }, ...assets]);
      } else if (data && data.length > 0) {
        setAssets([data[0], ...assets]);
      }
    } catch (err) {
      console.error("Error adding memory asset:", err);
    } finally {
      setNewTitle("");
      setNewContent("");
      setIsAddModalOpen(false);
    }
  };

  return (
    <DashboardShell>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 pb-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center space-x-2">
              <Database className="w-6 h-6 text-slate-700" />
              <span>Company Intelligence & Business Memory</span>
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Structured memory repository powering AEGIS offers and outreach copy.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={fetchMemory}
              className="p-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50"
              title="Reload from Supabase"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            </button>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition-all flex items-center space-x-1.5 shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>Add Memory Asset</span>
            </button>
          </div>
        </div>

        {/* UI STATES */}
        {loading ? (
          <LoadingState message="Querying Supabase business memory tables..." />
        ) : error ? (
          <ErrorState message={error} onRetry={fetchMemory} />
        ) : assets.length === 0 ? (
          <EmptyState
            icon={Database}
            title="No Company Intelligence Yet"
            description="Create a Revenue Opportunity to allow the AI Executive to begin researching a company and populating intelligence memory."
            actionText="Create Revenue Opportunity"
            actionHref="/opportunities"
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {assets.map((a) => (
              <div key={a.id} className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-slate-900">{a.title}</h3>
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700">{a.category}</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">{a.content}</p>
              </div>
            ))}
          </div>
        )}

        {/* Modal */}
        {isAddModalOpen && (
          <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white rounded-2xl border border-slate-200 shadow-2xl p-6 space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <h3 className="text-lg font-bold text-slate-900">Add Memory Asset</h3>
                <button onClick={() => setIsAddModalOpen(false)} className="p-1 text-slate-400 hover:text-slate-900">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleAddAsset} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Asset Title</label>
                  <input
                    type="text"
                    required
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="e.g. Core Enterprise Pricing Matrix"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Category</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-slate-900 bg-white"
                  >
                    <option value="Services & Offerings">Services & Offerings</option>
                    <option value="Case Studies & Proof">Case Studies & Proof</option>
                    <option value="Brand Voice & Guidelines">Brand Voice & Guidelines</option>
                    <option value="Competitor Intelligence">Competitor Intelligence</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Memory Content / Context</label>
                  <textarea
                    rows={4}
                    value={newContent}
                    onChange={(e) => setNewContent(e.target.value)}
                    placeholder="Enter key details..."
                    className="w-full p-3 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-slate-900"
                  />
                </div>

                <div className="flex items-center justify-end space-x-3 pt-4 border-t border-slate-100">
                  <button type="button" onClick={() => setIsAddModalOpen(false)} className="px-4 py-2 text-xs font-semibold text-slate-600">
                    Cancel
                  </button>
                  <button type="submit" className="px-5 py-2 bg-slate-900 text-white rounded-xl text-xs font-semibold hover:bg-slate-800">
                    Save Memory
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
