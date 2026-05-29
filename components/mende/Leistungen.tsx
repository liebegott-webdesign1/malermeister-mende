import type { HomeLeistungen } from "@/tina/__generated__/types";

type LeistungenProps = HomeLeistungen;

/**
 * Leistungen-Kacheln — sechs Karten als verlinkte Bild-Kacheln.
 * Section-id="leistungen", bg-sand/50 mit scroll-mt-24 für Anker-Navigation.
 * Karten und ihre Ziele kommen vollstaendig aus den Props (items[].href).
 */
export function Leistungen({ eyebrow, heading, intro, items }: LeistungenProps) {
  return (
    <section id="leistungen" className="py-20 lg:py-24 bg-sand/50 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-12">
          {eyebrow ? (
            <p className="text-bordeaux font-semibold uppercase tracking-[0.18em] text-sm mb-3">
              {eyebrow}
            </p>
          ) : null}
          {heading ? (
            <h2 className="font-serif text-3xl lg:text-4xl font-bold text-ink leading-tight">
              {heading}
            </h2>
          ) : null}
          {intro ? (
            <p className="mt-4 text-lg text-stone">{intro}</p>
          ) : null}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items?.map((item, index) => (
            <a
              key={index}
              href={item?.href ?? "#galerie"}
              className="group bg-white rounded-2xl overflow-hidden ring-1 ring-sand shadow-sm hover:shadow-lg transition fade-up"
            >
              <div className="h-48 overflow-hidden">
                {item?.image ? (
                  <img
                    src={item.image}
                    alt={item.title ?? ""}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                ) : null}
              </div>
              <div className="p-6">
                {item?.title ? (
                  <h3 className="font-serif text-xl font-semibold text-ink">
                    {item.title}
                  </h3>
                ) : null}
                {item?.text ? (
                  <p className="mt-2 text-stone text-[15px]">{item.text}</p>
                ) : null}
              </div>
            </a>
          ))}
        </div>

        <div className="mt-10">
          <a
            href="#galerie"
            className="inline-flex items-center gap-2 text-bordeaux font-semibold hover:gap-3 transition-all"
          >
            Steffen Mende als Kunstmaler kennenlernen →
          </a>
        </div>
      </div>
    </section>
  );
}
