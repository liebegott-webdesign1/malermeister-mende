import { tinaField } from "tinacms/dist/react";
import type { HomeQuery } from "@/tina/__generated__/types";

type EinwandData = NonNullable<HomeQuery["home"]>["einwand"];

export interface EinwandProps {
  data?: EinwandData;
}

export function Einwand({ data }: EinwandProps) {
  return (
    <section className="py-20 lg:py-24 bg-ink text-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-12">
          {data?.eyebrow ? (
            <p
              data-tina-field={tinaField(data, "eyebrow")}
              className="text-bordeaux-light font-semibold uppercase tracking-[0.18em] text-sm mb-3"
            >
              {data.eyebrow}
            </p>
          ) : null}
          {data?.heading ? (
            <h2
              data-tina-field={tinaField(data, "heading")}
              className="font-serif text-3xl lg:text-4xl font-bold leading-tight"
            >
              {data.heading}
            </h2>
          ) : null}
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {data?.items?.map((item, i) => {
            if (!item) return null;
            return (
              <div key={`${item.question ?? "frage"}-${i}`}>
                {item.question ? (
                  <h3
                    data-tina-field={tinaField(item, "question")}
                    className="font-serif text-xl font-semibold text-white"
                  >
                    {item.question}
                  </h3>
                ) : null}
                {item.answer ? (
                  <p
                    data-tina-field={tinaField(item, "answer")}
                    className="mt-3 text-cream/75 leading-relaxed"
                  >
                    {item.answer}
                  </p>
                ) : null}
              </div>
            );
          })}
        </div>
        {data?.ctaLabel ? (
          <div className="mt-12">
            <a
              data-tina-field={tinaField(data, "ctaLabel")}
              href="#kontakt"
              className="inline-block bg-bordeaux hover:bg-bordeaux-light text-bordeaux-foreground px-7 py-4 rounded-xl font-semibold transition shadow"
            >
              {data.ctaLabel}
            </a>
          </div>
        ) : null}
      </div>
    </section>
  );
}
