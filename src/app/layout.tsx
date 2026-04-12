import type { Metadata } from "next";
import { Inter, Lora } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Agent IA sur-mesure — Ergonomia | Julien Talbot",
  description:
    "Un ergonome configure votre agent IA. Il comprend votre travail, agit dessus, et vous aide sans que vous ayez à demander.",
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
    <html lang="fr" className={`${inter.variable} ${lora.variable} antialiased`}>
      <body className="min-h-screen flex flex-col font-sans">{children}</body>
    </html>
  );
}
