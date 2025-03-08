"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import type { Pack } from "@/types";
import axios from "axios";
import { useAuth } from "@/hooks/useAuth";

interface DeletePackDialogProps {
  pack: Pack;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  refetch: () => void;
}

export function DeletePackDialog({
  pack,
  open,
  onOpenChange,
  refetch,
}: DeletePackDialogProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const { toast } = useToast();
  const { getToken } = useAuth();


  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const token = await getToken();

      await axios.delete(`/pack/${pack.id}`,{
        headers:{
          Authorization: `Bearer ${token}`,
        }
      });

      toast({
        title: "Pack deleted",
        description: `"${pack.name}" has been successfully deleted.`,
      });
      refetch();
      onOpenChange(false);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to delete pack",
        description: "Please try again later.",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete the content pack "{pack.name}" and all
            its prompts. This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="cursor-pointer" disabled={isDeleting}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={(e) => {
              e.preventDefault();
              handleDelete();
            }}
            disabled={isDeleting}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90 cursor-pointer"
          >
            {isDeleting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Deleting...
              </>
            ) : (
              "Delete"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
