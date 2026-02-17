import fs from "node:fs/promises";
import path from "node:path";

export interface RegistryItem {
  name: string;
  files: {
    path: string;
    type: string;
  }[];
}

export interface Registry {
  items: RegistryItem[];
}

export async function getComponentSource(name: string) {
  try {
    const registryPath = path.join(process.cwd(), "registry.json");
    const registryContent = await fs.readFile(registryPath, "utf-8");
    const registry = JSON.parse(registryContent) as Registry;

    const item = registry.items.find((i) => i.name === name);

    if (!item) {
      return null;
    }

    // 기본적으로 첫 번째 파일을 소스코드로 간주합니다.
    const fileInfo = item.files[0];
    if (!fileInfo) {
      return null;
    }

    const filePath = path.join(process.cwd(), fileInfo.path);
    const content = await fs.readFile(filePath, "utf-8");

    return {
      name: item.name,
      path: fileInfo.path,
      content,
    };
  } catch (error) {
    console.error(`Error reading registry item ${name}:`, error);
    return null;
  }
}
