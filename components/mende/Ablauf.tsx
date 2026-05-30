import React from "react";
import { tinaField } from "tinacms/dist/react";
import type { HomeQuery } from "@/tina/__generated__/types";

type AblaufData = NonNullable<HomeQuery["home"]>["ablauf"];

export interface AblaufProps {
  data?: AblaufData;
}

export const Ablauf: React.FC<AblaufProps> = ({ data }) => {
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
          {data?.steps?.map((step, index) => (
            <div key={index} className="relative">
              <span
                data-tina-field={tinaField(step, "number")}
                className="font-serif text-5xl font-bold text-bordeaux/20"
              >
                {step?.number}
              </span>
              <h3
                data-tina-field={tinaField(step, "title")}
                className="font-serif text-xl font-semibold text-ink mt-2"
              >
                {step?.title}
              </h3>
              <p data-tina-field={tinaField(step, "text")} className="mt-2 text-stone">
                {step?.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
