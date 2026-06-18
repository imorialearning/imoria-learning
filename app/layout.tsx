import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Imoria Learning | Learn Smart. Rise Beyond.",
  description: "Educational portal for BS English Semester-III at BZU",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
