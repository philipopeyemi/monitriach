"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import { 
  Building2, 
  Globe, 
  Users, 
  Target, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft,
  Sparkles,
  Briefcase
} from "lucide-react";

export default function OnboardingPage() {
  const router = useRouter();
  const { onboardingData, setOnboardingData, completeOnboarding } = useAuthStore();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    companyName: onboardingData.companyName || "",
    industry: onboardingData.industry || "B2B SaaS",
    website: onboardingData.website || "",
    teamSize: onboardingData.teamSize || "11-50",
    revenueGoal: onboardingData.revenueGoal || "More Meetings"
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setOnboardingData({ [field]: value });
  };

  const handleNext = () => {
    if (step < 6) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleFinish = async () => {
    setLoading(true);
    try {
      await completeOnboarding(formData);
      router.push("/dashboard");
    } catch (err) {
      console.error("Onboarding failed:", err);
    } finally {
      setLoading(false);
    }
  };

  const revenueGoals = [
    { title: "More Meetings", desc: "Book qualified demo meetings with decision makers." },
    { title: "Qualified Leads", desc: "Identify high-fit buying signals and decision makers." },
    { title: "Faster Sales", desc: "Accelerate pipeline velocity with automated AI follow-ups." },
    { title: "AI Automation", desc: "Hand off research, outreach, and email copy to AEGIS." },
    { title: "Better Follow-up", desc: "Never lose a lead with persistent business memory." },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col justify-between p-6">
      {/* Top Header */}
      <div className="max-w-3xl mx-auto w-full flex items-center justify-between py-4 border-b border-slate-200/80 mb-8">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-lg bg-slate-900 text-white font-bold flex items-center justify-center text-base">
            M
          </div>
          <span className="font-semibold text-slate-900 tracking-tight">MONITRIACH</span>
        </div>
        <div className="text-xs font-medium text-slate-500">
          Step <span className="text-slate-900 font-bold">{step}</span> of 6
        </div>
      </div>

      {/* Progress Bar */}
      <div className="max-w-3xl mx-auto w-full mb-12">
        <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
          <div 
            className="bg-slate-900 h-full transition-all duration-300 ease-out"
            style={{ width: `${(step / 6) * 100}%` }}
          />
        </div>
      </div>

      {/* Main Wizard Card */}
      <div className="max-w-2xl mx-auto w-full bg-white rounded-2xl border border-slate-200 shadow-sm p-8 flex-1 flex flex-col justify-between">
        <div>
          {/* Step 1: Company Name */}
          {step === 1 && (
            <div className="space-y-6 animate-fade-in">
              <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-slate-900 mb-2">
                <Building2 className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">What is your company name?</h2>
              <p className="text-sm text-slate-500">This will be used to create your primary Organization and default workspace.</p>
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">Company Name</label>
                <input 
                  type="text" 
                  value={formData.companyName}
                  onChange={(e) => handleChange("companyName", e.target.value)}
                  placeholder="e.g. Acme Revenue OS"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-900 text-sm"
                  autoFocus
                />
              </div>
            </div>
          )}

          {/* Step 2: Industry */}
          {step === 2 && (
            <div className="space-y-6 animate-fade-in">
              <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-slate-900 mb-2">
                <Briefcase className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">Which industry best describes your business?</h2>
              <p className="text-sm text-slate-500">Helps AEGIS tailor research frameworks and buying signal detectors.</p>
              <div className="grid grid-cols-2 gap-3">
                {["B2B SaaS", "Enterprise Software", "Agencies & Consulting", "Fintech & Banking", "Healthcare & Tech", "Manufacturing & Supply"].map((ind) => (
                  <button
                    key={ind}
                    onClick={() => handleChange("industry", ind)}
                    className={`p-4 rounded-xl text-left border transition-all text-sm font-medium ${formData.industry === ind ? "border-slate-900 bg-slate-900 text-white shadow-sm" : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"}`}
                  >
                    {ind}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Company Website */}
          {step === 3 && (
            <div className="space-y-6 animate-fade-in">
              <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-slate-900 mb-2">
                <Globe className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">Enter your company website</h2>
              <p className="text-sm text-slate-500">MONITRIACH will crawl your website to seed your Company Intelligence memory.</p>
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">Company Domain / URL</label>
                <input 
                  type="url" 
                  value={formData.website}
                  onChange={(e) => handleChange("website", e.target.value)}
                  placeholder="https://acme.com"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-900 text-sm"
                  autoFocus
                />
              </div>
            </div>
          )}

          {/* Step 4: Team Size */}
          {step === 4 && (
            <div className="space-y-6 animate-fade-in">
              <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-slate-900 mb-2">
                <Users className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">How many people are on your sales team?</h2>
              <p className="text-sm text-slate-500">Select your team size to configure workspace seat limits.</p>
              <div className="grid grid-cols-2 gap-3">
                {["1 (Solo Founder)", "2-10", "11-50", "51-200", "200+"].map((size) => (
                  <button
                    key={size}
                    onClick={() => handleChange("teamSize", size)}
                    className={`p-4 rounded-xl text-left border transition-all text-sm font-medium ${formData.teamSize === size ? "border-slate-900 bg-slate-900 text-white shadow-sm" : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"}`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 5: Primary Revenue Goal */}
          {step === 5 && (
            <div className="space-y-6 animate-fade-in">
              <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-slate-900 mb-2">
                <Target className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">What is your primary revenue goal?</h2>
              <p className="text-sm text-slate-500">Configures your Cockpit Dashboard priorities.</p>
              <div className="space-y-3">
                {revenueGoals.map((goal) => (
                  <button
                    key={goal.title}
                    onClick={() => handleChange("revenueGoal", goal.title)}
                    className={`w-full p-4 rounded-xl text-left border transition-all text-sm ${formData.revenueGoal === goal.title ? "border-slate-900 bg-slate-900 text-white shadow-sm" : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"}`}
                  >
                    <div className="font-semibold">{goal.title}</div>
                    <div className={`text-xs mt-1 ${formData.revenueGoal === goal.title ? "text-slate-300" : "text-slate-500"}`}>{goal.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 6: Finish */}
          {step === 6 && (
            <div className="space-y-6 text-center py-6 animate-fade-in">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-2">
                <Sparkles className="w-8 h-8" />
              </div>
              <h2 className="text-3xl font-bold text-slate-900">Your Autonomous OS is Ready</h2>
              <p className="text-sm text-slate-600 max-w-md mx-auto">
                We've configured your Organization <span className="font-semibold text-slate-900">"{formData.companyName || 'Acme Corp'}"</span> and seeded your Company Intelligence memory.
              </p>
              
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-left space-y-2 text-xs text-slate-600 max-w-md mx-auto">
                <div className="flex items-center justify-between">
                  <span>Industry:</span>
                  <span className="font-medium text-slate-900">{formData.industry}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Primary Goal:</span>
                  <span className="font-medium text-slate-900">{formData.revenueGoal}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Team Size:</span>
                  <span className="font-medium text-slate-900">{formData.teamSize}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Wizard Controls */}
        <div className="flex items-center justify-between pt-8 border-t border-slate-100 mt-8">
          {step > 1 ? (
            <button
              onClick={handleBack}
              className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 font-medium text-sm transition-all flex items-center space-x-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
          ) : <div />}

          {step < 6 ? (
            <button
              onClick={handleNext}
              disabled={step === 1 && !formData.companyName.trim()}
              className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 disabled:opacity-50 text-white font-medium text-sm transition-all flex items-center space-x-2 shadow-sm"
            >
              <span>Continue</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleFinish}
              disabled={loading}
              className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-medium text-sm transition-all flex items-center justify-center space-x-2 shadow-md"
            >
              {loading ? <span>Provisioning Workspace...</span> : (
                <>
                  <span>Launch Cockpit Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          )}
        </div>
      </div>

      <div className="text-center py-4 text-xs text-slate-400">
        MONITRIACH CORE • Autonomous AI Revenue Operating System
      </div>
    </div>
  );
}
