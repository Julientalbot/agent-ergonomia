import type { Metadata } from "next";
import { Inter, Lora, JetBrains_Mono } from "next/font/google";
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

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://agent.ergonomia.re"),
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
  twitter: {
    card: "summary_large_image",
    title: "Agent IA sur-mesure — Ergonomia",
    description:
      "Un ergonome configure votre agent IA. Il comprend votre travail et agit dessus.",
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
    <html lang="fr" className={`${inter.variable} ${lora.variable} ${jetbrainsMono.variable} antialiased`}>
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
