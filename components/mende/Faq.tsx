"use client";
import React from "react";
import { useLayout } from "../layout/layout-context";

export interface FaqItem {
  question?: string | null;
  answer?: string | null;
}

export interface FaqProps {
  eyebrow?: string | null;
  heading?: string | null;
  items?: Array<FaqItem | null> | null;
  footerNote?: string | null;
}

export const Faq: React.FC<FaqProps> = ({
  eyebrow,
  heading,
  items,
  footerNote,
}) => {
  const { globalSettings } = useLayout();
  const phoneRaw = globalSettings?.contact?.phoneRaw;

  return (
    <section className="py-20 lg:py-24 bg-sand/50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
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
        </div>
        <div className="space-y-3">
          {items?.map((item, index) => (
            <details
              key={index}
              className="bg-white rounded-xl ring-1 ring-sand p-5 group"
            >
              <summary className="flex items-center justify-between font-semibold text-ink text-lg">
                {item?.question}
                <svg
                  className="faq-icon w-5 h-5 text-bordeaux transition-transform"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" />
                </svg>
              </summary>
              <p className="mt-3 text-stone leading-relaxed">{item?.answer}</p>
            </details>
          ))}
        </div>
        {footerNote && (
          <p className="text-center mt-8 text-stone">
            {phoneRaw ? (
              <a
                href={`tel:${phoneRaw}`}
                className="text-bordeaux font-semibold"
              >
                {footerNote}
              </a>
            ) : (
              footerNote
            )}
          </p>
        )}
      </div>
    </section>
  );
};
