"use client";

import React, { useState } from "react";
import { Inbox, Mail, Send, Sparkles, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function UnifiedInboxPage() {
  const [activeThread, setActiveThread] = useState(0);

  const threads = [
    { name: "John Doe", company: "Acme Corp", subject: "Re: Quick question regarding Cloud Architecture", preview: "Sounds interesting! Are you available for a 15-min call tomorrow at 2 PM?", time: "10m ago", intent: "Positive" },
    { name: "Amanda Smith", company: "Vortex Labs", subject: "Re: Scaling outbound sales engine", preview: "Can you send over pricing details and case studies for fintech?", time: "1h ago", font: "Positive" },
    { name: "Robert Vance", company: "Apex Media", subject: "Out of Office: Re: AI Sales Ops", preview: "I will be out of the office until next Tuesday...", time: "3h ago", intent: "Auto-Reply" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200/80 pb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Unified Inbox</h1>
          <p className="text-sm text-slate-500 mt-1">Real-time prospect replies, sentiment classification, and AEGIS response drafts</p>
        </div>
        <Badge variant="secondary">3 Unread Replies</Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Inbox Thread List */}
        <Card className="shadow-card border-slate-200">
          <CardHeader className="pb-3 border-b border-slate-100">
            <CardTitle className="text-base font-semibold">Conversations</CardTitle>
          </CardHeader>
          <CardContent className="divide-y divide-slate-100 p-0">
            {threads.map((t, i) => (
              <div
                key={i}
                onClick={() => setActiveThread(i)}
                className={`p-4 cursor-pointer hover:bg-slate-50 transition-colors ${activeThread === i ? "bg-slate-100/80 border-l-4 border-slate-900" : ""}`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-slate-900">{t.name}</span>
                  <span className="text-[10px] text-slate-400">{t.time}</span>
                </div>
                <p className="text-xs text-slate-600 font-medium truncate mt-0.5">{t.subject}</p>
                <p className="text-xs text-slate-400 line-clamp-2 mt-1">{t.preview}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Selected Thread Detail */}
        <Card className="lg:col-span-2 shadow-card border-slate-200 flex flex-col justify-between">
          <CardHeader className="border-b border-slate-100 pb-4">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-base font-semibold">{threads[activeThread].subject}</CardTitle>
                <p className="text-xs text-slate-500">{threads[activeThread].name} ({threads[activeThread].company})</p>
              </div>
              <Badge variant="success">High Intent Positive</Badge>
            </div>
          </CardHeader>
          <CardContent className="p-6 space-y-4 flex-1">
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/60 text-sm text-slate-800 space-y-2">
              <div className="flex justify-between text-xs text-slate-400 border-b border-slate-200/60 pb-2">
                <span>From: {threads[activeThread].name}</span>
                <span>{threads[activeThread].time}</span>
              </div>
              <p>{threads[activeThread].preview}</p>
            </div>

            {/* AEGIS Draft Suggestion */}
            <div className="bg-purple-50/60 p-4 rounded-xl border border-purple-200/60 text-sm space-y-2">
              <div className="flex items-center space-x-2 text-xs font-semibold text-purple-900">
                <Sparkles className="h-4 w-4 text-purple-600" />
                <span>AEGIS Recommended Reply Draft</span>
              </div>
              <p className="text-xs text-purple-950 leading-relaxed">
                Hi {threads[activeThread].name.split(" ")[0]}, fantastic! I just sent a calendar invite for 2:00 PM EST tomorrow. Looking forward to demonstrating MONITRIACH CORE.
              </p>
              <div className="pt-2 flex justify-end space-x-2">
                <Button size="sm" variant="outline" className="text-xs">Edit Draft</Button>
                <Button size="sm" className="text-xs"><Send className="mr-1 h-3 w-3" /> Approve & Send</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
