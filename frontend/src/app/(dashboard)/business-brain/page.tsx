"use client";

import { useState } from "react";
import { 
  Database, 
  Sparkles, 
  FileText, 
  Tag, 
  Briefcase, 
  DollarSign, 
  Volume2, 
  ShieldAlert, 
  HelpCircle, 
  FolderArchive,
  Layers,
  Plus
} from "lucide-react";
import { DashboardShell } from "@/components/layout/DashboardShell";

export default function CompanyIntelligencePage() {
  const [activeCategory, setActiveCategory] = useState("services");

  const categories = [
    { id: "services", label: "Services & Products", icon: Briefcase, count: 6 },
    { id: "offers", label: "Value Offers", icon: Tag, count: 4 },
    { id: "testimonials", label: "Testimonials", icon: FileText, count: 12 },
    { id: "case_studies", label: "Case Studies", icon: FolderArchive, count: 8 },
    { id: "pricing", label: "Pricing Models", icon: DollarSign, count: 3 },
    { id: "brand_voice", label: "Brand Voice", icon: Volume2, count: 5 },
    { id: "competitors", label: "Competitors", icon: Layers, count: 7 },
    { id: "faqs", label: "FAQs", icon: HelpCircle, count: 15 },
    { id: "assets", label: "Sales Assets", icon: FileText, count: 9 },
    { id: "objections", label: "Objections & SOPs", icon: ShieldAlert, count: 11 },
    { id: "frameworks", label: "Sales Frameworks", icon: Sparkles, count: 4 },
  ];

  return (
    <DashboardShell>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 pb-6">
          <div>
            <div className="flex items-center space-x-2 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
              <span>Persistent Business Memory</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight flex items-center space-x-3">
              <Database className="w-7 h-7 text-slate-900" />
              <span>Company Intelligence</span>
            </h1>
          </div>

          <button className="px-4 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-medium hover:bg-slate-800 transition-all flex items-center space-x-2 shadow-sm">
            <Plus className="w-4 h-4" />
            <span>Add Memory Asset</span>
          </button>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`p-4 rounded-xl text-left border transition-all flex items-center justify-between ${
                  isActive 
                    ? "bg-slate-900 text-white border-slate-900 shadow-md" 
                    : "bg-white text-slate-800 border-slate-200/80 hover:border-slate-300 shadow-sm"
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Icon className={`w-4 h-4 ${isActive ? "text-white" : "text-slate-600"}`} />
                  <span className="text-xs font-semibold">{cat.label}</span>
                </div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  isActive ? "bg-slate-800 text-slate-300" : "bg-slate-100 text-slate-600"
                }`}>
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Memory Content Viewer */}
        <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm min-h-[300px]">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
            <h3 className="text-sm font-bold text-slate-900 capitalize">
              {categories.find(c => c.id === activeCategory)?.label} Storage
            </h3>
            <span className="text-xs text-emerald-600 font-medium flex items-center space-x-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Synced with AEGIS Context</span>
            </span>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono text-slate-700 leading-relaxed">
            {`{
  "category": "${activeCategory}",
  "total_records": ${categories.find(c => c.id === activeCategory)?.count},
  "last_updated": "${new Date().toISOString()}",
  "status": "READY_FOR_AI_INFERENCE"
}`}
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
