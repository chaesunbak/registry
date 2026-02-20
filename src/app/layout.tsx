import type { Metadata } from "next";
import { RootProvider } from "fumadocs-ui/provider/next";
import localFont from "next/font/local";
import { DocsLayout } from "fumadocs-ui/layouts/docs";
import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

import { source } from "@/lib/source";
import { TooltipProvider } from "@/components/ui/tooltip";
import { DialogProvider } from "@/registry/default/providers/dialog-provider";

import "./global.css";

export const metadata: Metadata = {
  title: {
    template: "%s - @chaesunbak/registry",
    default: "@chaesunbak/registry",
  },
};

const pretendard = localFont({
  src: "../assets/fonts/pretendard/PretendardVariable.woff2",
  display: "swap",
  weight: "45 920",
  variable: "--font-pretendard",
});

const baseOptions: BaseLayoutProps = {
  nav: {
    title: "@chaesunbak/registry",
  },
  githubUrl: `https://github.com/chaesunbak/registry`,
};

export default function Layout({ children }: LayoutProps<"/">) {
  const tree = source.getPageTree();

  return (
    <html lang="ko" className={pretendard.variable} suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        <TooltipProvider>
          <DialogProvider />
          <RootProvider>
            <DocsLayout tree={tree} {...baseOptions}>
              {children}
            </DocsLayout>
          </RootProvider>
        </TooltipProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
