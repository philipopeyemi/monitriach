"use client";

import React, { useState } from "react";
import {
  Settings,
  Building,
  Users,
  Shield,
  Cpu,
  Mail,
  Zap,
  CreditCard,
  Lock,
  Bell,
  Palette,
  FileText,
  CheckCircle2,
  Sparkles
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export default function SettingsPage() {
  const [selectedProvider, setSelectedProvider] = useState("openrouter");

  const sections = [
    { id: "workspace", label: "Workspace", icon: Settings },
    { id: "organization", label: "Organization", icon: Building },
    { id: "members", label: "Members", icon: Users },
    { id: "roles", label: "Roles & Permissions", icon: Shield },
    { id: "ai-providers", label: "AI Providers Manager", icon: Cpu },
    { id: "email", label: "Email Infrastructure", icon: Mail },
    { id: "integrations", label: "Integrations", icon: Zap },
    { id: "billing", label: "Billing & Plans", icon: CreditCard },
    { id: "security", label: "Security & Auth", icon: Lock },
    { id: "notifications", label: "Notification Rules", icon: Bell },
    { id: "appearance", label: "Appearance", icon: Palette },
    { id: "logs", label: "System Audit Logs", icon: FileText },
  ];

  const aiProviders = [
    { id: "openrouter", name: "OpenRouter", model: "anthropic/claude-3.5-sonnet", status: "Active (Default)" },
    { id: "huggingface", name: "Hugging Face", model: "meta-llama/Llama-3-70b-instruct", status: "Available" },
    { id: "ollama", name: "Ollama (Local)", model: "llama3:latest", status: "Available" },
    { id: "gemini", name: "Google Gemini", model: "gemini-1.5-pro", status: "Available" },
    { id: "openai", name: "OpenAI", model: "gpt-4o", status: "Available" },
    { id: "anthropic", name: "Anthropic", model: "claude-3-5-sonnet-20240620", status: "Available" },
    { id: "deepseek", name: "DeepSeek", model: "deepseek-coder", status: "Available" },
    { id: "groq", name: "Groq", model: "llama3-70b-8192", status: "Available" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200/80 pb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">System Settings</h1>
          <p className="text-sm text-slate-500 mt-1">
            Configure MONITRIACH CORE workspace, AI Provider Manager, team roles, and system infrastructure
          </p>
        </div>
      </div>

      <Tabs defaultValue="ai-providers" className="w-full space-y-6">
        <TabsList className="bg-slate-100/80 p-1 border border-slate-200/60 rounded-xl flex flex-wrap gap-1">
          {sections.map((s) => {
            const Icon = s.icon;
            return (
              <TabsTrigger key={s.id} value={s.id} className="text-xs font-semibold py-2 px-3 flex items-center space-x-2">
                <Icon className="h-3.5 w-3.5" />
                <span>{s.label}</span>
              </TabsTrigger>
            );
          })}
        </TabsList>

        {/* AI Providers Tab Content */}
        <TabsContent value="ai-providers" className="space-y-6">
          <Card className="shadow-card border-slate-200">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base font-semibold flex items-center space-x-2">
                    <Cpu className="h-5 w-5 text-purple-600" />
                    <span>AI Provider Manager</span>
                  </CardTitle>
                  <CardDescription className="mt-1">
                    Multi-provider orchestration across OpenRouter, Hugging Face, Ollama, Gemini, OpenAI, Anthropic, DeepSeek, and Groq
                  </CardDescription>
                </div>
                <Badge variant="success">8 Providers Ready</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {aiProviders.map((p) => (
                  <div
                    key={p.id}
                    onClick={() => setSelectedProvider(p.id)}
                    className={`p-4 rounded-xl border cursor-pointer transition-all ${
                      selectedProvider === p.id
                        ? "border-slate-900 bg-slate-900 text-white shadow-md"
                        : "border-slate-200 bg-white hover:border-slate-300 text-slate-900"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold text-sm">{p.name}</h4>
                      {selectedProvider === p.id && <CheckCircle2 className="h-4 w-4 text-emerald-400" />}
                    </div>
                    <p className={`text-xs mt-1 font-mono ${selectedProvider === p.id ? "text-slate-300" : "text-slate-500"}`}>
                      {p.model}
                    </p>
                    <span className={`text-[10px] mt-2 inline-block font-semibold ${selectedProvider === p.id ? "text-amber-300" : "text-emerald-600"}`}>
                      {p.status}
                    </span>
                  </div>
                ))}
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3 mt-4">
                <h4 className="text-xs font-semibold text-slate-900 uppercase tracking-wider">Provider API Configuration</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs text-slate-600 font-medium">API Key</label>
                    <Input type="password" placeholder="sk-or-v1-..." defaultValue="sk-or-v1-demo-key-123" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs text-slate-600 font-medium">Default Model Endpoint</label>
                    <Input type="text" placeholder="anthropic/claude-3.5-sonnet" defaultValue="anthropic/claude-3.5-sonnet" />
                  </div>
                </div>
                <Button size="sm" className="mt-2">
                  Save Provider Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Generic Content for other tabs */}
        {sections.filter(s => s.id !== "ai-providers").map((s) => (
          <TabsContent key={s.id} value={s.id}>
            <Card className="shadow-card border-slate-200 p-8 text-center min-h-[240px] flex flex-col items-center justify-center">
              <s.icon className="h-10 w-10 text-slate-300 mb-2" />
              <h3 className="text-base font-semibold text-slate-900">{s.label} Configuration</h3>
              <p className="text-xs text-slate-500 max-w-sm mt-1">
                Manage {s.label.toLowerCase()} parameters, access controls, and organization defaults.
              </p>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
