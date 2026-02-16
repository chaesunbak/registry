import { RootProvider } from "fumadocs-ui/provider/next";
import localFont from "next/font/local";
import { DocsLayout } from "fumadocs-ui/layouts/docs";
import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";

import { source } from "@/lib/source";

import "./global.css";

const pretendard = localFont({
  src: "../assets/fonts/pretendard/PretendardVariable.woff2",
  display: "swap",
  weight: "45 920",
  variable: "--font-pretendard",
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
    <html lang="ko" className={pretendard.variable} suppressHydrationWarning>
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
