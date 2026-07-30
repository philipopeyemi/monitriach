"use client";

import React from "react";
import { BrainCircuit, Plus, FileText, CheckCircle2, MessageSquareQuote, Target, Shield, HelpCircle, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function CompanyIntelligencePage() {
  const brainCategories = [
    { title: "Core Services & Products", count: "8 Services Defined", icon: Layers, desc: "SaaS Platform, Custom Enterprise AI Ops, Dedicated Support" },
    { title: "Tailored Offers", count: "12 Offer Models", icon: Target, desc: "High-ROI Pilot Programs, Free 14-day Audit, Enterprise Tier" },
    { title: "Testimonials & Social Proof", count: "24 Verified Quotes", icon: MessageSquareQuote, desc: "Customer reviews from CTOs, VPs of Sales, and Founders" },
    { title: "Case Studies", count: "6 In-depth Studies", icon: FileText, desc: "3.4x ARR increase for Fintech SaaS, 45% lower CAC" },
    { title: "Brand Voice & Positioning", count: "3 Voice Presets", icon: BrainCircuit, desc: "Authoritative, Consultative, High-Energy Direct" },
    { title: "Ideal Customer Profiles (ICPs)", count: "5 ICP Schemas", icon: Target, desc: "B2B SaaS ($5M-$50M ARR), Fintech, Agency Founders" },
    { title: "Competitor Intelligence", count: "9 Competitor Cards", icon: Shield, desc: "Battlecards vs Lemlist, Instantly, Clay, Apollo" },
    { title: "Objection Handling Matrix", count: "18 Scripts", icon: HelpCircle, desc: "Security compliance, pricing resistance, existing stack" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200/80 pb-6">
        <div>
          <div className="flex items-center space-x-2">
            <BrainCircuit className="h-6 w-6 text-purple-600" />
            <h1 className="text-2xl font-bold text-slate-900">Company Intelligence</h1>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            The persistent Business Memory repository powering AEGIS — Services, Offers, Case Studies, Brand Voice, ICPs & Sales Assets
          </p>
        </div>
        <Button size="sm">
          <Plus className="mr-2 h-4 w-4" /> Add Intelligence Asset
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {brainCategories.map((cat, i) => {
          const Icon = cat.icon;
          return (
            <Card key={i} className="shadow-card border-slate-200 hover:border-purple-300 transition-all cursor-pointer">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between mb-2">
                  <div className="p-2.5 rounded-xl bg-purple-50 text-purple-600">
                    <Icon className="h-5 w-5" />
                  </div>
                  <Badge variant="secondary">{cat.count}</Badge>
                </div>
                <CardTitle className="text-base font-semibold">{cat.title}</CardTitle>
                <CardDescription className="text-xs text-slate-500 line-clamp-2 mt-1">{cat.desc}</CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <Button variant="ghost" size="sm" className="w-full text-xs text-purple-700 hover:bg-purple-50">
                  Manage Intelligence Assets →
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
