import { create } from "zustand";

export interface User {
  id: string;
  email: string;
  full_name: string;
  organization_id?: string;
}

export interface Organization {
  id: string;
  name: string;
  industry?: string;
  website?: string;
}

export interface Workspace {
  id: string;
  name: string;
  organization_id: string;
}

interface AuthState {
  user: User | null;
  organization: Organization | null;
  workspace: Workspace | null;
  token: string | null;
  isAuthenticated: boolean;
  setAuth: (user: User, token: string) => void;
  setOrganization: (org: Organization) => void;
  setWorkspace: (ws: Workspace) => void;
  completeOnboarding: (data: {
    companyName: string;
    industry: string;
    website: string;
    teamSize: string;
    primaryGoal: string;
  }) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: {
    id: "demo-user-id",
    email: "architect@monitriach.ai",
    full_name: "Lead Architect",
    organization_id: "demo-org-id"
  },
  organization: {
    id: "demo-org-id",
    name: "Acme Operating System",
    industry: "B2B SaaS",
    website: "https://acme.com",
  },
  workspace: {
    id: "demo-ws-id",
    name: "Production Workspace",
    organization_id: "demo-org-id",
  },
  token: "demo-jwt-token",
  isAuthenticated: true,
  setAuth: (user, token) => set({ user, token, isAuthenticated: true }),
  setOrganization: (organization) => set({ organization }),
  setWorkspace: (workspace) => set({ workspace }),
  completeOnboarding: async (data) => {
    const newOrg = {
      id: `org-${Date.now()}`,
      name: data.companyName || "My Organization",
      industry: data.industry,
      website: data.website,
    };
    const newWs = {
      id: `ws-${Date.now()}`,
      name: "Default Workspace",
      organization_id: newOrg.id,
    };
    set({ organization: newOrg, workspace: newWs });
  },
  logout: () => set({ user: null, organization: null, workspace: null, token: null, isAuthenticated: false }),
}));
