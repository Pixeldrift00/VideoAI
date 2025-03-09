import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import VideoPreview from "./VideoPreview";
import { Badge } from "@/components/ui/badge";
import { Loader2 } from "lucide-react";

interface PreviewPanelProps {
  isGenerating?: boolean;
  progress?: number;
  videoUrl?: string;
  onVideoPlaybackChange?: (isPlaying: boolean) => void;
  onVideoTimeUpdate?: (time: number) => void;
  onVideoVolumeChange?: (volume: number) => void;
}

const PreviewPanel = ({
  isGenerating = false,
  progress = 0,
  videoUrl = "",
  onVideoPlaybackChange = () => {},
  onVideoTimeUpdate = () => {},
  onVideoVolumeChange = () => {},
}: PreviewPanelProps) => {
  const [status, setStatus] = useState<"idle" | "generating" | "ready">("idle");

  // Update status based on props
  React.useEffect(() => {
    if (isGenerating) {
      setStatus("generating");
    } else if (videoUrl) {
      setStatus("ready");
    } else {
      setStatus("idle");
    }
  }, [isGenerating, videoUrl]);

  return (
    <Card className="w-full h-full bg-background flex flex-col gap-4 p-6 shadow-lg border-border/50">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Preview</h2>
        <Badge
          variant={status === "generating" ? "secondary" : "outline"}
          className="flex items-center gap-2"
        >
          {status === "generating" && (
            <Loader2 className="h-3 w-3 animate-spin" />
          )}
          {status === "idle" && "Waiting for script"}
          {status === "generating" && "Generating video"}
          {status === "ready" && "Ready to play"}
        </Badge>
      </div>

      {status === "generating" && (
        <div className="space-y-2">
          <Progress value={progress} className="w-full" />
          <p className="text-sm text-muted-foreground text-center">
            {Math.round(progress)}% complete
          </p>
        </div>
      )}

      <div className="flex-1">
        <VideoPreview
          videoUrl={videoUrl}
          onPlaybackChange={onVideoPlaybackChange}
          onTimeUpdate={onVideoTimeUpdate}
          onVolumeChange={onVideoVolumeChange}
        />
      </div>
    </Card>
  );
};

export default PreviewPanel;
