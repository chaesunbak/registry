"use client";

import { CopyToClipboardButton } from "@/registry/default/components/copy-to-clipboard-button";

export function CopyToClipboardButtonExample() {
  return (
    <div className="flex flex-col items-center gap-4">
      <p className="text-sm text-muted-foreground">
        클릭하여 아래 텍스트를 복사하세요:
      </p>
      <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
        npm install @chaesunbak/ui
      </code>
      <CopyToClipboardButton text="npm install @chaesunbak/ui" />
    </div>
  );
}
