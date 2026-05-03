import type { Metadata } from "next";
import { Geist, Lora, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://agent.ergonomia.re"),
  title: "Agent IA sur-mesure — brique avancée | Ergonomia",
  description:
    "Brique avancée pour un usage IA déjà cadré : un ergonome configure votre agent à partir du travail réel, avec validation, limites et traçabilité.",
  openGraph: {
    title: "Agent IA sur-mesure — brique avancée Ergonomia",
    description:
      "L’agent vient après la compréhension du travail réel : routines cadrées, validation, limites et traçabilité.",
    url: "https://agent.ergonomia.re",
    type: "website",
    locale: "fr_FR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Agent IA sur-mesure — brique avancée Ergonomia",
    description:
      "L’agent vient après la compréhension du travail réel : routines cadrées, validation, limites et traçabilité.",
  },
  alternates: {
    canonical: "https://agent.ergonomia.re",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${geist.variable} ${lora.variable} ${jetbrainsMono.variable} antialiased`}>
      <head>
        <script
          defer
          data-domain="agent.ergonomia.re"
          src="https://plausible.io/js/script.js"
        />
      </head>
      <body className="min-h-screen flex flex-col font-sans">{children}</body>
    </html>
  );
}
