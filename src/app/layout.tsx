import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Agent IA sur-mesure — Ergonomia | Julien Talbot",
  description:
    "Un ergonome configure votre agent IA. Il comprend votre travail, agit dessus, et vous aide sans que vous ayez a demander.",
  openGraph: {
    title: "Agent IA sur-mesure — Ergonomia",
    description:
      "Un ergonome configure votre agent IA. Il comprend votre travail et agit dessus.",
    url: "https://agent.ergonomia.re",
    type: "website",
    locale: "fr_FR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${geistSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
