"use client";

import React from "react";
import type { DetailseiteIntro } from "@/tina/__generated__/types";

export type DetailIntroProps = Partial<DetailseiteIntro>;

/**
 * Intro-Sektion der Detailseiten (Malermeister Mende).
 *
 * Markup aus 02_Website/der-kunstmaler.html / holz-und-marmor.html:
 * py-20 lg:py-24, max-w-7xl, dreispaltiges Grid (linke Spalte lg:col-span-2).
 * Eyebrow, Heading und die Absätze (paragraphs[].text). Die rechte Info-Karte
 * der HTML-Vorlagen ist laut _CONTRACT2.md (Abschnitt 3.2) NICHT Teil des
 * Schemas und wird hier bewusst nicht gerendert.
 *
 * Absätze tragen .fade-up (FadeInit ist im Renderer eingebunden).
 */
export const DetailIntro: React.FC<DetailIntroProps> = ({
  eyebrow,
  heading,
  paragraphs,
}) => {
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
      </div>
    </section>
  );
};
