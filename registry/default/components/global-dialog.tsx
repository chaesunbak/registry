"use client";

import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useDialogStore } from "@/hooks/use-dialog";

type PointerDownOutsideEvent = CustomEvent<{ originalEvent: PointerEvent }>;

export const GlobalDialog = () => {
  const {
    isOpen,
    isLoading,
    title,
    description,
    content,
    cancelText,
    confirmText,
    isDestructive,
    closeOnDimmerClick,
    hasCancel,
    onConfirm,
    onCancel,
  } = useDialogStore();

  function handleOnOpenChange(open: boolean) {
    if (!open && !isLoading) {
      onCancel();
    }
  }

  function handlePointerDownOutside(e: PointerDownOutsideEvent) {
    if (isLoading || !closeOnDimmerClick) {
      e.preventDefault();
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOnOpenChange}>
      <DialogContent
        showCloseButton={false}
        onPointerDownOutside={handlePointerDownOutside}
      >
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
          {content}
        </DialogHeader>
        <DialogFooter>
          {hasCancel && (
            <Button variant="outline" onClick={onCancel} disabled={isLoading}>
              {cancelText}
            </Button>
          )}
          <Button
            variant={isDestructive ? "destructive" : "default"}
            onClick={onConfirm}
            disabled={isLoading}
          >
            {isLoading && <Loader2 className="mr-2 size-4 animate-spin" />}
            {confirmText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
