import React from "react";
import { tinaField } from "tinacms/dist/react";
import type { HomeQuery } from "@/tina/__generated__/types";

type BewertungenData = NonNullable<HomeQuery["home"]>["bewertungen"];

export interface BewertungenProps {
  data?: BewertungenData;
}

export const Bewertungen: React.FC<BewertungenProps> = ({ data }) => {
  return (
    <section className="py-20 lg:py-24 bg-sand/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-4">
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
        {data?.placeholderNote && (
          <div className="mb-10 inline-flex items-center gap-3 bg-amber-50 border border-amber-200 text-amber-800 text-sm rounded-lg px-4 py-3">
            <svg
              className="w-5 h-5 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
              />
            </svg>
            <span data-tina-field={tinaField(data, "placeholderNote")}>
              <strong>Platzhalter:</strong> {data.placeholderNote}
            </span>
          </div>
        )}
        <div className="grid md:grid-cols-3 gap-6">
          {data?.items?.map((item, index) => (
            <figure
              key={index}
              data-tina-field={item ? tinaField(item) : undefined}
              className="bg-white rounded-2xl p-7 ring-1 ring-sand shadow-sm relative"
            >
              <span className="absolute top-4 right-5 text-[11px] uppercase tracking-wider font-semibold text-amber-600">
                Beispiel
              </span>
              <div className="flex gap-0.5 text-amber-400 mb-4">★★★★★</div>
              <blockquote
                data-tina-field={item ? tinaField(item, "quote") : undefined}
                className="text-ink/90 leading-relaxed"
              >
                {item?.quote}
              </blockquote>
              <figcaption
                data-tina-field={item ? tinaField(item, "author") : undefined}
                className="mt-5 text-sm text-stone"
              >
                {item?.author}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
};
