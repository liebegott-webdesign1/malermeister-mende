import React from "react";
import { Metadata } from "next";
import { Cormorant_Garamond, Source_Sans_3 } from "next/font/google";
import { cn } from "@/lib/utils";

import "@/styles.css";

const fontSerif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-serif",
  display: "swap",
});

const fontSans = Source_Sans_3({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Malermeister Mende — Maler & dekorative Techniken in Halle (Saale)",
  description:
    "Malermeister Steffen Mende aus Halle (Saale): klassische Malerarbeiten, Stuckmarmor, Lasuren, Spritztechnik, Tapezieren, dekorative Kreativtechnik und Kunstmalerei. Meisterbetrieb — kostenloses Angebot anfordern.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="de"
      className={cn(fontSerif.variable, fontSans.variable, "scroll-smooth")}
    >
      <body className="min-h-screen bg-cream text-ink font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
