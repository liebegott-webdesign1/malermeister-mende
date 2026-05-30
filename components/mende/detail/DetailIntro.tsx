"use client";

import React from "react";
import { tinaField } from "tinacms/dist/react";
import type { DetailseiteQuery } from "@/tina/__generated__/types";

type DetailIntroData = NonNullable<DetailseiteQuery["detailseite"]>["intro"];

export interface DetailIntroProps {
  data?: DetailIntroData;
}

/**
 * Intro-Sektion der Detailseiten (Malermeister Mende).
 *
 * Markup aus 02_Website/der-kunstmaler.html / holz-und-marmor.html:
 * py-20 lg:py-24, max-w-7xl, dreispaltiges Grid (linke Spalte lg:col-span-2).
 * Eyebrow, Heading und die Absätze (paragraphs[].text). Wenn `sideCard`
 * gesetzt ist, erscheint rechts als dritte Spalte die weiße Info-Karte der
 * HTML-Vorlagen (Überschrift, Bullet-Liste, optionaler CTA-Link); ohne
 * sideCard bleibt der Block wie bisher zweispaltig.
 *
 * Absätze tragen .fade-up (FadeInit ist im Renderer eingebunden).
 */
export const DetailIntro: React.FC<DetailIntroProps> = ({ data }) => {
  const sideCard = data?.sideCard;
  const sideItems = (sideCard?.items ?? []).filter(
    (item) => !!item?.text,
  );
  const hasSideCard =
    !!sideCard && (!!sideCard.heading || sideItems.length > 0);

  return (
    <section className="py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-3 gap-12 items-start">
        <div className="lg:col-span-2">
          {data?.eyebrow && (
            <p
              data-tina-field={tinaField(data, "eyebrow")}
              className="text-bordeaux font-semibold uppercase tracking-[0.18em] text-sm mb-3"
            >
              {data.eyebrow}
            </p>
          )}
          {data?.heading && (
            <h2
              data-tina-field={tinaField(data, "heading")}
              className="font-serif text-3xl lg:text-4xl font-bold text-ink leading-tight"
            >
              {data.heading}
            </h2>
          )}
          {data?.paragraphs?.map((paragraph, index) => {
            if (!paragraph?.text) return null;
            return (
              <p
                key={index}
                data-tina-field={tinaField(paragraph, "text")}
                className={`fade-up text-lg text-stone leading-relaxed ${
                  index === 0 ? "mt-5" : "mt-4"
                }`}
              >
                {paragraph.text}
              </p>
            );
          })}
        </div>

        {hasSideCard && (
          <div className="bg-white rounded-2xl p-7 ring-1 ring-sand shadow-sm self-start">
            {sideCard?.heading && (
              <h3
                data-tina-field={tinaField(sideCard, "heading")}
                className="font-serif text-xl font-semibold text-ink mb-4"
              >
                {sideCard.heading}
              </h3>
            )}
            {sideItems.length > 0 && (
              <ul className="space-y-3 text-stone">
                {sideItems.map((item, index) => {
                  if (!item) return null;
                  return (
                    <li
                      key={index}
                      data-tina-field={tinaField(item, "text")}
                      className="flex gap-3"
                    >
                      <span className="text-bordeaux">◆</span> {item.text}
                    </li>
                  );
                })}
              </ul>
            )}
            {sideCard?.ctaLabel && (
              <p
                data-tina-field={tinaField(sideCard, "ctaLabel")}
                className="mt-5 text-sm text-stone"
              >
                {sideCard.ctaHref ? (
                  <a
                    href={sideCard.ctaHref}
                    className="text-bordeaux font-semibold"
                  >
                    {sideCard.ctaLabel}
                  </a>
                ) : (
                  sideCard.ctaLabel
                )}
              </p>
            )}
          </div>
        )}
      </div>
    </section>
  );
};
