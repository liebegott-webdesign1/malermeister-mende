"use client";
import React, { useState } from "react";
import { tinaField } from "tinacms/dist/react";
import type { HomeQuery } from "@/tina/__generated__/types";
import { useLayout } from "../layout/layout-context";

type KontaktData = NonNullable<HomeQuery["home"]>["kontakt"];

export interface KontaktProps {
  data?: KontaktData;
}

export const Kontakt: React.FC<KontaktProps> = ({ data }) => {
  const { globalSettings } = useLayout();
  const contact = globalSettings?.contact;
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <section id="kontakt" className="py-20 lg:py-24 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* Linke Spalte: Kontaktdaten */}
          <div>
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
                className="mt-5 text-lg text-stone leading-relaxed"
              >
                {data.intro}
              </p>
            )}

            {contact?.phoneRaw && (
              <a
                href={`tel:${contact.phoneRaw}`}
                data-tina-field={contact ? tinaField(contact, "phoneDisplay") : undefined}
                className="inline-flex items-center gap-3 mt-6 text-2xl font-serif font-semibold text-bordeaux hover:text-bordeaux-dark transition"
              >
                <svg
                  className="w-7 h-7"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M2 3.5A1.5 1.5 0 013.5 2h1.148a1.5 1.5 0 011.465 1.175l.716 3.223a1.5 1.5 0 01-1.052 1.767l-.933.267c.41 1.62 1.7 2.91 3.32 3.32l.267-.933a1.5 1.5 0 011.767-1.052l3.223.716A1.5 1.5 0 0118 13.352V14.5a1.5 1.5 0 01-1.5 1.5H15c-7.18 0-13-5.82-13-13V3.5z" />
                </svg>
                {contact.phoneDisplay}
              </a>
            )}
            {contact?.mobile && (
              <p
                data-tina-field={contact ? tinaField(contact, "mobile") : undefined}
                className="mt-2 text-sm text-stone"
              >
                Mobil: {contact.mobile}
              </p>
            )}

            <div className="mt-8 space-y-3 text-stone">
              {(contact?.addressStreet || contact?.addressCity) && (
                <p
                  data-tina-field={contact ? tinaField(contact, "addressStreet") : undefined}
                  className="flex items-start gap-3"
                >
                  <svg
                    className="w-5 h-5 text-bordeaux mt-0.5 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                    />
                  </svg>
                  {contact?.addressStreet}, {contact?.addressCity}
                </p>
              )}
              {contact?.email && (
                <p
                  data-tina-field={contact ? tinaField(contact, "email") : undefined}
                  className="flex items-start gap-3"
                >
                  <svg
                    className="w-5 h-5 text-bordeaux mt-0.5 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                    />
                  </svg>
                  {contact.email}
                </p>
              )}
            </div>
          </div>

          {/* Rechte Spalte: Demo-Formular */}
          <div className="bg-white rounded-2xl p-7 sm:p-9 ring-1 ring-sand shadow-md">
            {!sent ? (
              <form onSubmit={handleSubmit}>
                <div className="space-y-5">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-semibold text-ink mb-1.5"
                    >
                      Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      className="w-full rounded-lg border border-sand bg-cream/40 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-bordeaux/40 focus:border-bordeaux"
                      placeholder="Ihr Name"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="kontakt"
                      className="block text-sm font-semibold text-ink mb-1.5"
                    >
                      Telefon oder E-Mail
                    </label>
                    <input
                      id="kontakt"
                      name="kontakt"
                      type="text"
                      required
                      className="w-full rounded-lg border border-sand bg-cream/40 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-bordeaux/40 focus:border-bordeaux"
                      placeholder="So erreichen wir Sie"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="anliegen"
                      className="block text-sm font-semibold text-ink mb-1.5"
                    >
                      Ihr Anliegen
                    </label>
                    <textarea
                      id="anliegen"
                      name="anliegen"
                      rows={4}
                      required
                      className="w-full rounded-lg border border-sand bg-cream/40 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-bordeaux/40 focus:border-bordeaux"
                      placeholder="Was soll gemacht werden? (z. B. Wohnung streichen, Stuckmarmor, Lasur …)"
                    ></textarea>
                  </div>
                  <label className="flex items-start gap-3 text-sm text-stone">
                    <input
                      type="checkbox"
                      required
                      className="mt-1 w-4 h-4 accent-bordeaux"
                    />
                    <span>
                      Ich habe die{" "}
                      <a href="#" className="text-bordeaux underline">
                        Datenschutzhinweise
                      </a>{" "}
                      gelesen und bin damit einverstanden, dass meine Angaben
                      zur Bearbeitung der Anfrage verwendet werden.
                    </span>
                  </label>
                  <button
                    type="submit"
                    className="w-full bg-bordeaux hover:bg-bordeaux-dark text-bordeaux-foreground font-semibold py-4 rounded-xl transition shadow"
                  >
                    Kostenloses Angebot anfordern
                  </button>
                  <p className="text-xs text-stone text-center">
                    Unverbindlich &amp; kostenlos · Rückruf in der Regel am
                    nächsten Werktag · Ihre Daten nutzen wir ausschließlich zur
                    Bearbeitung Ihrer Anfrage.
                  </p>
                </div>
              </form>
            ) : (
              <div className="text-center py-8">
                <div className="w-14 h-14 rounded-full bg-bordeaux/10 text-bordeaux flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-7 h-7"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 12.75l6 6 9-13.5"
                    />
                  </svg>
                </div>
                <h3 className="font-serif text-2xl font-semibold text-ink">
                  Vielen Dank!
                </h3>
                <p className="mt-2 text-stone">
                  Ihre Anfrage ist eingegangen (Demo). Wir melden uns in der
                  Regel am nächsten Werktag. Sie haben es eilig?{" "}
                  {contact?.phoneRaw ? (
                    <a
                      href={`tel:${contact.phoneRaw}`}
                      className="text-bordeaux font-semibold"
                    >
                      Jetzt anrufen
                    </a>
                  ) : (
                    "Jetzt anrufen"
                  )}
                  .
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
