import React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Plus, Save, Share2 } from "lucide-react";

interface FloatingActionButtonProps {
  onNewProject?: () => void;
  onSave?: () => void;
  onPublish?: () => void;
}

const FloatingActionButton = ({
  onNewProject = () => {},
  onSave = () => {},
  onPublish = () => {},
}: FloatingActionButtonProps) => {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            size="icon"
            className="h-14 w-14 rounded-full shadow-lg bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 transition-all duration-300"
          >
            <Plus className="h-6 w-6" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem onClick={onNewProject}>
            <Plus className="mr-2 h-4 w-4" />
            New Project
          </DropdownMenuItem>
          <DropdownMenuItem onClick={onSave}>
            <Save className="mr-2 h-4 w-4" />
            Save Project
          </DropdownMenuItem>
          <DropdownMenuItem onClick={onPublish}>
            <Share2 className="mr-2 h-4 w-4" />
            Publish
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default FloatingActionButton;
