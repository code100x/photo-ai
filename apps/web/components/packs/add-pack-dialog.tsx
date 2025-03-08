"use client";

import { PackForm } from "@/components/packs/pack-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface AddPackDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddPackDialog({ open, onOpenChange }: AddPackDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] md:max-w-[800px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Pack</DialogTitle>
        </DialogHeader>
        <PackForm onSuccess={() => onOpenChange(false)} />
      </DialogContent>
    </Dialog>
  );
}
