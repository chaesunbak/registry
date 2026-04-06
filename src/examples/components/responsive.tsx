"use client";

import { Responsive } from "@/registry/default/components/responsive";

export function ResponsiveExample() {
  return (
    <Responsive
      desktop={
        <div className="flex items-center justify-center p-8 border-2 border-dashed rounded-xl bg-muted/50">
          <p className="text-xl font-medium text-muted-foreground">Desktop View</p>
        </div>
      }
      mobile={
        <div className="flex items-center justify-center p-8 border-2 border-dashed rounded-xl bg-primary/10">
          <p className="text-xl font-medium text-primary">Mobile View</p>
        </div>
      }
    />
  );
}
