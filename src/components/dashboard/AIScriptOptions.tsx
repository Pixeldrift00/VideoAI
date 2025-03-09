import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Wand2 } from "lucide-react";

interface AIScriptOptionsProps {
  onOption: (option: string) => void;
}

const AIScriptOptions = ({ onOption }: AIScriptOptionsProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Wand2 className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => onOption("improve")}>
          Improve Writing
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onOption("shorten")}>
          Make it Shorter
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onOption("longer")}>
          Make it Longer
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onOption("casual")}>
          More Casual Tone
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onOption("professional")}>
          More Professional
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onOption("funny")}>
          Make it Funnier
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AIScriptOptions;
