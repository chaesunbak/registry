"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ResponsiveDialog } from "@/registry/default/components/responsive-dialog";

export function ResponsiveDialogExample() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Dialog</Button>
      <ResponsiveDialog
        isOpen={open}
        setIsOpen={setOpen}
        title="Edit profile"
        description="Make changes to your profile here. Click save when you're done."
      >
        <p className="text-sm text-muted-foreground">
          Dialog content goes here.
        </p>
      </ResponsiveDialog>
    </>
  );
}
