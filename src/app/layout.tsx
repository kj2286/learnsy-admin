import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { DataProvider } from "@/context/DataContext";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Learnsy 관리자",
  description: "Learnsy 관리자 시스템",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${geist.variable} h-full antialiased`}>
      <body className="h-full font-sans">
        <DataProvider>{children}</DataProvider>
      </body>
    </html>
  );
}
