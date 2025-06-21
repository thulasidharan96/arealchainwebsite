"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/src/components/ui/dialog"; // adjust the path if needed

interface ErrorDialogProps {
  message: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ErrorDialog = ({
  message,
  open,
  onOpenChange,
}: ErrorDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle className="text-red-600">Error</DialogTitle>
          <DialogDescription>{message}</DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
