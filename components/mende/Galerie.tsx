"use client";

import { useEffect, useState } from "react";

export interface GalerieFilter {
  key?: string | null;
  label?: string | null;
}

export interface GalerieItem {
  image?: string | null;
  alt?: string | null;
  category?: string | null;
}

export interface GalerieProps {
  eyebrow?: string | null;
  heading?: string | null;
  intro?: string | null;
  filters?: Array<GalerieFilter | null> | null;
  items?: Array<GalerieItem | null> | null;
}

export function Galerie({ eyebrow, heading, intro, filters, items }: GalerieProps) {
  const [activeKey, setActiveKey] = useState("all");
  const [lightbox, setLightbox] = useState<GalerieItem | null>(null);

  // Body-Scroll sperren, solange die Lightbox offen ist + Escape schliesst sie
  useEffect(() => {
    if (!lightbox) return;
    document.body.classList.add("lb-active");
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.classList.remove("lb-active");
      window.removeEventListener("keydown", onKey);
    };
  }, [lightbox]);

  const visibleItems = (items ?? []).filter(
    (item): item is GalerieItem =>
      !!item && (activeKey === "all" || item.category === activeKey),
  );

  return (
    <section id="galerie" className="py-20 lg:py-24 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-10">
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
          {intro ? <p className="mt-4 text-lg text-stone">{intro}</p> : null}
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          {filters?.map((filter, i) => {
            if (!filter) return null;
            const key = filter.key ?? "all";
            const isActive = key === activeKey;
            return (
              <button
                key={`${key}-${i}`}
                type="button"
                onClick={() => setActiveKey(key)}
                className={`px-4 py-2 rounded-full text-sm font-semibold border border-bordeaux/20 transition ${
                  isActive
                    ? "bg-bordeaux text-bordeaux-foreground"
                    : "bg-white text-ink hover:bg-cream"
                }`}
              >
                {filter.label}
              </button>
            );
          })}
        </div>

        <div className="columns-2 md:columns-3 lg:columns-4 gap-4 [&>*]:mb-4">
          {visibleItems.map((item, i) => (
            <figure
              key={`${item.image ?? "img"}-${i}`}
              className="gal-item break-inside-avoid rounded-xl overflow-hidden ring-1 ring-sand cursor-zoom-in"
              data-cat={item.category ?? ""}
              onClick={() => setLightbox(item)}
            >
              {item.image ? (
                <img
                  loading="lazy"
                  src={item.image}
                  alt={item.alt ?? ""}
                  className="w-full"
                />
              ) : null}
            </figure>
          ))}
        </div>

        <div className="mt-10 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
          <a
            href="/der-kunstmaler"
            className="inline-flex items-center gap-2 bg-bordeaux hover:bg-bordeaux-dark text-bordeaux-foreground px-6 py-3 rounded-xl font-semibold transition"
          >
            Mehr Gemälde ansehen →
          </a>
          <a
            href="/holz-und-marmor"
            className="inline-flex items-center gap-2 text-bordeaux font-semibold"
          >
            Holz &amp; Marmor im Detail →
          </a>
        </div>
      </div>

      {lightbox ? (
        <div
          className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
          role="dialog"
          aria-modal="true"
        >
          <button
            type="button"
            onClick={() => setLightbox(null)}
            aria-label="Schließen"
            className="absolute top-5 right-5 text-white/90 hover:text-white"
          >
            <svg
              className="w-9 h-9"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.8}
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          {lightbox.image ? (
            <img
              src={lightbox.image}
              alt={lightbox.alt ?? ""}
              className="max-w-full max-h-[88vh] w-auto h-auto rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          ) : null}
        </div>
      ) : null}
    </section>
  );
}
