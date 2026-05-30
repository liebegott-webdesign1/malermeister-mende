import React from "react";
import { tinaField } from "tinacms/dist/react";
import type { HomeQuery } from "@/tina/__generated__/types";

type TrustBarData = NonNullable<HomeQuery["home"]>["trustBar"];

export interface TrustBarProps {
  data?: TrustBarData;
}

/**
 * Trust-Bar-Sektion (Malermeister Mende).
 *
 * Markup 1:1 aus 02_Website/index.html: bordeauxfarbenes Band,
 * 4-spaltiges Grid mit vertikalen Trennern (divide-x divide-white/15).
 * Farb-/Font-Klassen auf Design-Tokens gemappt (font-600 -> font-semibold).
 * Inhalte ausschliesslich aus dem data-Objekt (data[].title / data[].subtitle).
 */
export const TrustBar: React.FC<TrustBarProps> = ({ data }) => {
  return (
    <section className="bg-bordeaux text-bordeaux-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-6 gap-x-4 text-center divide-x divide-white/15">
          {data?.map((item, index) => (
            <div key={index} className="px-2" data-tina-field={tinaField(item)}>
              <p
                data-tina-field={tinaField(item, "title")}
                className="font-serif text-2xl font-semibold"
              >
                {item?.title}
              </p>
              <p
                data-tina-field={tinaField(item, "subtitle")}
                className="text-bordeaux-foreground/75 text-sm mt-1"
              >
                {item?.subtitle}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
