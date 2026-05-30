"use client";

import React, { useEffect, useState } from "react";
import { tinaField } from "tinacms/dist/react";
import type { DetailseiteQuery } from "@/tina/__generated__/types";

type DetailGalerieData = NonNullable<DetailseiteQuery["detailseite"]>["galerie"];
type DetailGalerieItem = NonNullable<
  NonNullable<DetailGalerieData>["items"]
>[number];

export interface DetailGalerieProps {
  data?: DetailGalerieData;
}

/**
 * Galerie-Sektion der Detailseiten (Malermeister Mende).
 *
 * Markup aus 02_Website/der-kunstmaler.html / holz-und-marmor.html: festes
 * Raster (grid grid-cols-2 md:grid-cols-3 gap-5), je Bild eine weiße Karte mit
 * Bild im Seitenverhältnis aspect-[4/5] object-cover und — falls vorhanden —
 * einer Bildunterschrift (figcaption). Eigenes id="galerie" + scroll-mt-24,
 * da der Hero-Primär-CTA dorthin verlinkt. Hintergrund bg-sand/50.
 *
 * Lightbox via useState + Body-Klasse .lb-active, schließbar über X-Button,
 * Backdrop-Klick und Escape (identisch zur Homepage-Galerie).
 */
export const DetailGalerie: React.FC<DetailGalerieProps> = ({ data }) => {
  const [lightbox, setLightbox] = useState<NonNullable<DetailGalerieItem> | null>(
    null,
  );

  // Body-Scroll sperren, solange die Lightbox offen ist + Escape schließt sie
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

  const visibleItems = (data?.items ?? []).filter(
    (item): item is NonNullable<DetailGalerieItem> => !!item && !!item.image,
  );

  return (
    <section
      id="galerie"
      className="py-20 lg:py-24 bg-sand/50 scroll-mt-24"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-10">
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
          {data?.intro && (
            <p
              data-tina-field={tinaField(data, "intro")}
              className="mt-4 text-lg text-stone"
            >
              {data.intro}
            </p>
          )}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
          {visibleItems.map((item, index) => (
            <figure
              key={`${item.image ?? "img"}-${index}`}
              className="gal-item fade-up rounded-xl overflow-hidden ring-1 ring-sand cursor-zoom-in bg-white"
              onClick={() => setLightbox(item)}
            >
              <div className="overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  data-tina-field={tinaField(item, "image")}
                  loading="lazy"
                  src={item.image ?? ""}
                  alt={item.alt ?? ""}
                  className="w-full aspect-[4/5] object-cover"
                />
              </div>
              {item.caption && (
                <figcaption
                  data-tina-field={tinaField(item, "caption")}
                  className="p-3 text-sm text-stone"
                >
                  {item.caption}
                </figcaption>
              )}
            </figure>
          ))}
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
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          {lightbox.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              data-tina-field={tinaField(lightbox, "image")}
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
};
