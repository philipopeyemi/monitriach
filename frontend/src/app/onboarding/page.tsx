"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { 
  Building2, 
  Globe, 
  Users, 
  Target, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  Briefcase,
  Layers
} from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";
import { supabase } from "@/lib/supabaseClient";

export default function OnboardingWizard() {
  const router = useRouter();
  const { completeOnboarding } = useAuthStore();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    companyName: "",
    industry: "B2B SaaS",
    website: "",
    teamSize: "1-10",
    primaryGoal: "More Qualified Meetings",
  });

  const industries = [
    "B2B SaaS", "Agencies & Consulting", "Enterprise Software", 
    "Fintech & Payments", "Healthcare IT", "E-Commerce Services",
    "DevTools & Infrastructure", "Cybersecurity", "Other"
  ];

  const teamSizes = [
    "1-10 Employees", "11-50 Employees", "51-200 Employees", 
    "201-500 Employees", "500+ Employees"
  ];

  const primaryGoals = [
    "More Qualified Meetings", "Higher Lead Quality", "Faster Sales Pipeline",
    "Autonomous Outbound AI", "Better Follow-up Automation"
  ];

  const handleNext = () => {
    if (step < 6) {
      setStep(step + 1);
    } else {
      finishOnboarding();
    }
  };

  const finishOnboarding = async () => {
    setIsSubmitting(true);
    const orgRecord = {
      id: `org-${Date.now()}`,
      company_name: formData.companyName || "My Organization",
      industry: formData.industry,
      website: formData.website || "https://organization.com",
      team_size: formData.teamSize,
      primary_goal: formData.primaryGoal,
      created_at: new Date().toISOString()
    };

    // 1. Save locally for bulletproof refresh persistence
    if (typeof window !== "undefined") {
      localStorage.setItem("monitriach_onboarding_cache", JSON.stringify(orgRecord));
    }

    // 2. Save to Supabase
    try {
      await supabase.from("onboarding_workspaces").insert([orgRecord]);
    } catch (err) {
      console.warn("Supabase onboarding insert notice:", err);
    }

    try {
      await completeOnboarding({
        companyName: orgRecord.company_name,
        industry: orgRecord.industry,
        website: orgRecord.website,
        teamSize: orgRecord.team_size,
        primaryGoal: orgRecord.primary_goal,
      });
      router.push("/dashboard");
    } catch (err) {
      console.error(err);
      router.push("/dashboard");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden">
        {/* Step Progress Header */}
        <div className="bg-slate-900 text-white p-6 border-b border-slate-800">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-emerald-400" />
              <span className="font-bold text-sm tracking-wide">MONITRIACH ONBOARDING</span>
            </div>
            <span className="text-xs text-slate-400 font-semibold">Step {step} of 6</span>
          </div>

          <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
            <div 
              className="bg-emerald-400 h-full transition-all duration-500 ease-out"
              style={{ width: `${(step / 6) * 100}%` }}
            />
          </div>
        </div>

        {/* Step Content */}
        <div className="p-8">
          {step === 1 && (
            <div className="space-y-6">
              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-slate-900 flex items-center space-x-2">
                  <Building2 className="w-6 h-6 text-slate-700" />
                  <span>What is your company or organization name?</span>
                </h2>
                <p className="text-xs text-slate-500">This provisions your default Organization space.</p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">Company / Organization Name</label>
                <input 
                  type="text" 
                  value={formData.companyName}
                  onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                  placeholder="e.g. Acme AI, Inc."
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900"
                />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-slate-900 flex items-center space-x-2">
                  <Briefcase className="w-6 h-6 text-slate-700" />
                  <span>Select your primary industry</span>
                </h2>
                <p className="text-xs text-slate-500">Helps AI Executive tune target buyer personas.</p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {industries.map((ind) => (
                  <button
                    key={ind}
                    onClick={() => setFormData({ ...formData, industry: ind })}
                    className={`p-3 rounded-xl border text-xs font-semibold text-left transition-all ${
                      formData.industry === ind 
                        ? "border-slate-900 bg-slate-900 text-white shadow-md" 
                        : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    {ind}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-slate-900 flex items-center space-x-2">
                  <Globe className="w-6 h-6 text-slate-700" />
                  <span>What is your company website domain?</span>
                </h2>
                <p className="text-xs text-slate-500">Used by Company Intelligence engine to extract your value proposition.</p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">Company Website URL</label>
                <input 
                  type="text" 
                  value={formData.website}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  placeholder="https://acme.com"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900"
                />
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-6">
              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-slate-900 flex items-center space-x-2">
                  <Users className="w-6 h-6 text-slate-700" />
                  <span>What is your current team size?</span>
                </h2>
                <p className="text-xs text-slate-500">Configures default workspace seats and permissions.</p>
              </div>

              <div className="space-y-2">
                {teamSizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setFormData({ ...formData, teamSize: size })}
                    className={`w-full p-4 rounded-xl border text-xs font-bold text-left transition-all flex items-center justify-between ${
                      formData.teamSize === size 
                        ? "border-slate-900 bg-slate-900 text-white shadow-md" 
                        : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    <span>{size}</span>
                    {formData.teamSize === size && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 5 && (
            <div className="space-y-6">
              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-slate-900 flex items-center space-x-2">
                  <Target className="w-6 h-6 text-slate-700" />
                  <span>What is your primary revenue goal?</span>
                </h2>
                <p className="text-xs text-slate-500">Tunes AEGIS offer formulation and campaign priorities.</p>
              </div>

              <div className="space-y-2">
                {primaryGoals.map((goal) => (
                  <button
                    key={goal}
                    onClick={() => setFormData({ ...formData, primaryGoal: goal })}
                    className={`w-full p-4 rounded-xl border text-xs font-bold text-left transition-all flex items-center justify-between ${
                      formData.primaryGoal === goal 
                        ? "border-slate-900 bg-slate-900 text-white shadow-md" 
                        : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    <span>{goal}</span>
                    {formData.primaryGoal === goal && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 6 && (
            <div className="space-y-6 text-center py-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                <Layers className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-slate-900">Ready to Provision Workspace!</h2>
                <p className="text-xs text-slate-500 max-w-md mx-auto">
                  We will provision your Organization ({formData.companyName || "Organization"}), setup default Company Intelligence, and initialize your AI Executive.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-1 text-left max-w-md mx-auto">
                <p><span className="font-semibold">Company:</span> {formData.companyName || "Default Org"}</p>
                <p><span className="font-semibold">Industry:</span> {formData.industry}</p>
                <p><span className="font-semibold">Goal:</span> {formData.primaryGoal}</p>
              </div>
            </div>
          )}

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-8 border-t border-slate-100 mt-8">
            <button
              onClick={() => setStep(Math.max(1, step - 1))}
              disabled={step === 1}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 disabled:opacity-30 disabled:pointer-events-none"
            >
              Back
            </button>

            <button
              onClick={handleNext}
              disabled={isSubmitting}
              className="px-6 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition-all flex items-center space-x-2 shadow-sm"
            >
              <span>{step === 6 ? (isSubmitting ? "Provisioning..." : "Finish Setup & Launch") : "Continue"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
