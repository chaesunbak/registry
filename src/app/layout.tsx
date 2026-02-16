import { RootProvider } from "fumadocs-ui/provider/next";

import { Inter } from "next/font/google";
import { DocsLayout } from "fumadocs-ui/layouts/docs";
import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";

import { source } from "@/lib/source";

import "./global.css";

const inter = Inter({
  subsets: ["latin"],
});

const baseOptions: BaseLayoutProps = {
  nav: {
    title: "@chaesunbak/ui",
  },
  githubUrl: `https://github.com/chaesunbak/ui`,
};

export default function Layout({ children }: LayoutProps<"/">) {
  const tree = source.getPageTree();

  return (
    <html lang="ko" className={inter.className} suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        <RootProvider>
          <DocsLayout tree={tree} {...baseOptions}>
            {children}
          </DocsLayout>
        </RootProvider>
      </body>
    </html>
  );
}
