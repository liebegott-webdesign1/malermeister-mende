"use client";

import React from "react";
import { tinaField } from "tinacms/dist/react";
import type { HomeQuery } from "@/tina/__generated__/types";
import { useLayout } from "../layout/layout-context";

type HeroData = NonNullable<HomeQuery["home"]>["hero"];

export interface HeroProps {
  data?: HeroData;
}

/**
 * Hero-Sektion (Malermeister Mende).
 *
 * Markup 1:1 aus 02_Website/index.html uebernommen:
 * zweispaltiges Grid, Text links, Bild rechts mit Gradient-Overlay.
 * Farb-/Font-Klassen auf Design-Tokens gemappt
 * (font-700 -> font-bold, font-600 -> font-semibold).
 * Telefon-Sekundaer-CTA kommt aus dem globalen Kontakt (useLayout()).
 */
export const Hero: React.FC<HeroProps> = ({ data }) => {
  const { globalSettings } = useLayout();
  const contact = globalSettings?.contact;
  const phoneRaw = contact?.phoneRaw ?? "";
  const phoneDisplay = contact?.phoneDisplay ?? "";

  return (
    <section className="relative overflow-hidden">
      <div className="grid lg:grid-cols-2">
        <div className="flex items-center px-6 sm:px-10 lg:pl-[max(2rem,calc((100vw-80rem)/2+2rem))] lg:pr-12 py-16 lg:py-24 order-2 lg:order-1">
          <div className="max-w-xl">
            {data?.badge && (
              <p
                data-tina-field={tinaField(data, "badge")}
                className="inline-flex items-center gap-2 text-bordeaux font-semibold text-sm uppercase tracking-[0.18em] mb-5"
              >
                <span className="h-px w-8 bg-bordeaux"></span> {data.badge}
              </p>
            )}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05] text-ink">
              <span data-tina-field={tinaField(data, "headlineLead")}>
                {data?.headlineLead}
              </span>{" "}
              {data?.headlineHighlight && (
                <span
                  data-tina-field={tinaField(data, "headlineHighlight")}
                  className="text-bordeaux"
                >
                  {data.headlineHighlight}
                </span>
              )}
            </h1>
            {data?.subline && (
              <p
                data-tina-field={tinaField(data, "subline")}
                className="mt-6 text-lg text-stone leading-relaxed"
              >
                {data.subline}
              </p>
            )}
            <div className="mt-9 flex flex-col sm:flex-row gap-4">
              <a
                href="#kontakt"
                data-tina-field={tinaField(data, "primaryCtaLabel")}
                className="bg-bordeaux hover:bg-bordeaux-dark text-bordeaux-foreground text-center px-7 py-4 rounded-xl font-semibold shadow-md transition"
              >
                {data?.primaryCtaLabel ?? "Kostenloses Angebot anfordern"}
              </a>
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
            {data?.trustNote && (
              <p
                data-tina-field={tinaField(data, "trustNote")}
                className="mt-4 text-sm text-stone"
              >
                {data.trustNote}
              </p>
            )}
          </div>
        </div>
        <div className="relative order-1 lg:order-2 min-h-[300px] lg:min-h-[640px]">
          {data?.image && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              data-tina-field={tinaField(data, "image")}
              src={data.image}
              alt={
                data?.headlineHighlight
                  ? `Arbeit von Malermeister Mende in ${data.headlineHighlight}`
                  : "Arbeit von Malermeister Mende"
              }
              className="absolute inset-0 w-full h-full object-cover"
              fetchPriority="high"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-cream/40 lg:from-cream/0 to-transparent"></div>
        </div>
      </div>
    </section>
  );
};
