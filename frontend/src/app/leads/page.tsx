"use client";

import React, { useState } from "react";
import { 
  Users, 
  Search, 
  Plus, 
  Upload, 
  Filter, 
  Mail, 
  Phone, 
  Building2, 
  Sparkles, 
  X,
  CheckCircle2,
  FileSpreadsheet
} from "lucide-react";
import { DashboardShell } from "@/components/layout/DashboardShell";

export interface Lead {
  id: string;
  name: string;
  title: string;
  company: string;
  email: string;
  phone: string;
  status: "NEW" | "RESEARCHED" | "CONTACTED" | "QUALIFIED" | "UNSUBSCRIBED";
  intentScore: number;
  addedAt: string;
}

const SEEDED_LEADS: Lead[] = [
  { id: "lead-1", name: "Patrick Collison", title: "CEO", company: "Stripe, Inc.", email: "p.collison@stripe.com", phone: "+1 (415) 890-1200", status: "QUALIFIED", intentScore: 98, addedAt: "Today" },
  { id: "lead-2", name: "Guillermo Rauch", title: "CEO & Founder", company: "Vercel, Inc.", email: "rauchg@vercel.com", phone: "+1 (415) 340-9821", status: "RESEARCHED", intentScore: 94, addedAt: "Yesterday" },
  { id: "lead-3", name: "Karri Saarinen", title: "Co-founder & CEO", company: "Linear App", email: "karri@linear.app", phone: "+1 (415) 554-0192", status: "CONTACTED", intentScore: 91, addedAt: "2 days ago" },
  { id: "lead-4", name: "Paul Copplestone", title: "CEO & Co-founder", company: "Supabase, Inc.", email: "paul@supabase.com", phone: "+1 (415) 901-4432", status: "QUALIFIED", intentScore: 89, addedAt: "3 days ago" },
  { id: "lead-5", name: "Sam Altman", title: "CEO", company: "OpenAI, LLC", email: "sam@openai.com", phone: "+1 (415) 778-9000", status: "NEW", intentScore: 99, addedAt: "4 days ago" },
];

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>(SEEDED_LEADS);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("ALL");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);

  const [newName, setNewName] = useState("");
  const [newCompany, setNewCompany] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newTitle, setNewTitle] = useState("");

  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus === "ALL" || lead.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const handleAddLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newEmail) return;

    const lead: Lead = {
      id: `lead-${Date.now()}`,
      name: newName,
      title: newTitle || "Decision Maker",
      company: newCompany || "Target Organization",
      email: newEmail,
      phone: "+1 (555) 019-2831",
      status: "NEW",
      intentScore: 88,
      addedAt: "Just now"
    };

    setLeads([lead, ...leads]);
    setNewName("");
    setNewEmail("");
    setNewCompany("");
    setIsAddModalOpen(false);
  };

  const getStatusBadge = (status: Lead["status"]) => {
    switch (status) {
      case "QUALIFIED": return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "CONTACTED": return "bg-purple-50 text-purple-700 border-purple-200";
      case "RESEARCHED": return "bg-blue-50 text-blue-700 border-blue-200";
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
              <Users className="w-6 h-6 text-slate-700" />
              <span>Target Contacts & Lead Intelligence</span>
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Verified decision-maker leads linked directly to revenue opportunities.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => setIsImportModalOpen(true)}
              className="px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-700 hover:bg-slate-50 flex items-center space-x-1.5 shadow-xs"
            >
              <Upload className="w-4 h-4" />
              <span>Import CSV</span>
            </button>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition-all flex items-center space-x-1.5 shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>Add Lead</span>
            </button>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search leads by name, email, or company..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-slate-900 bg-white"
            />
          </div>

          <div className="flex items-center space-x-1 bg-slate-100 p-1 rounded-xl">
            {["ALL", "NEW", "RESEARCHED", "CONTACTED", "QUALIFIED"].map((st) => (
              <button
                key={st}
                onClick={() => setSelectedStatus(st)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedStatus === st
                    ? "bg-white text-slate-900 shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        {/* Leads Table */}
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
          {filteredLeads.length === 0 ? (
            <div className="p-12 text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
                <Users className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-bold text-slate-900">No Leads Found</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Import a CSV file or add new leads to start running autonomous outreach sequences.
                </p>
              </div>
              <button
                onClick={() => setIsAddModalOpen(true)}
                className="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800"
              >
                Add Your First Lead
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50/50 text-slate-500 font-semibold uppercase tracking-wider text-[11px]">
                    <th className="p-4">Lead Name</th>
                    <th className="p-4">Company</th>
                    <th className="p-4">Contact Info</th>
                    <th className="p-4">Intent Score</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-right">Added</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {filteredLeads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="p-4">
                        <div className="font-bold text-slate-900 text-sm">{lead.name}</div>
                        <div className="text-[11px] text-slate-400">{lead.title}</div>
                      </td>
                      <td className="p-4">
                        <div className="font-semibold text-slate-800 flex items-center space-x-1">
                          <Building2 className="w-3.5 h-3.5 text-slate-400" />
                          <span>{lead.company}</span>
                        </div>
                      </td>
                      <td className="p-4 space-y-0.5">
                        <div className="flex items-center space-x-1 text-slate-700 font-mono text-[11px]">
                          <Mail className="w-3 h-3 text-slate-400" />
                          <span>{lead.email}</span>
                        </div>
                        <div className="flex items-center space-x-1 text-slate-500 text-[11px]">
                          <Phone className="w-3 h-3 text-slate-400" />
                          <span>{lead.phone}</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className="inline-flex items-center px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-bold border border-emerald-200">
                          <Sparkles className="w-3 h-3 mr-1 text-emerald-600" />
                          {lead.intentScore}%
                        </span>
                      </td>
                      <td className="p-4">
                        <span className={`inline-block px-2.5 py-1 rounded-full text-[11px] font-bold border ${getStatusBadge(lead.status)}`}>
                          {lead.status}
                        </span>
                      </td>
                      <td className="p-4 text-right text-slate-400">{lead.addedAt}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Add Lead Modal */}
        {isAddModalOpen && (
          <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white rounded-2xl border border-slate-200 shadow-2xl p-6 space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <h3 className="text-lg font-bold text-slate-900">Add New Lead</h3>
                <button onClick={() => setIsAddModalOpen(false)} className="p-1 text-slate-400 hover:text-slate-900">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleAddLead} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Full Name</label>
                  <input
                    type="text"
                    required
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder="e.g. Sarah Chen"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Job Title</label>
                  <input
                    type="text"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="e.g. VP of Product"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Company Name</label>
                  <input
                    type="text"
                    value={newCompany}
                    onChange={(e) => setNewCompany(e.target.value)}
                    placeholder="e.g. Acme Corp"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Email Address</label>
                  <input
                    type="email"
                    required
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    placeholder="sarah@acme.com"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-slate-900"
                  />
                </div>

                <div className="flex items-center justify-end space-x-3 pt-4 border-t border-slate-100">
                  <button type="button" onClick={() => setIsAddModalOpen(false)} className="px-4 py-2 text-xs font-semibold text-slate-600">
                    Cancel
                  </button>
                  <button type="submit" className="px-5 py-2 bg-slate-900 text-white rounded-xl text-xs font-semibold hover:bg-slate-800">
                    Save Lead
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* CSV Import Modal */}
        {isImportModalOpen && (
          <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white rounded-2xl border border-slate-200 shadow-2xl p-6 space-y-6 text-center">
              <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-800">
                <FileSpreadsheet className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-slate-900">Import CSV Lead List</h3>
                <p className="text-xs text-slate-500">Upload CSV with headers: name, title, company, email, phone</p>
              </div>
              <div className="p-8 border-2 border-dashed border-slate-200 rounded-xl bg-slate-50/50 hover:bg-slate-100/50 transition-colors cursor-pointer">
                <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                <p className="text-xs font-bold text-slate-700">Drag & drop CSV file here</p>
                <p className="text-[11px] text-slate-400 mt-1">or click to browse files</p>
              </div>
              <div className="flex justify-end space-x-3">
                <button onClick={() => setIsImportModalOpen(false)} className="px-4 py-2 text-xs font-semibold text-slate-600">
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardShell>
  );
}
