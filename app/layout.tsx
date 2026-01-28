import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "AI 工具导航 | 发现最好的 AI 软件和工具",
  description: "精选全球热门 AI 工具，涵盖聊天、绘画、视频、编程等多个领域，助你提升工作效率。",
  keywords: "AI工具, AI导航, ChatGPT, Midjourney, AI绘图, AI写作, 人工智能软件",
};

import { Footer } from "@/components/Footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        {children}
        <Footer />
      </body>
    </html>
  );
}
