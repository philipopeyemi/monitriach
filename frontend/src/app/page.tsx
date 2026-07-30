"use client";

import Link from "next/link";
import { useState } from "react";
import { 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  ChevronRight, 
  Zap, 
  ShieldCheck, 
  BrainCircuit, 
  Search, 
  Mail, 
  Calendar, 
  TrendingUp, 
  Building2, 
  BarChart3, 
  HelpCircle,
  Play,
  Layers,
  Cpu,
  Database
} from "lucide-react";

export default function LandingPage() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-[#FFFFFF] text-slate-900 font-sans selection:bg-slate-900 selection:text-white">
      {/* 1. Header / Navigation */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center text-white font-bold text-lg shadow-sm">
              M
            </div>
            <span className="font-semibold text-lg tracking-tight text-slate-900">MONITRIACH</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-medium border border-slate-200">
              Autonomous OS
            </span>
          </div>

          <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-slate-600">
            <a href="#how-it-works" className="hover:text-slate-900 transition-colors">How It Works</a>
            <a href="#features" className="hover:text-slate-900 transition-colors">Features</a>
            <a href="#ai-executive" className="hover:text-slate-900 transition-colors">AI Executive</a>
            <a href="#pricing" className="hover:text-slate-900 transition-colors">Pricing</a>
            <a href="#faq" className="hover:text-slate-900 transition-colors">FAQ</a>
          </nav>

          <div className="flex items-center space-x-4">
            <Link 
              href="/login" 
              className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors px-3 py-2"
            >
              Sign In
            </Link>
            <Link 
              href="/register" 
              className="text-sm font-medium bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-lg transition-all shadow-sm hover:shadow"
            >
              Start Free
            </Link>
          </div>
        </div>
      </header>

      {/* 2. Hero Section */}
      <section className="pt-20 pb-16 px-6 bg-gradient-to-b from-slate-50/50 via-white to-white">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-xs font-medium text-slate-700 mb-8 animate-fade-in">
            <Sparkles className="w-3.5 h-3.5 text-slate-900" />
            <span>Autonomous AI Revenue Operating System</span>
          </div>

          <h1 className="text-5xl sm:text-6xl font-bold tracking-tight text-slate-950 mb-6 leading-[1.15]">
            Operate your entire outbound revenue engine with an <span className="underline decoration-slate-300 underline-offset-8">AI Executive</span>
          </h1>

          <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-10 leading-relaxed">
            Research companies. Understand buyers. Generate personalized outreach. Manage Revenue Opportunities. Continuous learning powered by persistent business memory.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link 
              href="/register" 
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-medium shadow-md hover:shadow-lg transition-all flex items-center justify-center space-x-2 text-base"
            >
              <span>Start Free Trial</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link 
              href="/login" 
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 font-medium border border-slate-200 shadow-sm transition-all flex items-center justify-center space-x-2 text-base"
            >
              <Play className="w-4 h-4 text-slate-600 fill-slate-600" />
              <span>Watch Overview</span>
            </Link>
          </div>

          {/* Hero Illustration / Workflow Cards */}
          <div className="relative mx-auto max-w-5xl rounded-2xl border border-slate-200/80 bg-white p-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4 px-2">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-amber-400" />
                <div className="w-3 h-3 rounded-full bg-emerald-400" />
                <span className="text-xs text-slate-400 ml-2 font-mono">monitriach.ai / cockpit</span>
              </div>
              <div className="flex items-center space-x-2 text-xs text-slate-500 font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>AI Executive Active</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
              {/* Card 1 */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/60">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Revenue Opportunity</span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-medium">96% Fit</span>
                </div>
                <h4 className="font-semibold text-slate-900 mb-1">Stripe, Inc.</h4>
                <p className="text-xs text-slate-500 mb-3">Fintech • Enterprise • 8,000+ employees</p>
                <div className="space-y-1.5 text-xs text-slate-600 border-t border-slate-200/60 pt-2">
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Website Crawled & Analyzed</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Pain Points Identified</span>
                  </div>
                </div>
              </div>

              {/* Card 2 */}
              <div className="p-4 rounded-xl bg-slate-900 text-white border border-slate-800 shadow-md">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">AI Executive</span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 font-medium">Reasoning</span>
                </div>
                <h4 className="font-semibold text-white mb-1">AEGIS Core Dispatcher</h4>
                <p className="text-xs text-slate-400 mb-3">Hypothesis Generation & Offer Mapping</p>
                <div className="p-2.5 rounded-lg bg-slate-800/80 border border-slate-700/60 text-xs font-mono text-slate-300">
                  Select offer: "Enterprise AI Scaling Framework" (Confidence 0.94)
                </div>
              </div>

              {/* Card 3 */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/60">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Autonomous Action</span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 font-medium">Scheduled</span>
                </div>
                <h4 className="font-semibold text-slate-900 mb-1">Personalized Outreach</h4>
                <p className="text-xs text-slate-500 mb-3">Amazon SES • Deliverability Pass</p>
                <div className="flex items-center space-x-2 text-xs text-slate-600 border-t border-slate-200/60 pt-2">
                  <Calendar className="w-3.5 h-3.5 text-slate-500" />
                  <span>Meeting Request Sent to VP Sales</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Trusted By Ticker */}
      <section className="py-12 border-y border-slate-100 bg-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-8">
            Engineered for high-performing B2B sales organizations
          </p>
          <div className="flex flex-wrap items-center justify-center gap-12 text-slate-400 font-semibold text-xl">
            <span className="hover:text-slate-800 transition-colors">ACME CORP</span>
            <span className="hover:text-slate-800 transition-colors">STRIPE</span>
            <span className="hover:text-slate-800 transition-colors">LINEAR</span>
            <span className="hover:text-slate-800 transition-colors">VERCEL</span>
            <span className="hover:text-slate-800 transition-colors">RAYCAST</span>
          </div>
        </div>
      </section>

      {/* 4. How It Works Section */}
      <section id="how-it-works" className="py-24 bg-slate-50/50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-3">Autonomous Pipeline</h2>
            <h3 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
              From lead intake to booked meeting, fully automated
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { step: "01", icon: Search, title: "Website Research", desc: "Crawls domain, extracts services, tech stack, and key executives automatically." },
              { step: "02", icon: BrainCircuit, title: "Company Intelligence", desc: "Builds business memory mapping pain points, offers, and sales assets." },
              { step: "03", icon: Mail, title: "AEGIS Generation", desc: "Drafts hyper-personalized outreach backed by quality and deliverability checks." },
              { step: "04", icon: Calendar, title: "Meeting Booking", desc: "Handles replies, manages follow-ups, and logs meetings directly into CRM." },
            ].map((item, index) => (
              <div key={index} className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:shadow-md transition-all">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono font-bold text-slate-400">{item.step}</span>
                  <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-900">
                    <item.icon className="w-5 h-5" />
                  </div>
                </div>
                <h4 className="text-lg font-semibold text-slate-900 mb-2">{item.title}</h4>
                <p className="text-sm text-slate-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Features Grid */}
      <section id="features" className="py-24 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-3">Core Modules</h2>
            <h3 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
              Designed as an AI Revenue Operating System
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Building2, title: "Revenue Opportunities", desc: "Replaces raw lead lists with unified Revenue Opportunities tracking research, signals, and buyer context." },
              { icon: Database, title: "Company Intelligence", desc: "Stores offers, case studies, brand voice, pricing, FAQs, and objections for context-aware AI." },
              { icon: Cpu, title: "Business Memory", desc: "Persistent memory store preserving past research, reasoning, email drafts, and reply history." },
              { icon: BrainCircuit, title: "AI Executive Supervision", desc: "Master supervisory agent directing research, copywriting, quality checks, and deliverability." },
              { icon: Zap, title: "AEGIS Engine", desc: "Generates tailored email copy enforcing deliverability scoring and spam word avoidance." },
              { icon: BarChart3, title: "Revenue Analytics", desc: "Full funnel reporting tracking pipeline value, response velocity, and meeting conversion rates." },
            ].map((feature, i) => (
              <div key={i} className="p-8 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:border-slate-300 transition-all">
                <div className="w-12 h-12 rounded-xl bg-slate-900 text-white flex items-center justify-center mb-6">
                  <feature.icon className="w-6 h-6" />
                </div>
                <h4 className="text-xl font-semibold text-slate-900 mb-3">{feature.title}</h4>
                <p className="text-slate-600 text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Pricing Section */}
      <section id="pricing" className="py-24 bg-slate-50/50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-3">Transparent Pricing</h2>
            <h3 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight mb-6">
              Predictable plans for growing revenue teams
            </h3>

            {/* Toggle */}
            <div className="inline-flex items-center p-1 rounded-xl bg-slate-200/80 text-xs font-medium">
              <button
                onClick={() => setBillingCycle("monthly")}
                className={`px-4 py-2 rounded-lg transition-all ${billingCycle === "monthly" ? "bg-white text-slate-900 shadow-sm" : "text-slate-600"}`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle("yearly")}
                className={`px-4 py-2 rounded-lg transition-all ${billingCycle === "yearly" ? "bg-white text-slate-900 shadow-sm" : "text-slate-600"}`}
              >
                Yearly (20% Off)
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Starter */}
            <div className="p-8 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between">
              <div>
                <h4 className="text-lg font-semibold text-slate-900 mb-2">Starter</h4>
                <p className="text-sm text-slate-500 mb-6">For emerging founders & solo sales leaders.</p>
                <div className="flex items-baseline space-x-1 mb-6">
                  <span className="text-4xl font-bold text-slate-950">{billingCycle === "monthly" ? "$99" : "$79"}</span>
                  <span className="text-slate-500 text-sm">/ month</span>
                </div>
                <ul className="space-y-3 text-sm text-slate-600 mb-8">
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Up to 500 Revenue Opportunities</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Company Intelligence Memory</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Amazon SES Deliverability Pass</span>
                  </li>
                </ul>
              </div>
              <Link href="/register" className="w-full py-3 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-800 font-medium text-center transition-all">
                Get Started
              </Link>
            </div>

            {/* Growth - Highlighted */}
            <div className="p-8 rounded-2xl bg-slate-900 text-white shadow-xl flex flex-col justify-between relative transform md:-translate-y-2">
              <div className="absolute -top-3 right-6 bg-emerald-500 text-slate-950 font-bold text-xs uppercase px-3 py-1 rounded-full tracking-wider">
                Most Popular
              </div>
              <div>
                <h4 className="text-lg font-semibold text-white mb-2">Growth</h4>
                <p className="text-sm text-slate-400 mb-6">For scaling revenue teams & agencies.</p>
                <div className="flex items-baseline space-x-1 mb-6">
                  <span className="text-4xl font-bold text-white">{billingCycle === "monthly" ? "$299" : "$239"}</span>
                  <span className="text-slate-400 text-sm">/ month</span>
                </div>
                <ul className="space-y-3 text-sm text-slate-300 mb-8">
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Up to 2,500 Revenue Opportunities</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>AI Executive Master Supervision</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>AEGIS Personalization Engine</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Multi-Workspace Support</span>
                  </li>
                </ul>
              </div>
              <Link href="/register" className="w-full py-3 rounded-xl bg-white hover:bg-slate-100 text-slate-900 font-semibold text-center transition-all">
                Start 14-Day Free Trial
              </Link>
            </div>

            {/* Scale */}
            <div className="p-8 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between">
              <div>
                <h4 className="text-lg font-semibold text-slate-900 mb-2">Scale</h4>
                <p className="text-sm text-slate-500 mb-6">For enterprise sales organizations.</p>
                <div className="flex items-baseline space-x-1 mb-6">
                  <span className="text-4xl font-bold text-slate-950">{billingCycle === "monthly" ? "$799" : "$639"}</span>
                  <span className="text-slate-500 text-sm">/ month</span>
                </div>
                <ul className="space-y-3 text-sm text-slate-600 mb-8">
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Unlimited Revenue Opportunities</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Custom AI Provider Hierarchy</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Dedicated Deliverability Engineer</span>
                  </li>
                </ul>
              </div>
              <Link href="/register" className="w-full py-3 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-800 font-medium text-center transition-all">
                Contact Sales
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 7. FAQ Section */}
      <section id="faq" className="py-24 bg-white border-b border-slate-100">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-3">FAQ</h2>
            <h3 className="text-3xl font-bold text-slate-900 tracking-tight">
              Frequently Asked Questions
            </h3>
          </div>

          <div className="space-y-4">
            {[
              { q: "How does MONITRIACH differ from email senders?", a: "MONITRIACH is an Autonomous AI Revenue Operating System. Rather than sending mass templates, it researches companies, builds persistent business memory, generates hypotheses, and operates under an AI Executive." },
              { q: "What is a Revenue Opportunity?", a: "A Revenue Opportunity is MONITRIACH's unified business object combining Company metadata, Contacts, Research, AI Reasoning, Business Memory, Email History, Replies, and Tasks." },
              { q: "Which AI models are supported?", a: "MONITRIACH implements a Free-First AI Provider Hierarchy including OpenRouter free models, Hugging Face Inference API, Ollama, Google Gemini, and Groq." },
              { q: "How is deliverability protected?", a: "All outgoing emails pass through the AEGIS Quality Agent and Amazon SES deliverability verifiers before dispatch." },
            ].map((faq, idx) => (
              <div key={idx} className="border border-slate-200 rounded-xl overflow-hidden">
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-5 text-left font-semibold text-slate-900 flex items-center justify-between hover:bg-slate-50 transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronRight className={`w-5 h-5 text-slate-400 transition-transform ${openFaq === idx ? "rotate-90" : ""}`} />
                </button>
                {openFaq === idx && (
                  <div className="p-5 pt-0 text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Footer */}
      <footer className="py-12 bg-slate-950 text-white">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6 border-b border-slate-800 pb-8 mb-8">
          <div className="flex items-center space-x-3">
            <div className="w-7 h-7 rounded-md bg-white text-slate-950 font-bold flex items-center justify-center text-sm">
              M
            </div>
            <span className="font-semibold text-base tracking-tight">MONITRIACH</span>
          </div>
          <p className="text-xs text-slate-400">
            © 2026 MONITRIACH CORE. Autonomous AI Revenue Operating System. All rights reserved.
          </p>
          <div className="flex space-x-6 text-xs text-slate-400">
            <Link href="/login" className="hover:text-white transition-colors">Login</Link>
            <Link href="/register" className="hover:text-white transition-colors">Register</Link>
            <a href="#privacy" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#terms" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
