"use client";

import { useEffect } from "react";

/**
 * Portiert den Scroll-Reveal aus dem Original (02_Website/index.html):
 * Elemente mit der Klasse `.fade-up` starten per CSS auf opacity:0 und
 * werden hier beim Sichtbarwerden durch Hinzufuegen von `.in` eingeblendet.
 *
 * Ohne dieses Component bleiben alle `.fade-up`-Elemente (Nutzen-Karten,
 * Leistungs-Kacheln) dauerhaft unsichtbar. Mit Fallback für Umgebungen
 * ohne IntersectionObserver bzw. mit reduzierten Bewegungen.
 */
export function FadeInit() {
  useEffect(() => {
    const els = Array.from(
      document.querySelectorAll<HTMLElement>(".fade-up")
    );
    if (els.length === 0) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduceMotion || typeof IntersectionObserver === "undefined") {
      els.forEach((el) => el.classList.add("in"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.05 }
    );

    els.forEach((el) => io.observe(el));

    // Sicherheitsnetz: falls der Observer (z. B. wegen Layout-Timing) etwas
    // verpasst, nach kurzer Zeit alles einblenden, damit nie Inhalt fehlt.
    const safety = window.setTimeout(() => {
      els.forEach((el) => el.classList.add("in"));
    }, 1500);

    return () => {
      io.disconnect();
      window.clearTimeout(safety);
    };
  }, []);

  return null;
}
