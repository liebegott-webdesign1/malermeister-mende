import React, { PropsWithChildren } from "react";
import { LayoutProvider } from "./layout-context";
import client from "../../tina/__generated__/client";
import { Header } from "./nav/header";
import { Footer } from "./nav/footer";

type LayoutProps = PropsWithChildren & {
  rawPageData?: any;
};

/**
 * Theme-Helfer: leitet aus der gewählten Primärfarbe alle Töne ab
 * (dunkel für Hover, hell für Akzente, Kontrast-Textfarbe) und gibt sie als
 * CSS-Variablen zurück. Alles wird in JS berechnet und gemeinsam auf dem
 * Wrapper gesetzt — so folgen Hover, Footer-Logo und Eyebrows immer der
 * gewählten Farbe (keine Abhängigkeit von CSS-Vererbung/color-mix).
 */
type RGB = [number, number, number];

function parseHex(color: string): RGB | null {
  const m = /^#?([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.exec((color || "").trim());
  if (!m) return null;
  let h = m[1];
  if (h.length === 3)
    h = h
      .split("")
      .map((c) => c + c)
      .join("");
  return [
    parseInt(h.slice(0, 2), 16),
    parseInt(h.slice(2, 4), 16),
    parseInt(h.slice(4, 6), 16),
  ];
}

function toHex(rgb: RGB): string {
  const h = (n: number) =>
    Math.max(0, Math.min(255, Math.round(n))).toString(16).padStart(2, "0");
  return `#${h(rgb[0])}${h(rgb[1])}${h(rgb[2])}`;
}

function mix(rgb: RGB, target: RGB, f: number): RGB {
  return [
    rgb[0] * (1 - f) + target[0] * f,
    rgb[1] * (1 - f) + target[1] * f,
    rgb[2] * (1 - f) + target[2] * f,
  ];
}

function readableForeground(rgb: RGB): string {
  const lin = (c: number) => {
    const v = c / 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  };
  const luminance = 0.2126 * lin(rgb[0]) + 0.7152 * lin(rgb[1]) + 0.0722 * lin(rgb[2]);
  return luminance > 0.45 ? "#2a2522" : "#ffffff";
}

function themeVars(color: string): Record<string, string> {
  const rgb = parseHex(color) || [128, 0, 0];
  return {
    "--bordeaux": toHex(rgb),
    "--bordeaux-dark": toHex(mix(rgb, [0, 0, 0], 0.22)),
    "--bordeaux-light": toHex(mix(rgb, [255, 255, 255], 0.2)),
    "--bordeaux-foreground": readableForeground(rgb),
  };
}

export default async function Layout({ children, rawPageData }: LayoutProps) {
  const { data: globalData } = await client.queries.global(
    {
      relativePath: "index.json",
    },
    {
      fetchOptions: {
        next: {
          revalidate: 60,
        },
      },
    }
  );

  // Theme-Farbe des Kunden -> alle abgeleiteten Töne als CSS-Variablen.
  const bordeaux = globalData.global?.theme?.color || "#800000";

  return (
    <LayoutProvider globalSettings={globalData.global} pageData={rawPageData}>
      <div
        style={themeVars(bordeaux) as React.CSSProperties}
        className="flex min-h-screen flex-col bg-cream text-ink"
      >
        <Header />
        <main className="flex-1 overflow-x-hidden">{children}</main>
        <Footer />
      </div>
    </LayoutProvider>
  );
}
