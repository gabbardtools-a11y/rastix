import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "У Захара — Рассада, саженцы, посадки | Купить саженцы",
  description:
    "В магазине У Захара представлен большой каталог саженцев и рассады по оптимальным ценам от производителя. Купить саженцы и рассаду можно с доставкой почтой по всей России. Гибкая система скидок на опт. Опыт работы более 10 лет.",
  keywords: [
    "саженцы",
    "рассада",
    "посадки",
    "купить саженцы",
    "рассада Москва",
    "многолетние цветы",
    "розы",
    "гортензии",
    "клематисы",
    "хвойные",
    "У Захара",
    "rastix.ru",
  ],
  authors: [{ name: "У Захара" }],
  icons: {
    icon: "/favicon.png",
  },
  openGraph: {
    title: "У Захара — Рассада, саженцы, посадки",
    description:
      "Рассада, саженцы, посадки от производителя. Доставка по всей России. Более 10 лет опыта.",
    url: "https://rastix.ru",
    siteName: "У Захара",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
