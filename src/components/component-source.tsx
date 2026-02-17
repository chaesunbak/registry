import { DynamicCodeBlock } from "fumadocs-ui/components/dynamic-codeblock";

import { getComponentSource } from "@/lib/registry";

export async function ComponentSource({ name }: { name: string }) {
  const source = await getComponentSource(name);

  if (!source) {
    return (
      <div className="rounded-lg border bg-muted p-4 text-sm text-muted-foreground">
        Source code not found for "{name}"
      </div>
    );
  }

  return (
    <DynamicCodeBlock
      lang="ts"
      code={source.content}
      options={{
        themes: {
          light: "github-light",
          dark: "github-dark",
        },
      }}
    />
  );
}
