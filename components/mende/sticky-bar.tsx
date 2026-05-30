"use client";

import React from "react";
import { useLayout } from "../layout/layout-context";

/**
 * Mobile Sticky-Bottom-Bar (Malermeister Mende).
 *
 * Markup originalgetreu aus 02_Website/index.html (Abschnitt
 * "MOBILE STICKY BOTTOM BAR"): fixierte Leiste am unteren Rand, nur mobil
 * sichtbar (lg:hidden), zwei gleich breite Buttons — links "Anrufen"
 * (tel:-Link aus useLayout()), rechts "Angebot anfordern" (bordeaux, → /#kontakt).
 *
 * Wird einmal im Layout (components/layout/layout.tsx) eingebunden und gilt
 * damit für alle Seiten. Telefonnummer kommt aus den globalen Kontaktdaten.
 */
export const StickyBar: React.FC = () => {
  const { globalSettings } = useLayout();
  const contact = globalSettings?.contact;
  const phoneRaw = contact?.phoneRaw ?? "";
  const ctaLabel = globalSettings?.ctaLabel ?? "Angebot anfordern";
  const ctaHref = globalSettings?.ctaHref ?? "/#kontakt";

  return (
    <div className="lg:hidden fixed bottom-0 inset-x-0 z-30 grid grid-cols-2 gap-px bg-sand border-t border-sand shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
      <a
        href={`tel:${phoneRaw}`}
        className="flex items-center justify-center gap-2 bg-white text-ink font-semibold py-3.5"
      >
        <svg
          className="w-5 h-5 text-bordeaux"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M2 3.5A1.5 1.5 0 013.5 2h1.148a1.5 1.5 0 011.465 1.175l.716 3.223a1.5 1.5 0 01-1.052 1.767l-.933.267c.41 1.62 1.7 2.91 3.32 3.32l.267-.933a1.5 1.5 0 011.767-1.052l3.223.716A1.5 1.5 0 0118 13.352V14.5a1.5 1.5 0 01-1.5 1.5H15c-7.18 0-13-5.82-13-13V3.5z" />
        </svg>
        Anrufen
      </a>
      <a
        href={ctaHref}
        className="flex items-center justify-center gap-2 bg-bordeaux text-bordeaux-foreground font-semibold py-3.5"
      >
        {ctaLabel}
      </a>
    </div>
  );
};
