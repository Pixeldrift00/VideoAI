import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Play, Pause, SkipBack, SkipForward, Volume2 } from "lucide-react";

interface VideoPreviewProps {
  videoUrl?: string;
  onPlaybackChange?: (isPlaying: boolean) => void;
  onTimeUpdate?: (time: number) => void;
  onVolumeChange?: (volume: number) => void;
}

const VideoPreview = ({
  videoUrl = "https://example.com/placeholder-video.mp4",
  onPlaybackChange = () => {},
  onTimeUpdate = () => {},
  onVolumeChange = () => {},
}: VideoPreviewProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(75);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    onPlaybackChange(!isPlaying);
  };

  const handleVolumeChange = (newVolume: number[]) => {
    setVolume(newVolume[0]);
    onVolumeChange(newVolume[0]);
  };

  return (
    <Card className="w-full h-full bg-background p-4 flex flex-col gap-4">
      {/* Video Display Area */}
      <div className="relative w-full aspect-video bg-muted rounded-lg overflow-hidden">
        {!videoUrl && (
          <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
            No video available
          </div>
        )}
        {videoUrl && (
          <video
            className="w-full h-full object-cover"
            src={videoUrl}
            playsInline
          />
        )}
      </div>

      {/* Playback Progress */}
      <div className="w-full bg-muted rounded-full h-1.5 overflow-hidden">
        <div
          className="bg-primary h-full transition-all duration-200"
          style={{ width: `${(currentTime / 100) * 100}%` }}
        />
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => setCurrentTime(Math.max(0, currentTime - 10))}
          >
            <SkipBack className="h-4 w-4" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={handlePlayPause}
          >
            {isPlaying ? (
              <Pause className="h-4 w-4" />
            ) : (
              <Play className="h-4 w-4" />
            )}
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => setCurrentTime(Math.min(100, currentTime + 10))}
          >
            <SkipForward className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <Volume2 className="h-4 w-4 text-muted-foreground" />
          <div className="w-24">
            <Slider
              value={[volume]}
              max={100}
              step={1}
              onValueChange={handleVolumeChange}
            />
          </div>
        </div>
      </div>
    </Card>
  );
};

export default VideoPreview;
