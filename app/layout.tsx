import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AURA 智能纯电汽车",
  description: "面向未来的智能纯电出行品牌网站原型。",
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="zh-CN"><body>{children}</body></html>;
}
