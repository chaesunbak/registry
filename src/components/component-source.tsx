import fs from "node:fs/promises";
import path from "node:path";
import { DynamicCodeBlock } from "fumadocs-ui/components/dynamic-codeblock";

export async function ComponentSource({
  src,
  title,
}: {
  src: string;
  title?: string;
}) {
  let sourceContent = "";

  try {
    const filePath = path.join(process.cwd(), src);
    sourceContent = await fs.readFile(filePath, "utf-8");
  } catch (error) {
    return (
      <div className="rounded-lg border bg-muted p-4 text-sm text-muted-foreground">
        Source code not found at "{src}"
      </div>
    );
  }

  return (
    <DynamicCodeBlock
      lang="tsx"
      code={sourceContent}
      codeblock={title ? { title } : undefined}
      options={{
        themes: {
          light: "github-light",
          dark: "github-dark",
        },
      }}
    />
  );
}
