import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FDM 3D 打印耗材信息 - FDM Filaments Info",
  description: "浏览与检索 FDM 3D 打印耗材丝配置信息"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body className="min-h-screen bg-zinc-950 text-zinc-100">{children}</body>
    </html>
  );
}

