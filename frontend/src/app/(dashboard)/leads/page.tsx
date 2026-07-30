"use client";

import React, { useState } from "react";
import { Users, Upload, Filter, Search, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { ActivityTimeline, TimelineStep } from "@/components/shared/ActivityTimeline";

export default function LeadsPage() {
  const [selectedLead, setSelectedLead] = useState<string>("sarah@cloudscale.io");

  const leads = [
    { name: "Sarah Connor", email: "sarah@cloudscale.io", company: "CloudScale Inc", status: "Qualified", score: 94, lastContact: "10 mins ago" },
    { name: "Marcus Wright", email: "marcus@cyberdyne.tech", company: "Cyberdyne Systems", status: "Researching", score: 88, lastContact: "1 hour ago" },
    { name: "Kyle Reese", email: "kyle@resistance.org", company: "TechCom Global", status: "Contacted", score: 91, lastContact: "Yesterday" },
  ];

  const sampleTimeline: TimelineStep[] = [
    { id: "1", time: "11:40 AM", title: "Lead Uploaded", description: "CSV Import via Workspace Admin", status: "completed" },
    { id: "2", time: "11:41 AM", title: "Website Crawled", description: "Crawled 14 subpages of cloudscale.io", status: "completed" },
    { id: "3", time: "11:42 AM", title: "Offer Generated", description: "AEGIS structured ICP offer match", status: "completed" },
    { id: "4", time: "11:43 AM", title: "Email Drafted", description: "Personalized copywriter variant #2", status: "completed" },
    { id: "5", time: "11:46 AM", title: "Email Delivered", description: "Sent via AWS SES primary domain", status: "completed" },
    { id: "6", time: "Pending", title: "Prospect Reply Expected", description: "Monitoring inbox thread", status: "pending" },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200/80 pb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Leads Engine</h1>
          <p className="text-sm text-slate-500 mt-1">Manage target prospects, lead scoring, and automated research timelines</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" /> Filter Prospects
          </Button>
          <Button size="sm">
            <Upload className="mr-2 h-4 w-4" /> Import CSV Leads
          </Button>
        </div>
      </div>

      {/* Main Grid: Leads Table & Activity Timeline */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Leads Table */}
        <Card className="lg:col-span-2 shadow-card border-slate-200">
          <CardHeader className="flex flex-row items-center justify-between pb-4">
            <CardTitle className="text-base font-semibold">Prospect Pipeline</CardTitle>
            <div className="w-64">
              <Input placeholder="Search lead or company..." />
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Lead</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>AI Score</TableHead>
                  <TableHead>Last Activity</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {leads.map((lead, i) => (
                  <TableRow
                    key={i}
                    onClick={() => setSelectedLead(lead.email)}
                    className={`cursor-pointer ${selectedLead === lead.email ? "bg-slate-100/80 font-medium" : ""}`}
                  >
                    <TableCell>
                      <div>
                        <p className="text-sm font-semibold text-slate-900">{lead.name}</p>
                        <p className="text-xs text-slate-500">{lead.email}</p>
                      </div>
                    </TableCell>
                    <TableCell className="text-xs text-slate-700">{lead.company}</TableCell>
                    <TableCell>
                      <Badge variant={lead.status === "Qualified" ? "success" : "secondary"}>
                        {lead.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <span className="text-xs font-mono font-bold text-emerald-700">{lead.score}/100</span>
                    </TableCell>
                    <TableCell className="text-xs text-slate-500">{lead.lastContact}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Selected Lead Activity Timeline */}
        <Card className="shadow-card border-slate-200">
          <CardHeader className="pb-4 border-b border-slate-100">
            <CardTitle className="text-base font-semibold">Lead Activity Timeline</CardTitle>
            <p className="text-xs text-slate-500">{selectedLead}</p>
          </CardHeader>
          <CardContent className="pt-6">
            <ActivityTimeline steps={sampleTimeline} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
