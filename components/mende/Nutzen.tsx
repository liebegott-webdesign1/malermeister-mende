import { tinaField } from "tinacms/dist/react";
import type { HomeQuery } from "@/tina/__generated__/types";

type NutzenData = NonNullable<HomeQuery["home"]>["nutzen"];
export interface NutzenProps {
  data?: NutzenData;
}

/**
 * Kurz-Nutzen / Differenzierung — drei Karten.
 * Die SVG-Icons sind im Original fix im Markup (drei verschiedene) und werden
 * hier pro Karten-Index beibehalten; die Daten liefern keine Icons.
 */
const cardIcons = [
  // 01 — Check im Kreis (Festpreis nach Besichtigung)
  <svg
    key="icon-0"
    className="w-6 h-6"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.6}
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>,
  // 02 — Pinsel (Dekorative Techniken vom Profi)
  <svg
    key="icon-1"
    className="w-6 h-6"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.6}
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42"
    />
  </svg>,
  // 03 — Funkeln (Der Maler ist Kunstmaler)
  <svg
    key="icon-2"
    className="w-6 h-6"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.6}
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.456-2.456L14.25 6l1.035-.259a3.375 3.375 0 002.456-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z"
    />
  </svg>,
];

export function Nutzen({ data }: NutzenProps) {
  return (
    <section className="py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          {data?.eyebrow ? (
            <p
              data-tina-field={tinaField(data, "eyebrow")}
              className="text-bordeaux font-semibold uppercase tracking-[0.18em] text-sm mb-3"
            >
              {data.eyebrow}
            </p>
          ) : null}
          {data?.heading ? (
            <h2
              data-tina-field={tinaField(data, "heading")}
              className="font-serif text-3xl lg:text-4xl font-bold text-ink leading-tight"
            >
              {data.heading}
            </h2>
          ) : null}
          {data?.intro ? (
            <p
              data-tina-field={tinaField(data, "intro")}
              className="mt-5 text-lg text-stone leading-relaxed"
            >
              {data.intro}
            </p>
          ) : null}
        </div>
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          {data?.cards?.map((card, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-7 ring-1 ring-sand shadow-sm fade-up"
            >
              <div className="w-12 h-12 rounded-xl bg-cream flex items-center justify-center text-bordeaux mb-5">
                {cardIcons[index % cardIcons.length]}
              </div>
              {card?.title ? (
                <h3
                  data-tina-field={tinaField(card, "title")}
                  className="font-serif text-xl font-semibold text-ink"
                >
                  {card.title}
                </h3>
              ) : null}
              {card?.text ? (
                <p
                  data-tina-field={tinaField(card, "text")}
                  className="mt-2 text-stone"
                >
                  {card.text}
                </p>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
