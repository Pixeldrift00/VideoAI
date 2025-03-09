import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, X } from "lucide-react";
import { useStore } from "@/lib/store";

const CustomNichesDialog = () => {
  const [open, setOpen] = React.useState(false);
  const [newNiche, setNewNiche] = React.useState("");
  const { customNiches, addCustomNiche, removeCustomNiche } = useStore();

  const handleAdd = () => {
    if (newNiche.trim()) {
      addCustomNiche(newNiche.trim());
      setNewNiche("");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          Manage Niches
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Custom Content Niches</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="Enter new niche"
              value={newNiche}
              onChange={(e) => setNewNiche(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAdd()}
            />
            <Button onClick={handleAdd}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex flex-wrap gap-2">
            {customNiches.map((niche) => (
              <div
                key={niche}
                className="flex items-center gap-1 bg-secondary px-2 py-1 rounded-md"
              >
                <span>{niche}</span>
                <button
                  onClick={() => removeCustomNiche(niche)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CustomNichesDialog;
