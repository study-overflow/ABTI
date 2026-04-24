import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ABTI · Anthropic Being Type Indicator",
  description:
    "AI 时代人类主体性测试。30 道题，16 种类型，测出你面对 AI 浪潮时的存在姿态。你是 HUMAN 还是 CYBORG？是 UTOPIA 还是 DOOMER？",
  keywords: [
    "ABTI",
    "MBTI",
    "人类主体性",
    "AI 时代",
    "人格测试",
    "主体性",
    "Anthropic Being",
  ],
  icons: { icon: "/icon.svg", shortcut: "/icon.svg", apple: "/icon.svg" },
  openGraph: {
    title: "ABTI · Anthropic Being Type Indicator",
    description: "AI 时代人类主体性测试。30 道题，16 种存在姿态。",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN" className="antialiased">
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
