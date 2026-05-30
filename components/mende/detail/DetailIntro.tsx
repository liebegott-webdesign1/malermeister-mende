"use client";

import React from "react";
import type { DetailseiteIntro } from "@/tina/__generated__/types";

export type DetailIntroProps = Partial<DetailseiteIntro>;

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
export const DetailIntro: React.FC<DetailIntroProps> = ({
  eyebrow,
  heading,
  paragraphs,
  sideCard,
}) => {
  const sideItems = (sideCard?.items ?? []).filter(
    (item): item is { text: string } => !!item?.text,
  );
  const hasSideCard = !!sideCard && (!!sideCard.heading || sideItems.length > 0);

  return (
    <section className="py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-3 gap-12 items-start">
        <div className="lg:col-span-2">
          {eyebrow && (
            <p className="text-bordeaux font-semibold uppercase tracking-[0.18em] text-sm mb-3">
              {eyebrow}
            </p>
          )}
          {heading && (
            <h2 className="font-serif text-3xl lg:text-4xl font-bold text-ink leading-tight">
              {heading}
            </h2>
          )}
          {paragraphs?.map((paragraph, index) => {
            if (!paragraph?.text) return null;
            return (
              <p
                key={index}
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
              <h3 className="font-serif text-xl font-semibold text-ink mb-4">
                {sideCard.heading}
              </h3>
            )}
            {sideItems.length > 0 && (
              <ul className="space-y-3 text-stone">
                {sideItems.map((item, index) => (
                  <li key={index} className="flex gap-3">
                    <span className="text-bordeaux">◆</span> {item.text}
                  </li>
                ))}
              </ul>
            )}
            {sideCard?.ctaLabel && (
              <p className="mt-5 text-sm text-stone">
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
