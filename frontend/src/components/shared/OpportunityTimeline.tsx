import React from "react";
import { CheckCircle2, Clock, Sparkles, Mail, MessageSquare, Calendar, Trophy } from "lucide-react";

export interface OpportunityStageStep {
  label: string;
  time: string;
  status: "completed" | "active" | "pending";
  detail: string;
}

export function OpportunityTimeline() {
  const steps: OpportunityStageStep[] = [
    { label: "Research Started", time: "11:40 AM", status: "completed", detail: "AI Crawler dispatched to website" },
    { label: "Research Completed", time: "11:41 AM", status: "completed", detail: "Extracted 14 subpages & tech stack" },
    { label: "Pain Point Identified", time: "11:41 AM", status: "completed", detail: "Manual Outbound CAC High" },
    { label: "Offer Selected", time: "11:42 AM", status: "completed", detail: "14-Day Free Sales OS Audit" },
    { label: "AEGIS Generated Email", time: "11:43 AM", status: "completed", detail: "Tailored variant #2 drafted" },
    { label: "Quality Score Passed", time: "11:44 AM", status: "completed", detail: "98.4% Deliverability & Tone Index" },
    { label: "Email Sent", time: "11:46 AM", status: "completed", detail: "Outbound via AWS SES primary domain" },
    { label: "Reply Received", time: "12:15 PM", status: "completed", detail: "High Intent Positive response" },
    { label: "Meeting Suggested", time: "12:16 PM", status: "completed", detail: "Proposed Demo tomorrow at 2:00 PM" },
    { label: "Won Opportunity", time: "Next", status: "pending", detail: "Contract generation pending" },
  ];

  return (
    <div className="relative pl-6 border-l-2 border-slate-200 space-y-6 my-4">
      {steps.map((step, idx) => (
        <div key={idx} className="relative group">
          {/* Node Badge */}
          <div
            className={`absolute -left-[31px] top-0 flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ring-4 ring-white ${
              step.status === "completed"
                ? "bg-slate-900 text-white"
                : step.status === "active"
                ? "bg-amber-500 text-white animate-pulse"
                : "bg-slate-200 text-slate-500"
            }`}
          >
            {idx + 1}
          </div>

          <div className="flex items-center justify-between">
            <h4 className="text-sm font-semibold text-slate-900">{step.label}</h4>
            <span className="text-[10px] font-mono text-slate-400">{step.time}</span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">{step.detail}</p>
        </div>
      ))}
    </div>
  );
}
