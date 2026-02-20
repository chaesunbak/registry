"use client";

import { CopyToClipboardButton } from "@/registry/default/components/copy-to-clipboard-button";
import { Input } from "@/components/ui/input";

export function CopyToClipboardButtonExample() {
  const text = "console.log('Hello, World!')";

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex items-center gap-4">
        <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
          {text}
        </code>
        <CopyToClipboardButton text={text} />
      </div>
      <Input />
    </div>
  );
}
