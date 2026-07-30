import { create } from "zustand";

interface User {
  id: string;
  email: string;
  full_name: string;
  organization_id?: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  setAuth: (user: User, token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: {
    id: "demo-user-id",
    email: "architect@monitriach.ai",
    full_name: "Lead Architect",
    organization_id: "demo-org-id"
  },
  token: "demo-jwt-token",
  isAuthenticated: true,
  setAuth: (user, token) => set({ user, token, isAuthenticated: true }),
  logout: () => set({ user: null, token: null, isAuthenticated: false }),
}));
