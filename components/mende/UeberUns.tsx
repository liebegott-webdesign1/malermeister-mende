import React from "react";

export interface UeberUnsParagraph {
  text?: string | null;
}

export interface UeberUnsProps {
  eyebrow?: string | null;
  heading?: string | null;
  paragraphs?: Array<UeberUnsParagraph | null> | null;
  image?: string | null;
  imageNote?: string | null;
  ctaLabel?: string | null;
}

export const UeberUns: React.FC<UeberUnsProps> = ({
  eyebrow,
  heading,
  paragraphs,
  image,
  imageNote,
  ctaLabel,
}) => {
  return (
    <section id="ueber-uns" className="py-20 lg:py-24 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="order-2 lg:order-1">
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
            {paragraphs?.map((paragraph, index) => (
              <p
                key={index}
                className={
                  index === 0
                    ? "mt-5 text-lg text-stone leading-relaxed"
                    : "mt-4 text-lg text-stone leading-relaxed"
                }
              >
                {paragraph?.text}
              </p>
            ))}
            {ctaLabel && (
              <a
                href="/der-kunstmaler"
                className="inline-flex items-center gap-2 mt-7 text-bordeaux font-semibold hover:gap-3 transition-all"
              >
                {ctaLabel}
              </a>
            )}
          </div>
          <div className="order-1 lg:order-2">
            <div className="relative rounded-2xl overflow-hidden ring-1 ring-sand bg-sand">
              {image && (
                <img
                  src={image}
                  alt={heading ?? "Über uns"}
                  className="w-full aspect-[4/3] object-cover"
                />
              )}
              {imageNote && (
                <span className="absolute bottom-3 left-3 bg-white/90 text-stone text-xs px-3 py-1.5 rounded-full">
                  {imageNote}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
