"use client";

import React from "react";
import { Send, Plus, Play, Pause, BarChart2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";

export default function CampaignsPage() {
  const campaigns = [
    { name: "Q3 Tech Leaders Outreach", status: "Active", sent: 1420, openRate: "68.2%", replyRate: "14.5%", meetings: 18 },
    { name: "Fintech VP Sales Sequence", status: "Active", sent: 850, openRate: "72.4%", replyRate: "18.1%", meetings: 12 },
    { name: "Enterprise SaaS Reactivation", status: "Paused", sent: 340, openRate: "54.0%", replyRate: "8.2%", meetings: 4 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200/80 pb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Outreach Campaigns</h1>
          <p className="text-sm text-slate-500 mt-1">Automated multi-step email sequences and engagement tracking</p>
        </div>
        <Button size="sm">
          <Plus className="mr-2 h-4 w-4" /> Create New Campaign
        </Button>
      </div>

      <Card className="shadow-card border-slate-200">
        <CardHeader className="pb-4">
          <CardTitle className="text-base font-semibold">Active Sequences</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Campaign Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Emails Sent</TableHead>
                <TableHead>Open Rate</TableHead>
                <TableHead>Reply Rate</TableHead>
                <TableHead>Meetings Booked</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {campaigns.map((c, i) => (
                <TableRow key={i}>
                  <TableCell className="font-semibold text-slate-900">{c.name}</TableCell>
                  <TableCell>
                    <Badge variant={c.status === "Active" ? "success" : "secondary"}>
                      {c.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-xs font-mono">{c.sent.toLocaleString()}</TableCell>
                  <TableCell className="text-xs font-mono font-medium text-slate-700">{c.openRate}</TableCell>
                  <TableCell className="text-xs font-mono font-bold text-emerald-700">{c.replyRate}</TableCell>
                  <TableCell className="text-xs font-mono font-bold text-slate-900">{c.meetings}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">
                      {c.status === "Active" ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
