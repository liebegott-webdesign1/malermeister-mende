"use client";

import React from "react";
import { tinaField } from "tinacms/dist/react";
import type { DetailseiteQuery } from "@/tina/__generated__/types";

type DetailAblaufData = NonNullable<DetailseiteQuery["detailseite"]>["ablauf"];

export interface DetailAblaufProps {
  data?: DetailAblaufData;
}

/**
 * Ablauf-Sektion der Detailseiten (Malermeister Mende) — optional.
 *
 * Markup aus 02_Website/holz-und-marmor.html: py-20 lg:py-24, max-w-7xl,
 * grid md:grid-cols-4. Große Nummer (text-bordeaux/20), Titel, Text.
 *
 * Bedingtes Rendern (Template-Gedanke, _CONTRACT2.md Abschnitt 3.4 / 4):
 * Ohne Schritte rendert die Sektion null — Der Kunstmaler hat keinen Ablauf,
 * Holz & Marmor schon. Schritte tragen .fade-up (FadeInit im Renderer).
 */
export const DetailAblauf: React.FC<DetailAblaufProps> = ({ data }) => {
  const steps = data?.steps;
  if (!steps || steps.length === 0) return null;

  return (
    <section className="py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-14">
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
        </div>
        <div className="grid md:grid-cols-4 gap-8">
          {steps.map((step, index) => {
            if (!step) return null;
            return (
              <div key={index} className="fade-up">
                <span
                  data-tina-field={tinaField(step, "number")}
                  className="font-serif text-5xl font-bold text-bordeaux/20"
                >
                  {step.number}
                </span>
                <h3
                  data-tina-field={tinaField(step, "title")}
                  className="font-serif text-xl font-semibold text-ink mt-2"
                >
                  {step.title}
                </h3>
                <p data-tina-field={tinaField(step, "text")} className="mt-2 text-stone">
                  {step.text}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
