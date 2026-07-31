"use client";

import React, { useState } from "react";
import { 
  MessageSquare, 
  Search, 
  Send, 
  Sparkles, 
  User, 
  CheckCircle2, 
  Clock, 
  Building2,
  Mail,
  CornerUpLeft,
  Tag
} from "lucide-react";
import { DashboardShell } from "@/components/layout/DashboardShell";

export interface InboxThread {
  id: string;
  senderName: string;
  senderEmail: string;
  company: string;
  subject: string;
  preview: string;
  sentiment: "HIGH_INTENT" | "QUESTION" | "MEETING_REQUEST" | "UNSUBSCRIBE";
  timestamp: string;
  aiSuggestedReply: string;
}

const SEEDED_THREADS: InboxThread[] = [
  {
    id: "thread-1",
    senderName: "Patrick Collison",
    senderEmail: "p.collison@stripe.com",
    company: "Stripe, Inc.",
    subject: "Re: Autonomous Revenue Acceleration Suite",
    preview: "Thanks for reaching out. We are exploring AI sales infrastructure. Can you send over a 2-page architecture summary?",
    sentiment: "HIGH_INTENT",
    timestamp: "10:42 AM",
    aiSuggestedReply: "Hi Patrick,\n\nThanks for your reply! Attached is our 2-page architecture summary detailing how MONITRIACH automates enterprise research and personalized outreach.\n\nWould Thursday at 2 PM PT work for a 15-minute walk-through with our engineering team?\n\nBest,\nMONITRIACH AI Executive"
  },
  {
    id: "thread-2",
    senderName: "Guillermo Rauch",
    senderEmail: "rauchg@vercel.com",
    company: "Vercel, Inc.",
    subject: "Re: Next.js 15 Outreach Automation",
    preview: "Interesting approach. Does your engine support custom webhook triggers into our existing CRM?",
    sentiment: "QUESTION",
    timestamp: "Yesterday",
    aiSuggestedReply: "Hi Guillermo,\n\nYes, absolute compatibility! MONITRIACH exposes bidirectional webhooks and native REST APIs for real-time CRM synchronization.\n\nWould you like me to send over our OpenAPI specification?\n\nBest,\nMONITRIACH AI Executive"
  },
  {
    id: "thread-3",
    senderName: "Paul Copplestone",
    senderEmail: "paul@supabase.com",
    company: "Supabase, Inc.",
    subject: "Re: Executive Demo Booking",
    preview: "Let's schedule a demo for next Tuesday. Please send a calendar invite.",
    sentiment: "MEETING_REQUEST",
    timestamp: "2 days ago",
    aiSuggestedReply: "Hi Paul,\n\nWonderful! I have scheduled an executive demo for Tuesday at 10 AM PT and dispatched a calendar invitation to your email.\n\nLooking forward to meeting!\n\nBest,\nMONITRIACH AI Executive"
  }
];

export default function InboxPage() {
  const [threads, setThreads] = useState<InboxThread[]>(SEEDED_THREADS);
  const [selectedThreadId, setSelectedThreadId] = useState<string>("thread-1");
  const [replyText, setReplyText] = useState(SEEDED_THREADS[0].aiSuggestedReply);

  const selectedThread = threads.find((t) => t.id === selectedThreadId) || threads[0];

  const handleSelectThread = (thread: InboxThread) => {
    setSelectedThreadId(thread.id);
    setReplyText(thread.aiSuggestedReply);
  };

  const getSentimentBadge = (sentiment: InboxThread["sentiment"]) => {
    switch (sentiment) {
      case "HIGH_INTENT": return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "MEETING_REQUEST": return "bg-purple-50 text-purple-700 border-purple-200";
      case "QUESTION": return "bg-blue-50 text-blue-700 border-blue-200";
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
              <MessageSquare className="w-6 h-6 text-slate-700" />
              <span>Unified Reply Inbox & Sentiment Classifier</span>
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Automated intent categorization & instant AI reply drafting.
            </p>
          </div>
        </div>

        {/* Split View: Threads List & Detail Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[600px]">
          {/* Thread List Sidebar */}
          <div className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm flex flex-col">
            <div className="p-3 border-b border-slate-100 bg-slate-50/50">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Filter inbox replies..."
                  className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-slate-900 bg-white"
                />
              </div>
            </div>

            <div className="divide-y divide-slate-100 overflow-y-auto flex-1">
              {threads.map((thread) => (
                <button
                  key={thread.id}
                  onClick={() => handleSelectThread(thread)}
                  className={`w-full text-left p-4 transition-colors space-y-2 block ${
                    selectedThreadId === thread.id ? "bg-slate-900 text-white" : "hover:bg-slate-50"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs truncate max-w-[180px]">
                      {thread.senderName} ({thread.company})
                    </span>
                    <span className={`text-[10px] font-mono ${selectedThreadId === thread.id ? "text-slate-400" : "text-slate-400"}`}>
                      {thread.timestamp}
                    </span>
                  </div>
                  <p className={`text-xs font-semibold truncate ${selectedThreadId === thread.id ? "text-slate-200" : "text-slate-800"}`}>
                    {thread.subject}
                  </p>
                  <p className={`text-xs line-clamp-2 ${selectedThreadId === thread.id ? "text-slate-300" : "text-slate-500"}`}>
                    {thread.preview}
                  </p>
                  <div className="pt-1">
                    <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold border ${getSentimentBadge(thread.sentiment)}`}>
                      {thread.sentiment.replace("_", " ")}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Thread Detail & Reply Composer Panel */}
          <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl shadow-sm p-6 flex flex-col space-y-6">
            <div className="border-b border-slate-100 pb-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${getSentimentBadge(selectedThread.sentiment)}`}>
                  INTENT: {selectedThread.sentiment.replace("_", " ")}
                </span>
                <span className="text-xs text-slate-400 font-mono">{selectedThread.timestamp}</span>
              </div>
              <h2 className="text-lg font-bold text-slate-900">{selectedThread.subject}</h2>
              <div className="text-xs text-slate-600 flex items-center space-x-2">
                <span className="font-bold text-slate-800">{selectedThread.senderName}</span>
                <span>&lt;{selectedThread.senderEmail}&gt;</span>
              </div>
            </div>

            {/* Email Message Content */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 leading-relaxed space-y-2 flex-1">
              <p className="font-semibold text-slate-900 mb-2">Original Reply:</p>
              <p>"{selectedThread.preview}"</p>
            </div>

            {/* AI Suggested Reply Composer */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-900 flex items-center space-x-1.5">
                  <Sparkles className="w-4 h-4 text-emerald-600" />
                  <span>AEGIS Auto-Generated Reply Draft</span>
                </label>
                <button
                  onClick={() => setReplyText(selectedThread.aiSuggestedReply)}
                  className="text-xs text-slate-500 hover:text-slate-900 font-medium underline"
                >
                  Regenerate Draft
                </button>
              </div>

              <textarea
                rows={6}
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                className="w-full p-3.5 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-900 font-mono bg-white"
              />

              <div className="flex items-center justify-between">
                <button className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50">
                  Save as Draft
                </button>
                <button className="px-5 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-semibold hover:bg-slate-800 transition-all flex items-center space-x-1.5 shadow-sm">
                  <Send className="w-3.5 h-3.5" />
                  <span>Approve & Send Email</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
