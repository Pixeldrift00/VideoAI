import React from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import {
  Home,
  FolderOpen,
  Settings,
  Sun,
  Moon,
  Plus,
  Video,
  History,
} from "lucide-react";

interface SidebarProps {
  onThemeToggle?: () => void;
  isDarkMode?: boolean;
  onProjectSelect?: (projectId: string) => void;
  projects?: Array<{ id: string; name: string; date: string }>;
  currentView?: "dashboard" | "videos" | "history" | "projects";
  onViewChange?: (
    view: "dashboard" | "videos" | "history" | "projects",
  ) => void;
}

const Sidebar = ({
  onThemeToggle = () => {},
  isDarkMode = false,
  onProjectSelect = () => {},
  projects = [
    { id: "1", name: "Welcome Video", date: "2024-03-20" },
    { id: "2", name: "Product Launch", date: "2024-03-19" },
    { id: "3", name: "Tutorial Series", date: "2024-03-18" },
  ],
  currentView = "dashboard",
  onViewChange = () => {},
}: SidebarProps) => {
  return (
    <div className="w-[220px] h-full bg-background border-r flex flex-col">
      {/* Logo Area */}
      <div className="p-6">
        <h1 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/50 bg-clip-text text-transparent">
          VideoAI
        </h1>
      </div>

      <Separator />

      {/* Main Navigation */}
      <nav className="flex-1">
        <div className="px-3 py-2">
          <div className="space-y-1">
            <Button
              variant={currentView === "dashboard" ? "secondary" : "ghost"}
              className="w-full justify-start"
              size="lg"
              onClick={() => onViewChange?.("dashboard")}
            >
              <Home className="mr-2 h-4 w-4" />
              Dashboard
            </Button>
            <Button
              variant={currentView === "videos" ? "secondary" : "ghost"}
              className="w-full justify-start"
              size="lg"
              onClick={() => onViewChange?.("videos")}
            >
              <Video className="mr-2 h-4 w-4" />
              My Videos
            </Button>
            <Button
              variant={currentView === "history" ? "secondary" : "ghost"}
              className="w-full justify-start"
              size="lg"
              onClick={() => onViewChange?.("history")}
            >
              <History className="mr-2 h-4 w-4" />
              History
            </Button>
          </div>
        </div>

        <Separator className="my-2" />

        {/* Projects Section */}
        <div className="px-3 py-2">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-sm font-semibold">Recent Projects</h2>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <ScrollArea className="h-[400px]">
            <div className="space-y-1">
              {projects.map((project) => (
                <Button
                  key={project.id}
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => onProjectSelect(project.id)}
                >
                  <FolderOpen className="mr-2 h-4 w-4" />
                  <div className="flex flex-col items-start">
                    <span className="text-sm">{project.name}</span>
                    <span className="text-xs text-muted-foreground">
                      {project.date}
                    </span>
                  </div>
                </Button>
              ))}
            </div>
          </ScrollArea>
        </div>
      </nav>

      {/* Footer */}
      <div className="border-t p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Sun className="h-4 w-4" />
            <Switch
              checked={isDarkMode}
              onCheckedChange={onThemeToggle}
              aria-label="Toggle theme"
            />
            <Moon className="h-4 w-4" />
          </div>
          <Button variant="ghost" size="icon">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
