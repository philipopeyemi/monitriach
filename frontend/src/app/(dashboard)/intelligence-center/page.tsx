"use client";

import React from "react";
import { Sparkles, Bot, Search, Target, PenTool, ShieldCheck, MailCheck, Calendar, TrendingUp, Cpu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function IntelligenceCenterPage() {
  const agents = [
    { id: "research", name: "Research Agent", role: "Autonomous Website & Web Crawler", icon: Search, status: "Active", workload: "142 Jobs / hr", model: "DeepSeek Coder" },
    { id: "offer", name: "Offer Agent", role: "Custom Value Offer Architect", icon: Target, status: "Active", workload: "85 Offers / hr", model: "Claude-3.5 Sonnet" },
    { id: "aegis", name: "AEGIS Executive Core", role: "Primary Sales Reasoning & Strategy", icon: Sparkles, status: "Active", workload: "Orchestrating", model: "MONITRIACH CORE" },
    { id: "copywriter", name: "Copywriter Agent", role: "Personalized Outreach & Angles", icon: PenTool, status: "Active", workload: "450 Drafts / hr", model: "Claude-3.5 Sonnet" },
    { id: "quality", name: "Quality Agent", role: "Spam & Tone Validation Guardrail", icon: ShieldCheck, status: "Active", workload: "100% Audited", model: "OpenAI GPT-4o" },
    { id: "deliverability", name: "Deliverability Engine", role: "Domain Reputation & SPF/DKIM Monitoring", icon: MailCheck, status: "Active", workload: "Health 99.2%", model: "Groq Llama-3" },
    { id: "meeting", name: "Meeting Agent", role: "Calendar Scheduling & Handoff", icon: Calendar, status: "Active", workload: "18 Bookings", model: "Gemini 1.5 Pro" },
    { id: "optimizer", name: "Optimizer Agent", role: "A/B Test Learning & Conversion Loop", icon: TrendingUp, status: "Active", workload: "Continuous", model: "MONITRIACH CORE" },
    { id: "memory", name: "Memory Network", role: "Vector & Conversation Context Store", icon: Cpu, status: "Active", workload: "1.2M Vectors", model: "pgvector" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200/80 pb-6">
        <div>
          <div className="flex items-center space-x-2">
            <Sparkles className="h-6 w-6 text-amber-500" />
            <h1 className="text-2xl font-bold text-slate-900">Intelligence Center</h1>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Executive control panel for AEGIS, Research Agent, Copywriter, Quality Guardrails, and Memory Networks
          </p>
        </div>
        <Button size="sm">
          <Sparkles className="mr-2 h-4 w-4 text-amber-300" /> Trigger Full System Cycle
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {agents.map((agent) => {
          const Icon = agent.icon;
          const isAegis = agent.id === "aegis";
          return (
            <Card
              key={agent.id}
              className={`shadow-card transition-all ${
                isAegis ? "border-2 border-slate-900 bg-slate-900 text-white" : "border-slate-200 bg-white text-slate-900 hover:border-slate-300"
              }`}
            >
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between mb-2">
                  <div className={`p-2.5 rounded-xl ${isAegis ? "bg-slate-800 text-amber-400" : "bg-slate-100 text-slate-900"}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <Badge variant={isAegis ? "outline" : "success"} className={isAegis ? "border-slate-700 text-amber-300" : ""}>
                    {agent.status}
                  </Badge>
                </div>
                <CardTitle className={`text-base font-semibold ${isAegis ? "text-white" : "text-slate-900"}`}>{agent.name}</CardTitle>
                <CardDescription className={isAegis ? "text-slate-400" : "text-slate-500"}>{agent.role}</CardDescription>
              </CardHeader>

              <CardContent className="space-y-2 text-xs border-t border-slate-100/10 pt-3">
                <div className="flex justify-between">
                  <span className={isAegis ? "text-slate-400" : "text-slate-500"}>Workload:</span>
                  <span className={`font-mono font-semibold ${isAegis ? "text-amber-300" : "text-slate-900"}`}>{agent.workload}</span>
                </div>
                <div className="flex justify-between">
                  <span className={isAegis ? "text-slate-400" : "text-slate-500"}>AI Engine:</span>
                  <span className={`font-mono ${isAegis ? "text-slate-300" : "text-slate-700"}`}>{agent.model}</span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
