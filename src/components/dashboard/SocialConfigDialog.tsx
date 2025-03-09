import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Youtube, Music2 } from "lucide-react";

interface SocialConfigDialogProps {
  onSave: (config: any) => void;
  initialConfig?: any;
}

const SocialConfigDialog = ({
  onSave,
  initialConfig,
}: SocialConfigDialogProps) => {
  const [open, setOpen] = React.useState(false);
  const [config, setConfig] = React.useState(
    initialConfig || {
      youtube: {
        title: "",
        description: "",
        tags: [],
        category: "Entertainment",
      },
      tiktok: {
        caption: "",
        hashtags: [],
      },
    },
  );

  const handleSave = () => {
    onSave(config);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Configure Social Media</Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Social Media Configuration</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="youtube">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="youtube" className="flex items-center gap-2">
              <Youtube className="h-4 w-4" /> YouTube
            </TabsTrigger>
            <TabsTrigger value="tiktok" className="flex items-center gap-2">
              <Music2 className="h-4 w-4" /> TikTok
            </TabsTrigger>
          </TabsList>

          <TabsContent value="youtube" className="space-y-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Title</Label>
                <Input
                  placeholder="Enter video title"
                  value={config.youtube.title}
                  onChange={(e) =>
                    setConfig({
                      ...config,
                      youtube: { ...config.youtube, title: e.target.value },
                    })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea
                  placeholder="Enter video description"
                  value={config.youtube.description}
                  onChange={(e) =>
                    setConfig({
                      ...config,
                      youtube: {
                        ...config.youtube,
                        description: e.target.value,
                      },
                    })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label>Tags (comma separated)</Label>
                <Input
                  placeholder="Enter tags"
                  value={config.youtube.tags.join(", ")}
                  onChange={(e) =>
                    setConfig({
                      ...config,
                      youtube: {
                        ...config.youtube,
                        tags: e.target.value.split(",").map((t) => t.trim()),
                      },
                    })
                  }
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="tiktok" className="space-y-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Caption</Label>
                <Input
                  placeholder="Enter caption"
                  value={config.tiktok.caption}
                  onChange={(e) =>
                    setConfig({
                      ...config,
                      tiktok: { ...config.tiktok, caption: e.target.value },
                    })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label>Hashtags</Label>
                <Input
                  placeholder="Enter hashtags (without #)"
                  value={config.tiktok.hashtags.join(", ")}
                  onChange={(e) =>
                    setConfig({
                      ...config,
                      tiktok: {
                        ...config.tiktok,
                        hashtags: e.target.value
                          .split(",")
                          .map((t) => t.trim()),
                      },
                    })
                  }
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save Configuration</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SocialConfigDialog;
