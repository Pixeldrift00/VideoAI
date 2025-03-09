import React, { useState } from "react";
import ScriptConfigForm from "./ScriptConfigForm";
import ScriptDisplay from "./ScriptDisplay";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface ScriptWorkspaceProps {
  onScriptGenerate?: (config: {
    niche: string;
    tone: string;
    length: number;
  }) => void;
  onScriptSave?: (script: string) => void;
  onScriptChange?: (script: string) => void;
  onAIImprovement?: (option: string) => void;
  initialScript?: string;
}

const ScriptWorkspace = ({
  onScriptGenerate = () => {},
  onScriptSave = () => {},
  onScriptChange = () => {},
  onAIImprovement = () => {},
  initialScript = "",
}: ScriptWorkspaceProps) => {
  const [currentScript, setCurrentScript] = useState(initialScript);

  const handleConfigSubmit = (values: {
    niche: string;
    tone: string;
    length: number;
  }) => {
    onScriptGenerate(values);
  };

  const handleScriptChange = (script: string) => {
    setCurrentScript(script);
    onScriptChange(script);
  };

  const handleScriptSave = () => {
    onScriptSave(currentScript);
  };

  return (
    <Card className="h-full bg-background flex flex-col shadow-lg border-border/50">
      <div className="p-4">
        <h2 className="text-2xl font-semibold mb-4 tracking-tight">
          Script Generation
        </h2>
        <ScriptConfigForm onSubmit={handleConfigSubmit} />
      </div>

      <Separator className="my-2" />

      <div className="flex-1 p-3 overflow-hidden">
        <ScriptDisplay
          script={currentScript}
          onScriptChange={handleScriptChange}
          onSave={handleScriptSave}
          onAIImprovement={onAIImprovement}
        />
      </div>
    </Card>
  );
};

export default ScriptWorkspace;
