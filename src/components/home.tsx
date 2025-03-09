import React from "react";
import { useStore } from "@/lib/store";
import { setTheme } from "@/lib/theme";
import { useToast } from "@/components/ui/use-toast";
import { v4 as uuidv4 } from "uuid";
import Sidebar from "./dashboard/Sidebar";
import ScriptWorkspace from "./dashboard/ScriptWorkspace";
import PreviewPanel from "./dashboard/PreviewPanel";
import FloatingActionButton from "./dashboard/FloatingActionButton";
import SocialConfigDialog from "./dashboard/SocialConfigDialog";
import CustomNichesDialog from "./dashboard/CustomNichesDialog";

const Home = () => {
  const { toast } = useToast();
  const {
    theme,
    setTheme: updateTheme,
    currentProject,
    projects,
    updateCurrentProject,
    addProject,
    saveProject,
    currentView,
    setCurrentView,
    generateAIScript,
    addToScriptHistory,
    scriptHistory,
  } = useStore();

  const [isGenerating, setIsGenerating] = React.useState(false);
  const [generationProgress, setGenerationProgress] = React.useState(0);
  const [currentScript, setCurrentScript] = React.useState("");
  const [videoUrl, setVideoUrl] = React.useState("");

  React.useEffect(() => {
    setTheme(theme);
  }, [theme]);

  const handleThemeToggle = () => {
    updateTheme(theme === "light" ? "dark" : "light");
  };

  const handleProjectSelect = (projectId: string) => {
    const project = projects.find((p) => p.id === projectId);
    if (project) {
      updateCurrentProject(project);
      setCurrentScript(project.script || "");
      setVideoUrl(project.videoUrl || "");
    }
  };

  const handleScriptGenerate = async (config: {
    niche: string;
    tone: string;
    length: number;
  }) => {
    setIsGenerating(true);
    setGenerationProgress(0);

    try {
      // Simulate AI generation
      const interval = setInterval(() => {
        setGenerationProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 10;
        });
      }, 1000);

      const generatedScript = await generateAIScript(
        `Create a ${config.length} second video script about ${config.niche} with a ${config.tone} tone.`,
        "",
      );

      setTimeout(() => {
        clearInterval(interval);
        setIsGenerating(false);
        setCurrentScript(generatedScript);
        addToScriptHistory(generatedScript);
        updateCurrentProject({ script: generatedScript });
        setVideoUrl("https://example.com/generated-video.mp4");
      }, 3000);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate script. Please try again.",
        variant: "destructive",
      });
      setIsGenerating(false);
    }
  };

  const handleScriptChange = (script: string) => {
    setCurrentScript(script);
    if (currentProject) {
      updateCurrentProject({ script });
      addToScriptHistory(script);
    }
  };

  const handleAIImprovement = async (option: string) => {
    if (!currentScript) return;

    const prompt = {
      improve: "Improve the writing quality",
      shorten: "Make it more concise",
      longer: "Expand with more details",
      casual: "Make the tone more casual",
      professional: "Make the tone more professional",
      funny: "Add more humor",
    }[option];

    setIsGenerating(true);
    try {
      const improvedScript = await generateAIScript(prompt, currentScript);
      handleScriptChange(improvedScript);
      setIsGenerating(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to improve script. Please try again.",
        variant: "destructive",
      });
      setIsGenerating(false);
    }
  };

  const handleNewProject = () => {
    const newProject = {
      id: uuidv4(),
      name: `New Project ${new Date().toLocaleDateString()}`,
      script: "",
      date: new Date().toISOString().split("T")[0],
      config: {
        niche: "technology",
        tone: "professional",
        length: 120,
      },
    };
    addProject(newProject);
    updateCurrentProject(newProject);
    setIsGenerating(false);
    setGenerationProgress(0);
    setCurrentScript("");
    setVideoUrl("");

    toast({
      title: "New Project Created",
      description: "Start by configuring your video settings.",
    });
  };

  const handleSaveProject = () => {
    saveProject();
    toast({
      title: "Project Saved",
      description: "Your changes have been saved successfully.",
    });
  };

  const handlePublishProject = () => {
    if (!currentProject?.socialConfig) {
      toast({
        title: "Social Media Configuration Required",
        description:
          "Please configure your social media settings before publishing.",
        variant: "destructive",
      });
      return;
    }
    // TODO: Implement actual publishing
    toast({
      title: "Publishing",
      description: "Your video is being published to social media platforms.",
    });
  };

  const renderContent = () => {
    switch (currentView) {
      case "dashboard":
        return (
          <div className="flex flex-col md:flex-row gap-2 p-2">
            <div className="w-full md:w-[500px] overflow-hidden flex-shrink-0">
              <ScriptWorkspace
                onScriptGenerate={handleScriptGenerate}
                onScriptChange={handleScriptChange}
                onScriptSave={handleSaveProject}
                initialScript={currentProject?.script || currentScript}
                onAIImprovement={handleAIImprovement}
              />
            </div>
            <div className="w-full md:w-[500px] overflow-hidden flex-shrink-0">
              <PreviewPanel
                isGenerating={isGenerating}
                progress={generationProgress}
                videoUrl={currentProject?.videoUrl || videoUrl}
                onVideoPlaybackChange={(isPlaying) =>
                  console.log(`Video playback: ${isPlaying}`)
                }
                onTimeUpdate={(time) => console.log(`Video time: ${time}`)}
                onVolumeChange={(volume) => console.log(`Volume: ${volume}`)}
              />
            </div>
          </div>
        );
      case "videos":
        return (
          <div className="p-6">
            <h2 className="text-2xl font-semibold mb-4">My Videos</h2>
            {/* TODO: Implement video gallery */}
          </div>
        );
      case "history":
        return (
          <div className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Script History</h2>
            <div className="space-y-4">
              {scriptHistory.map((entry) => (
                <div key={entry.id} className="p-4 border rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-muted-foreground">
                      {new Date(entry.timestamp).toLocaleString()}
                    </span>
                  </div>
                  <p className="whitespace-pre-wrap">{entry.script}</p>
                </div>
              ))}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="h-screen w-full bg-background flex overflow-hidden">
      <div className="hidden md:block">
        <Sidebar
          isDarkMode={theme === "dark"}
          onThemeToggle={handleThemeToggle}
          onProjectSelect={handleProjectSelect}
          projects={projects}
          currentView={currentView}
          onViewChange={setCurrentView}
        />
      </div>

      <div className="flex-1 overflow-auto bg-muted/5">{renderContent()}</div>

      <FloatingActionButton
        onNewProject={handleNewProject}
        onSave={handleSaveProject}
        onPublish={handlePublishProject}
      />
    </div>
  );
};

export default Home;
