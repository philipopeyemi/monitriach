"use client";

import React, { useState, useEffect } from "react";
import { 
  MessageSquare, 
  Send, 
  Sparkles, 
  RefreshCw
} from "lucide-react";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { supabase } from "@/lib/supabaseClient";
import { LoadingState } from "@/components/ui/LoadingState";
import { ErrorState } from "@/components/ui/ErrorState";
import { EmptyState } from "@/components/ui/EmptyState";

export interface ThreadMessage {
  id: string;
  sender_name: string;
  sender_email: string;
  subject: string;
  body: string;
  sentiment: string;
  created_at: string;
}

export default function InboxPage() {
  const [threads, setThreads] = useState<ThreadMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedThread, setSelectedThread] = useState<ThreadMessage | null>(null);
  const [replyText, setReplyText] = useState("");

  const fetchInbox = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error: err } = await supabase
        .from("messages")
        .select("*")
        .order("created_at", { ascending: false });

      if (err) throw err;
      setThreads(data || []);
      if (data && data.length > 0) {
        setSelectedThread(data[0]);
        setReplyText(`Hi ${data[0].sender_name.split(" ")[0]},\n\nThank you for your reply!`);
      }
    } catch (err: any) {
      console.warn("Supabase query notice:", err.message);
      setThreads([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInbox();
  }, []);

  return (
    <DashboardShell>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 pb-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center space-x-2">
              <MessageSquare className="w-6 h-6 text-slate-700" />
              <span>Unified Reply Inbox & Sentiment Classifier</span>
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Automated intent categorization & real-time inbox synchronization.
            </p>
          </div>

          <button
            onClick={fetchInbox}
            className="p-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50"
            title="Reload from Supabase"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          </button>
        </div>

        {/* UI STATES */}
        {loading ? (
          <LoadingState message="Querying Supabase messages database table..." />
        ) : error ? (
          <ErrorState message={error} onRetry={fetchInbox} />
        ) : threads.length === 0 ? (
          <EmptyState
            icon={MessageSquare}
            title="No Conversations Yet"
            description="Prospect replies and campaign responses will appear here automatically when launched."
            actionText="View Active Campaigns"
            actionHref="/campaigns"
          />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[550px]">
            <div className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl divide-y divide-slate-100 overflow-y-auto">
              {threads.map((t) => (
                <button
                  key={t.id}
                  onClick={() => { setSelectedThread(t); setReplyText(`Hi ${t.sender_name},\n\nThank you!`); }}
                  className={`w-full text-left p-4 space-y-1 block ${selectedThread?.id === t.id ? "bg-slate-900 text-white" : "hover:bg-slate-50"}`}
                >
                  <div className="font-bold text-xs">{t.sender_name}</div>
                  <div className="text-xs font-semibold truncate">{t.subject}</div>
                  <div className="text-[11px] opacity-80 truncate">{t.body}</div>
                </button>
              ))}
            </div>

            {selectedThread && (
              <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-6 space-y-4">
                <h2 className="text-base font-bold text-slate-900">{selectedThread.subject}</h2>
                <div className="p-3 bg-slate-50 border rounded-xl text-xs text-slate-700">{selectedThread.body}</div>
                <textarea
                  rows={5}
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  className="w-full p-3 border rounded-xl text-xs focus:ring-2 focus:ring-slate-900"
                />
                <button className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-semibold flex items-center space-x-1.5">
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Reply</span>
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </DashboardShell>
  );
}
