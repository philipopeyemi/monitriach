"use client";

import React, { useState } from "react";
import { TrendingUp, Plus, Search, Filter, ShieldCheck, DollarSign, Sparkles, Building, Mail, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { OpportunityTimeline } from "@/components/shared/OpportunityTimeline";

export default function RevenueOpportunitiesPage() {
  const [selectedOpp, setSelectedOpp] = useState<string>("CloudScale Tech Inc.");

  const opportunities = [
    { company: "CloudScale Tech Inc.", domain: "cloudscale.io", contact: "Sarah Connor", value: "$45,000", stage: "ENGAGED", score: 0.96, lastActivity: "10 mins ago" },
    { company: "Cyberdyne Systems", domain: "cyberdyne.tech", contact: "Marcus Wright", value: "$85,000", stage: "RESEARCHING", score: 0.88, lastActivity: "1 hour ago" },
    { company: "TechCom Global", domain: "resistance.org", contact: "Kyle Reese", value: "$55,000", stage: "MEETING_BOOKED", score: 0.98, lastActivity: "Yesterday" },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200/80 pb-6">
        <div>
          <div className="flex items-center space-x-2">
            <TrendingUp className="h-6 w-6 text-emerald-600" />
            <h1 className="text-2xl font-bold text-slate-900">Revenue Opportunities</h1>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Centralized AI Revenue Operating System Cockpit — Company context, research, reasoning & timeline
          </p>
        </div>
        <Button size="sm">
          <Plus className="mr-2 h-4 w-4" /> Create Revenue Opportunity
        </Button>
      </div>

      {/* Main Grid: Opportunities Table & Opportunity Inspector Timeline */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Opportunities Table */}
        <Card className="lg:col-span-2 shadow-card border-slate-200">
          <CardHeader className="flex flex-row items-center justify-between pb-4">
            <CardTitle className="text-base font-semibold">Active Revenue Opportunities</CardTitle>
            <div className="w-64">
              <Input placeholder="Filter by company or domain..." />
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Opportunity</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Value</TableHead>
                  <TableHead>Stage</TableHead>
                  <TableHead>AI Score</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {opportunities.map((opp, i) => (
                  <TableRow
                    key={i}
                    onClick={() => setSelectedOpp(opp.company)}
                    className={`cursor-pointer ${selectedOpp === opp.company ? "bg-slate-100/80 font-medium" : ""}`}
                  >
                    <TableCell>
                      <div>
                        <p className="text-sm font-semibold text-slate-900">{opp.company}</p>
                        <p className="text-xs text-slate-500">{opp.domain}</p>
                      </div>
                    </TableCell>
                    <TableCell className="text-xs text-slate-700">{opp.contact}</TableCell>
                    <TableCell className="text-xs font-mono font-bold text-slate-900">{opp.value}</TableCell>
                    <TableCell>
                      <Badge variant={opp.stage === "MEETING_BOOKED" ? "success" : "secondary"}>
                        {opp.stage}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <span className="text-xs font-mono font-bold text-emerald-700">{(opp.score * 100).toFixed(0)}%</span>
                    </TableCell>
                    <TableCell className="text-right">
                      <ChevronRight className="h-4 w-4 text-slate-400 inline-block" />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Opportunity Inspector & Agent Timeline */}
        <Card className="shadow-card border-slate-200">
          <CardHeader className="pb-4 border-b border-slate-100">
            <CardTitle className="text-base font-semibold">Opportunity Inspector</CardTitle>
            <p className="text-xs font-bold text-slate-900">{selectedOpp}</p>
          </CardHeader>
          <CardContent className="pt-4 space-y-4">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/60 text-xs space-y-1">
              <span className="text-slate-500 font-medium">Business Memory Context:</span>
              <p className="text-slate-800">B2B SaaS Growth Tier. Identified pain: High CAC & deliverability drop.</p>
            </div>

            <div>
              <h4 className="text-xs font-semibold text-slate-900 uppercase tracking-wider mb-2">Autonomous Agent Timeline</h4>
              <OpportunityTimeline />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
