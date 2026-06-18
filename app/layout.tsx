import type { Metadata } from "next";
import { Inter, Playfair_Display, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains" });

export const metadata: Metadata = {
  title: "Imoria Learning | Learn Smart. Rise Beyond.",
  description: "Educational platform for BS English Semester-III students at BZ University, Multan.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} ${jetbrains.variable}`}>
      <body className="bg-[#0D1B2A] text-white font-sans antialiased selection:bg-[#C9A84C]/30 selection:text-[#E8C97A]">
        {children}
      </body>
    </html>
  );
}
