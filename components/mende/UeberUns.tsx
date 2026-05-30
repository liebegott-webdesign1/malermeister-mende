import React from "react";
import { tinaField } from "tinacms/dist/react";
import type { HomeQuery } from "@/tina/__generated__/types";

type UeberUnsData = NonNullable<HomeQuery["home"]>["ueberUns"];

export interface UeberUnsProps {
  data?: UeberUnsData;
}

export const UeberUns: React.FC<UeberUnsProps> = ({ data }) => {
  return (
    <section id="ueber-uns" className="py-20 lg:py-24 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="order-2 lg:order-1">
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
            {data?.paragraphs?.map((paragraph, index) => (
              <p
                key={index}
                data-tina-field={tinaField(paragraph, "text")}
                className={
                  index === 0
                    ? "mt-5 text-lg text-stone leading-relaxed"
                    : "mt-4 text-lg text-stone leading-relaxed"
                }
              >
                {paragraph?.text}
              </p>
            ))}
            {data?.ctaLabel && (
              <a
                href="/der-kunstmaler"
                data-tina-field={tinaField(data, "ctaLabel")}
                className="inline-flex items-center gap-2 mt-7 text-bordeaux font-semibold hover:gap-3 transition-all"
              >
                {data.ctaLabel}
              </a>
            )}
          </div>
          <div className="order-1 lg:order-2">
            <div className="relative rounded-2xl overflow-hidden ring-1 ring-sand bg-sand">
              {data?.image && (
                <img
                  data-tina-field={tinaField(data, "image")}
                  src={data.image}
                  alt={data?.heading ?? "Über uns"}
                  className="w-full aspect-[4/3] object-cover"
                />
              )}
              {data?.imageNote && (
                <span
                  data-tina-field={tinaField(data, "imageNote")}
                  className="absolute bottom-3 left-3 bg-white/90 text-stone text-xs px-3 py-1.5 rounded-full"
                >
                  {data.imageNote}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
