export interface EinwandItem {
  question?: string | null;
  answer?: string | null;
}

export interface EinwandProps {
  eyebrow?: string | null;
  heading?: string | null;
  items?: Array<EinwandItem | null> | null;
  ctaLabel?: string | null;
}

export function Einwand({ eyebrow, heading, items, ctaLabel }: EinwandProps) {
  return (
    <section className="py-20 lg:py-24 bg-ink text-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-12">
          {eyebrow ? (
            <p className="text-bordeaux-light font-semibold uppercase tracking-[0.18em] text-sm mb-3">
              {eyebrow}
            </p>
          ) : null}
          {heading ? (
            <h2 className="font-serif text-3xl lg:text-4xl font-bold leading-tight">
              {heading}
            </h2>
          ) : null}
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {items?.map((item, i) => {
            if (!item) return null;
            return (
              <div key={`${item.question ?? "frage"}-${i}`}>
                {item.question ? (
                  <h3 className="font-serif text-xl font-semibold text-white">
                    {item.question}
                  </h3>
                ) : null}
                {item.answer ? (
                  <p className="mt-3 text-cream/75 leading-relaxed">{item.answer}</p>
                ) : null}
              </div>
            );
          })}
        </div>
        {ctaLabel ? (
          <div className="mt-12">
            <a
              href="#kontakt"
              className="inline-block bg-bordeaux hover:bg-bordeaux-light text-bordeaux-foreground px-7 py-4 rounded-xl font-semibold transition shadow"
            >
              {ctaLabel}
            </a>
          </div>
        ) : null}
      </div>
    </section>
  );
}
