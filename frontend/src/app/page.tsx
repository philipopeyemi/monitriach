"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Building2, 
  BrainCircuit, 
  Cpu, 
  Send, 
  Bot, 
  TrendingUp, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles,
  Zap,
  Globe,
  Database,
  Layers,
  ChevronDown,
  ShieldCheck,
  BarChart3,
  Users
} from "lucide-react";

export default function MarketingLandingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const features = [
    { title: "Revenue Opportunity Engine", description: "Every lead, account, contact, research signal, and deal structured into a unified Revenue Opportunity business object.", icon: Building2 },
    { title: "Autonomous AI Executive", description: "Orchestrates research, offer creation, copy generation, deliverability verification, and calendar booking automatically.", icon: Cpu },
    { title: "Company Intelligence System", description: "Ingests services, case studies, pricing, voice, sales assets, and objections to build deep context memory.", icon: Database },
    { title: "AEGIS Offer Engine", description: "Automatically formulates high-converting, value-driven offers tailored specifically to each target company's pain points.", icon: Sparkles },
    { title: "Deliverability Safeguard", description: "Performs real-time domain health checks, SPF/DKIM/DMARC verification, and spam-trigger prevention before sending.", icon: ShieldCheck },
    { title: "Multi-Channel AI Outreach", description: "Automates hyper-personalized outreach across cold email (SES) and LinkedIn with contextual follow-up logic.", icon: Send },
    { title: "Contextual Inbox & AEGIS Reply", description: "Categorizes incoming replies, assesses buying intent, and crafts human-like contextual responses instantly.", icon: Bot },
    { title: "Meeting & Calendar Manager", description: "Handles scheduling, qualification checks, calendar conflict resolution, and automated meeting reminders.", icon: Users },
    { title: "Full Funnel Revenue Analytics", description: "Tracks open rates, response sentiment, pipeline conversion speed, and total closed-won revenue in real time.", icon: BarChart3 },
    { title: "Multi-Tenant Workspaces", description: "Built for teams and agencies with organization hierarchy, role-based access control (RBAC), and team collaboration.", icon: Layers },
    { title: "Supabase Security & Auth", description: "Enterprise-grade authentication, row-level security (RLS) policies, and encrypted business memory storage.", icon: CheckCircle2 },
    { title: "Web Intelligence Crawler", description: "Extracts live company news, tech stacks, pricing models, and key executives directly from target websites.", icon: Globe },
  ];

  const pricingTiers = [
    {
      name: "Starter",
      price: "$99",
      period: "/month",
      description: "Perfect for founders and solo operators launching revenue outreach.",
      features: [
        "Up to 500 Revenue Opportunities",
        "1 AI Executive Agent",
        "Company Intelligence (Base Memory)",
        "Amazon SES Outreach",
        "Basic Analytics & CRM",
      ],
      cta: "Start Free Trial",
      popular: false,
    },
    {
      name: "Growth",
      price: "$299",
      period: "/month",
      description: "For growing revenue teams scaling outbound pipeline & booking meetings.",
      features: [
        "Up to 2,500 Revenue Opportunities",
        "Full AI Executive Fleet (7 Agents)",
        "AEGIS Offer & Copywriter Engine",
        "Deliverability Safeguards",
        "Multi-Channel Outreach (Email & LinkedIn)",
        "Priority Support & API Access",
      ],
      cta: "Get Started",
      popular: true,
    },
    {
      name: "Scale / Enterprise",
      price: "$799",
      period: "/month",
      description: "For established agencies and sales teams requiring custom volume & SLA.",
      features: [
        "Unlimited Revenue Opportunities",
        "Custom AI Executive Workflows",
        "Dedicated IP & Inbox Warming",
        "Multi-Tenant Agency Workspaces",
        "Dedicated Account Executive & SLA",
        "Custom Supabase RLS & Export",
      ],
      cta: "Contact Sales",
      popular: false,
    },
  ];

  const faqs = [
    {
      q: "How is MONITRIACH different from standard AI email sequencers?",
      a: "Standard tools are glorified email senders with basic template placeholders. MONITRIACH is an Autonomous AI Revenue Operating System. It centers everything on the Revenue Opportunity object, combining website research, company intelligence memory, offer creation, deliverability checks, and meeting management into one unified autonomous loop."
    },
    {
      q: "Does MONITRIACH integrate with Supabase and my existing database?",
      a: "Yes. MONITRIACH is built natively on Supabase for enterprise authentication, real-time data sync, and Row Level Security (RLS). You can bring your own Supabase credentials or use our hosted infrastructure."
    },
    {
      q: "How does the AEGIS engine craft personalized outreach?",
      a: "AEGIS analyzes target company website intelligence, industry trends, and your stored Company Intelligence (services, case studies, pricing, objections). It then formulates a tailored value proposition and crafts hyper-personalized email copy guaranteed to resonate with decision-makers."
    },
    {
      q: "Can I manage multiple client accounts or team workspaces?",
      a: "Yes. MONITRIACH features a multi-tenant hierarchy: User -> Organization -> Workspace -> Revenue Opportunities. You can create separate workspaces for different products, client accounts, or sales regions."
    },
    {
      q: "Is there a free trial or demo available?",
      a: "Yes! You can sign up today and experience the 6-step interactive onboarding to provision your Organization, Workspace, and initial Revenue Opportunity queue."
    }
  ];

  return (
    <div className="min-h-screen bg-[#FFFFFF] text-slate-900 font-sans antialiased selection:bg-slate-900 selection:text-white">
      {/* Navigation Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-slate-900 flex items-center justify-center text-white font-black tracking-widest text-base shadow-sm">
              M
            </div>
            <span className="font-bold text-xl tracking-tight text-slate-900">MONITRIACH</span>
            <span className="hidden sm:inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200">
              Revenue OS
            </span>
          </div>

          <nav className="hidden md:flex items-center space-x-8 text-xs font-semibold text-slate-600">
            <a href="#how-it-works" className="hover:text-slate-900 transition-colors">How It Works</a>
            <a href="#features" className="hover:text-slate-900 transition-colors">Features</a>
            <a href="#ai-executive" className="hover:text-slate-900 transition-colors">AI Executive</a>
            <a href="#pricing" className="hover:text-slate-900 transition-colors">Pricing</a>
            <a href="#faq" className="hover:text-slate-900 transition-colors">FAQ</a>
          </nav>

          <div className="flex items-center space-x-3">
            <Link 
              href="/login" 
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-50 transition-all"
            >
              Sign In
            </Link>
            <Link 
              href="/register" 
              className="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition-all shadow-sm flex items-center space-x-1.5"
            >
              <span>Get Started</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-20 pb-16 md:pt-28 md:pb-24 border-b border-slate-100 bg-gradient-to-b from-slate-50/50 via-white to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-slate-800 text-xs font-medium mb-6">
            <Sparkles className="w-3.5 h-3.5 text-slate-700" />
            <span>Autonomous AI Revenue Operating System</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-slate-950 tracking-tight max-w-4xl mx-auto leading-[1.1] mb-6">
            Turn Leads Into <span className="underline decoration-slate-300 underline-offset-8">Revenue Opportunities</span> On Autopilot.
          </h1>

          <p className="text-base sm:text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
            MONITRIACH combines company intelligence, research crawling, AEGIS offer formulation, deliverability safeguards, and multi-channel outreach into one unified AI operating system.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link 
              href="/register" 
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-slate-900 text-white text-sm font-semibold hover:bg-slate-800 transition-all shadow-md flex items-center justify-center space-x-2"
            >
              <span>Start Free Trial</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link 
              href="/dashboard" 
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-white border border-slate-200 text-slate-800 text-sm font-semibold hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm flex items-center justify-center space-x-2"
            >
              <span>Launch Live Cockpit Demo</span>
            </Link>
          </div>

          {/* Hero Visual Mockup */}
          <div className="max-w-5xl mx-auto rounded-2xl bg-white border border-slate-200 shadow-2xl p-4 sm:p-6 text-left">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-slate-200" />
                <div className="w-3 h-3 rounded-full bg-slate-200" />
                <div className="w-3 h-3 rounded-full bg-slate-200" />
                <span className="text-xs font-mono text-slate-400 ml-2">app.monitriach.com/opportunities</span>
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center space-x-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>AI Executive Active</span>
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Step 1 • Intelligence</span>
                <h4 className="text-sm font-bold text-slate-900">Website Research Crawl</h4>
                <p className="text-xs text-slate-600">Extracted tech stack, hiring signals & pricing model for Stripe, Inc.</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Step 2 • AEGIS Offer</span>
                <h4 className="text-sm font-bold text-slate-900">Value Proposition Formulation</h4>
                <p className="text-xs text-slate-600">Mapped "Enterprise AI Infrastructure" offer with 98% match confidence.</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Step 3 • Execution</span>
                <h4 className="text-sm font-bold text-slate-900">Multi-Channel Outreach</h4>
                <p className="text-xs text-slate-600">Delivered personalized email (SES) + LinkedIn connection request.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted By Section */}
      <section className="py-12 border-b border-slate-100 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-xs font-semibold text-slate-400 uppercase tracking-widest mb-8">
            Powering Next-Gen Revenue Teams & B2B Agencies
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 opacity-60 text-slate-700 font-bold text-lg tracking-wider">
            <span>STRIPE</span>
            <span>VERCEL</span>
            <span>LINEAR</span>
            <span>SUPABASE</span>
            <span>OPENROUTER</span>
            <span>GROQ</span>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 md:py-28 border-b border-slate-100 bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Autonomous Workflow</h2>
            <h3 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
              The 5-Stage Revenue Opportunity Pipeline
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 text-center">
            {[
              { step: "01", title: "Ingest Lead", desc: "Imports targets from CSV, API, or CRM into unified Revenue Opportunities." },
              { step: "02", title: "AI Research", desc: "Crawls websites, extracts pain points, and builds business memory." },
              { step: "03", title: "AEGIS Offer", desc: "Formulates tailored value propositions and hyper-personalized copy." },
              { step: "04", title: "Deliverability", desc: "Validates inbox health, SPF/DKIM, and spam scores before sending." },
              { step: "05", title: "Meeting Booked", desc: "Categorizes replies, handles objections, and books meetings automatically." },
            ].map((s, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm relative">
                <span className="text-2xl font-black text-slate-300 block mb-2">{s.step}</span>
                <h4 className="text-base font-bold text-slate-900 mb-2">{s.title}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid Section */}
      <section id="features" className="py-20 md:py-28 border-b border-slate-100 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Engine Architecture</h2>
            <h3 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
              Everything You Need to Scale Autonomous Revenue
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feat, i) => (
              <div 
                key={i} 
                className="p-6 rounded-2xl bg-white border border-slate-200/80 hover:border-slate-300 shadow-sm hover:shadow-md transition-all group"
              >
                <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-800 mb-4 group-hover:bg-slate-900 group-hover:text-white transition-colors">
                  <feat.icon className="w-5 h-5" />
                </div>
                <h4 className="text-base font-bold text-slate-900 mb-2">{feat.title}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{feat.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 md:py-28 border-b border-slate-100 bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Transparent Pricing</h2>
            <h3 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
              Invest in Autonomous Revenue Operations
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingTiers.map((tier, i) => (
              <div 
                key={i} 
                className={`p-8 rounded-2xl bg-white border ${tier.popular ? "border-slate-900 ring-2 ring-slate-900 shadow-xl" : "border-slate-200 shadow-sm"} relative flex flex-col justify-between`}
              >
                {tier.popular && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-slate-900 text-white text-[11px] font-bold uppercase tracking-wider">
                    Most Popular
                  </span>
                )}

                <div>
                  <h4 className="text-lg font-bold text-slate-900 mb-2">{tier.name}</h4>
                  <p className="text-xs text-slate-500 mb-6">{tier.description}</p>

                  <div className="flex items-baseline space-x-1 mb-8">
                    <span className="text-4xl font-extrabold text-slate-950">{tier.price}</span>
                    <span className="text-xs font-semibold text-slate-500">{tier.period}</span>
                  </div>

                  <ul className="space-y-3 text-xs text-slate-600 mb-8">
                    {tier.features.map((feat, idx) => (
                      <li key={idx} className="flex items-center space-x-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  href="/register"
                  className={`w-full py-3 rounded-xl text-xs font-semibold transition-all text-center ${
                    tier.popular 
                      ? "bg-slate-900 text-white hover:bg-slate-800 shadow-md" 
                      : "bg-slate-100 text-slate-900 hover:bg-slate-200"
                  }`}
                >
                  {tier.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 md:py-28 border-b border-slate-100 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Got Questions?</h2>
            <h3 className="text-3xl font-bold text-slate-900 tracking-tight">Frequently Asked Questions</h3>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div 
                key={i} 
                className="border border-slate-200 rounded-xl overflow-hidden bg-white transition-all"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full p-5 text-left font-bold text-sm text-slate-900 flex items-center justify-between hover:bg-slate-50/50 transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform ${openFaq === i ? "rotate-180" : ""}`} />
                </button>

                {openFaq === i && (
                  <div className="p-5 pt-0 text-xs text-slate-600 border-t border-slate-100 leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-white text-slate-500 text-xs border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-3">
            <div className="w-7 h-7 rounded-lg bg-slate-900 flex items-center justify-center text-white font-bold text-xs">
              M
            </div>
            <span className="font-bold text-slate-900">MONITRIACH</span>
            <span>© 2026 MONITRIACH Inc. All rights reserved.</span>
          </div>

          <div className="flex items-center space-x-6">
            <Link href="/login" className="hover:text-slate-900 transition-colors">Sign In</Link>
            <Link href="/register" className="hover:text-slate-900 transition-colors">Register</Link>
            <Link href="/dashboard" className="hover:text-slate-900 transition-colors">Cockpit Demo</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
