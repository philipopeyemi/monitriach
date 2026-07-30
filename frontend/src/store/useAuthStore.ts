import { create } from "zustand";
import { UserProfile, Organization, Workspace } from "@/lib/supabase";

interface OnboardingData {
  companyName: string;
  industry: string;
  website: string;
  teamSize: string;
  revenueGoal: string;
}

interface AuthState {
  user: UserProfile | null;
  organization: Organization | null;
  workspace: Workspace | null;
  token: string | null;
  isAuthenticated: boolean;
  isOnboarded: boolean;
  onboardingData: Partial<OnboardingData>;
  
  // Actions
  setAuth: (user: UserProfile, token: string, org?: Organization, ws?: Workspace) => void;
  setOnboardingData: (data: Partial<OnboardingData>) => void;
  completeOnboarding: (data: OnboardingData) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: {
    id: "usr_demo_monitriach_01",
    email: "architect@monitriach.ai",
    full_name: "Philip Opeyemi",
    organization_id: "org_monitriach_01",
    workspace_id: "ws_monitriach_01",
    has_completed_onboarding: true
  },
  organization: {
    id: "org_monitriach_01",
    name: "Acme Autonomous OS",
    slug: "acme-os",
    industry: "B2B SaaS",
    website: "https://monitriach.ai",
    team_size: "11-50",
    revenue_goal: "More Meetings",
    created_at: new Date().toISOString()
  },
  workspace: {
    id: "ws_monitriach_01",
    organization_id: "org_monitriach_01",
    name: "Production Workspace",
    slug: "production",
    is_default: true,
    created_at: new Date().toISOString()
  },
  token: "sb-jwt-token-monitriach-v2",
  isAuthenticated: true,
  isOnboarded: true,
  onboardingData: {},

  setAuth: (user, token, organization, workspace) => set({
    user,
    token,
    organization: organization || get().organization,
    workspace: workspace || get().workspace,
    isAuthenticated: true,
    isOnboarded: user.has_completed_onboarding
  }),

  setOnboardingData: (data) => set((state) => ({
    onboardingData: { ...state.onboardingData, ...data }
  })),

  completeOnboarding: async (data) => {
    const newOrg: Organization = {
      id: `org_${Date.now()}`,
      name: data.companyName,
      slug: data.companyName.toLowerCase().replace(/[^a-z0-9]/g, "-"),
      industry: data.industry,
      website: data.website,
      team_size: data.teamSize,
      revenue_goal: data.revenueGoal,
      created_at: new Date().toISOString()
    };

    const newWs: Workspace = {
      id: `ws_${Date.now()}`,
      organization_id: newOrg.id,
      name: "Default Workspace",
      slug: "default",
      is_default: true,
      created_at: new Date().toISOString()
    };

    const currentUser = get().user;
    const updatedUser: UserProfile = {
      id: currentUser?.id || `usr_${Date.now()}`,
      email: currentUser?.email || "user@monitriach.ai",
      full_name: currentUser?.full_name || "Revenue Lead",
      organization_id: newOrg.id,
      workspace_id: newWs.id,
      has_completed_onboarding: true
    };

    set({
      user: updatedUser,
      organization: newOrg,
      workspace: newWs,
      isOnboarded: true,
      onboardingData: data
    });
  },

  logout: () => set({
    user: null,
    organization: null,
    workspace: null,
    token: null,
    isAuthenticated: false,
    isOnboarded: false,
    onboardingData: {}
  })
}));
