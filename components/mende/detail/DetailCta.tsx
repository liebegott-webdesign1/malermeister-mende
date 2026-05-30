"use client";

import React from "react";
import { tinaField } from "tinacms/dist/react";
import { useLayout } from "../../layout/layout-context";
import type { DetailseiteQuery } from "@/tina/__generated__/types";

type DetailCtaData = NonNullable<DetailseiteQuery["detailseite"]>["cta"];

export interface DetailCtaProps {
  data?: DetailCtaData;
}

/**
 * Abschluss-CTA der Detailseiten (Malermeister Mende).
 *
 * Markup aus 02_Website/der-kunstmaler.html / holz-und-marmor.html:
 * dunkle Sektion (bg-ink text-cream), zentriert, max-w-4xl.
 * Primär-CTA als Theme-Button (text-bordeaux-foreground, hover:bg-bordeaux-light),
 * Telefon-Sekundär-CTA fest aus useLayout(). Interner Link als Route ("/#kontakt").
 */
export const DetailCta: React.FC<DetailCtaProps> = ({ data }) => {
  const { globalSettings } = useLayout();
  const contact = globalSettings?.contact;
  const phoneRaw = contact?.phoneRaw ?? "";
  const phoneDisplay = contact?.phoneDisplay ?? "";

  return (
    <section className="py-16 lg:py-20 bg-ink text-cream">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {data?.heading && (
          <h2
            data-tina-field={tinaField(data, "heading")}
            className="font-serif text-3xl lg:text-4xl font-bold text-white leading-tight"
          >
            {data.heading}
          </h2>
        )}
        {data?.text && (
          <p
            data-tina-field={tinaField(data, "text")}
            className="mt-4 text-lg text-cream/75"
          >
            {data.text}
          </p>
        )}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          {data?.primaryLabel && (
            <a
              href={data?.primaryHref ?? "/#kontakt"}
              data-tina-field={tinaField(data, "primaryLabel")}
              className="bg-bordeaux hover:bg-bordeaux-light text-bordeaux-foreground px-7 py-4 rounded-xl font-semibold transition shadow"
            >
              {data.primaryLabel}
            </a>
          )}
          {phoneRaw && (
            <a
              href={`tel:${phoneRaw}`}
              className="flex items-center justify-center gap-2 border-2 border-white/25 hover:border-white text-white px-7 py-4 rounded-xl font-semibold transition"
            >
              <svg
                className="w-5 h-5"
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
    </section>
  );
};
