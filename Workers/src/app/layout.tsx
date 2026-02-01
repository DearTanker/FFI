import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FFI 耗材丝设置",
  description: "浏览与检索仓库中的耗材丝配置"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body className="min-h-screen bg-zinc-950 text-zinc-100">{children}</body>
    </html>
  );
}

