import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CBTI - 程序员行为类型测试",
  description: "你是 SUDO 还是 NULL？30 道题测出你的编程人格。27 种程序员人格类型等你解锁。",
  keywords: ["CBTI", "程序员测试", "编程人格", "MBTI", "程序员性格", "Vibe Coding"],
  icons: { icon: "/icon.svg", shortcut: "/icon.svg", apple: "/icon.svg" },
  openGraph: {
    title: "CBTI - 你是什么类型的程序员？",
    description: "30 道题，测出你的编程人格。你是 SUDO 还是 NULL？",
    type: "website",
    url: "https://cbti.codefather.cn",
  },
  metadataBase: new URL("https://cbti.codefather.cn"),
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN" className="antialiased">
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
