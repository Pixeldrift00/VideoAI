import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Edit2, Copy, Save, Plus } from "lucide-react";
import AIScriptOptions from "./AIScriptOptions";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ScriptDisplayProps {
  script?: string;
  onScriptChange?: (script: string) => void;
  onSave?: () => void;
  onAIImprovement?: (option: string) => void;
}

const ScriptDisplay = ({
  script = "Welcome to your AI-powered video script! This is where your generated content will appear. You can edit, copy, and save your script using the controls above.",
  onScriptChange = () => {},
  onSave = () => {},
  onAIImprovement = () => {},
}: ScriptDisplayProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [localScript, setLocalScript] = useState(script);

  const handleEditToggle = () => {
    if (isEditing) {
      onScriptChange(localScript);
    }
    setIsEditing(!isEditing);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(localScript);
  };

  const handleScriptChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setLocalScript(e.target.value);
  };

  return (
    <Card className="w-full h-full bg-background border rounded-lg shadow-sm">
      <div className="p-4 border-b">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Script</h3>
          <div className="flex gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={handleEditToggle}
                  >
                    <Edit2 className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{isEditing ? "Save changes" : "Edit script"}</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="icon" onClick={handleCopy}>
                    <Copy className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Copy to clipboard</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="icon" onClick={onSave}>
                    <Save className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Save script</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <div>
                    <AIScriptOptions onOption={onAIImprovement} />
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>AI Improvements</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </div>

      <ScrollArea className="h-[calc(100%-4rem)] p-2">
        {isEditing ? (
          <Textarea
            value={localScript}
            onChange={handleScriptChange}
            className="min-h-[500px] resize-none"
            placeholder="Enter your script here..."
          />
        ) : (
          <div className="whitespace-pre-wrap">{localScript}</div>
        )}
      </ScrollArea>
    </Card>
  );
};

export default ScriptDisplay;
