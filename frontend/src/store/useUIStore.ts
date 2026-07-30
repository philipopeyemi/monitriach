import { create } from "zustand";

interface UIState {
  sidebarOpen: boolean;
  commandPaletteOpen: boolean;
  activeWorkspace: string;
  toggleSidebar: () => void;
  setCommandPaletteOpen: (open: boolean) => void;
  toggleCommandPalette: () => void;
  setActiveWorkspace: (workspace: string) => void;
}

export const useUIStore = create<UIState>((set) => ({
  sidebarOpen: true,
  commandPaletteOpen: false,
  activeWorkspace: "Acme Enterprise",
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  setCommandPaletteOpen: (open) => set({ commandPaletteOpen: open }),
  toggleCommandPalette: () => set((state) => ({ commandPaletteOpen: !state.commandPaletteOpen })),
  setActiveWorkspace: (workspace) => set({ activeWorkspace: workspace }),
}));
