"use client";

import React from "react";
import { useLayout } from "../../layout/layout-context";
import type { DetailseiteHero } from "@/tina/__generated__/types";

export type DetailHeroProps = Partial<DetailseiteHero>;

/**
 * Hero-Sektion der Detailseiten (Malermeister Mende).
 *
 * Markup originalgetreu aus 02_Website/der-kunstmaler.html bzw.
 * holz-und-marmor.html: zweispaltiges Grid, Text links (order-2 lg:order-1),
 * Bild rechts (order-1 lg:order-2). Breadcrumb oben, optionaler Badge,
 * Primär-CTA als Theme-Button, Telefon-Sekundär-CTA aus useLayout().
 *
 * Schriftgewichte als Tokens (font-700 → font-bold, font-600 → font-semibold),
 * Markenfarbe über Tokens, Text auf der Primärfläche = text-bordeaux-foreground.
 * Interne Links als Next.js-Routen ("/"), nicht als .html.
 */
export const DetailHero: React.FC<DetailHeroProps> = ({
  badge,
  headlineLead,
  headlineHighlight,
  subline,
  image,
  primaryCtaLabel,
  primaryCtaHref,
  backLabel,
}) => {
  const { globalSettings } = useLayout();
  const contact = globalSettings?.contact;
  const phoneRaw = contact?.phoneRaw ?? "";
  const phoneDisplay = contact?.phoneDisplay ?? "";

  return (
    <section className="relative">
      <div className="grid lg:grid-cols-2">
        <div className="flex items-center px-6 sm:px-10 lg:pl-[max(2rem,calc((100vw-80rem)/2+2rem))] lg:pr-12 py-16 lg:py-24 order-2 lg:order-1">
          <div className="max-w-xl">
            <nav className="text-sm text-stone mb-5">
              <a href="/" className="hover:text-bordeaux">
                Start
              </a>{" "}
              <span className="mx-1">›</span>{" "}
              {backLabel && <span className="text-ink">{backLabel}</span>}
            </nav>

            {badge && (
              <p className="inline-flex items-center gap-2 text-bordeaux font-semibold text-sm uppercase tracking-[0.18em] mb-5">
                <span className="h-px w-8 bg-bordeaux"></span> {badge}
              </p>
            )}

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-[3.4rem] font-bold leading-[1.05] text-ink">
              {headlineLead}{" "}
              {headlineHighlight && (
                <span className="text-bordeaux">{headlineHighlight}</span>
              )}
            </h1>

            {subline && (
              <p className="mt-6 text-lg text-stone leading-relaxed">
                {subline}
              </p>
            )}

            <div className="mt-9 flex flex-col sm:flex-row gap-4">
              {primaryCtaLabel && (
                <a
                  href={primaryCtaHref ?? "/#kontakt"}
                  className="bg-bordeaux hover:bg-bordeaux-dark text-bordeaux-foreground text-center px-7 py-4 rounded-xl font-semibold shadow-md transition"
                >
                  {primaryCtaLabel}
                </a>
              )}
              {phoneRaw && (
                <a
                  href={`tel:${phoneRaw}`}
                  className="flex items-center justify-center gap-2 border-2 border-bordeaux/30 hover:border-bordeaux text-ink px-7 py-4 rounded-xl font-semibold transition"
                >
                  <svg
                    className="w-5 h-5 text-bordeaux"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M2 3.5A1.5 1.5 0 013.5 2h1.148a1.5 1.5 0 011.465 1.175l.716 3.223a1.5 1.5 0 01-1.052 1.767l-.933.267c.41 1.62 1.7 2.91 3.32 3.32l.267-.933a1.5 1.5 0 011.767-1.052l3.223.716A1.5 1.5 0 0118 13.352V14.5a1.5 1.5 0 01-1.5 1.5H15c-7.18 0-13-5.82-13-13V3.5z" />
                  </svg>
                  {phoneDisplay}
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="relative order-1 lg:order-2 min-h-[280px] lg:min-h-[560px]">
          {image && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={image}
              alt={
                headlineHighlight
                  ? `${headlineHighlight} — Malermeister Mende`
                  : "Arbeit von Malermeister Mende"
              }
              className="absolute inset-0 w-full h-full object-cover"
              fetchPriority="high"
            />
          )}
        </div>
      </div>
    </section>
  );
};
