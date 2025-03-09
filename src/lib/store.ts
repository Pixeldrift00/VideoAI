import { create } from "zustand";

interface SocialConfig {
  youtube?: {
    title: string;
    description: string;
    tags: string[];
    category: string;
  };
  tiktok?: {
    caption: string;
    hashtags: string[];
  };
}

interface Project {
  id: string;
  name: string;
  script: string;
  videoUrl?: string;
  date: string;
  socialConfig?: SocialConfig;
  config: {
    niche: string;
    tone: string;
    length: number;
  };
}

type View = "dashboard" | "videos" | "history" | "projects";

interface AppState {
  currentView: View;
  customNiches: string[];
  scriptHistory: Array<{
    id: string;
    script: string;
    timestamp: string;
  }>;

  theme: "light" | "dark";
  currentProject: Project | null;
  projects: Project[];
  setTheme: (theme: "light" | "dark") => void;
  setCurrentProject: (project: Project | null) => void;
  updateCurrentProject: (updates: Partial<Project>) => void;
  addProject: (project: Project) => void;
  saveProject: () => void;
}

export const useStore = create<AppState>((set) => ({
  currentView: "dashboard",
  customNiches: [],
  scriptHistory: [],
  theme: "light",
  currentProject: null,
  projects: [],
  setTheme: (theme) => set({ theme }),
  setCurrentProject: (project) => set({ currentProject: project }),
  updateCurrentProject: (updates) =>
    set((state) => ({
      currentProject: state.currentProject
        ? { ...state.currentProject, ...updates }
        : null,
    })),
  addProject: (project) =>
    set((state) => ({ projects: [...state.projects, project] })),
  addCustomNiche: (niche: string) =>
    set((state) => ({
      customNiches: [...state.customNiches, niche],
    })),
  removeCustomNiche: (niche: string) =>
    set((state) => ({
      customNiches: state.customNiches.filter((n) => n !== niche),
    })),
  addToScriptHistory: (script: string) =>
    set((state) => ({
      scriptHistory: [
        {
          id: Math.random().toString(36).substr(2, 9),
          script,
          timestamp: new Date().toISOString(),
        },
        ...state.scriptHistory,
      ].slice(0, 50), // Keep last 50 entries
    })),
  setCurrentView: (view: View) => set({ currentView: view }),
  generateAIScript: async (prompt: string, currentScript: string) => {
    // TODO: Implement actual AI generation
    return `AI enhanced version of: ${currentScript}\n\nBased on prompt: ${prompt}`;
  },
  saveProject: () =>
    set((state) => {
      if (!state.currentProject) return state;

      const projectIndex = state.projects.findIndex(
        (p) => p.id === state.currentProject?.id,
      );

      const updatedProjects =
        projectIndex >= 0
          ? state.projects.map((p, i) =>
              i === projectIndex ? state.currentProject! : p,
            )
          : [...state.projects, state.currentProject];

      return { projects: updatedProjects };
    }),
}));
