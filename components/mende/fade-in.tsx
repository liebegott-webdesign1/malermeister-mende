"use client";

import { useEffect } from "react";
import { useEditState } from "tinacms/dist/react";

/**
 * Portiert den Scroll-Reveal aus dem Original (02_Website/index.html):
 * Elemente mit der Klasse `.fade-up` starten per CSS auf opacity:0 und
 * werden hier beim Sichtbarwerden durch Hinzufuegen von `.in` eingeblendet.
 *
 * Ohne dieses Component bleiben alle `.fade-up`-Elemente (Nutzen-Karten,
 * Leistungs-Kacheln) dauerhaft unsichtbar. Mit Fallback für Umgebungen
 * ohne IntersectionObserver bzw. mit reduzierten Bewegungen.
 *
 * Sonderfall TinaCMS-Editor: Die Live-Vorschau läuft in einem scrollenden
 * iframe mit eigenem Viewport. Der IntersectionObserver feuert dort oft nicht
 * zuverlässig (Layout-Timing, kein echtes Scroll-Event), und nach den
 * Live-Re-Renders durch useTina werden neu gemountete .fade-up-Elemente evtl.
 * gar nicht mehr beobachtet -> der Editor sieht leere/unsichtbare Sektionen.
 * Deshalb wird im Bearbeiten-Modus (`edit` aus useEditState) die Animation
 * komplett übersprungen und alles sofort sichtbar geschaltet. Auf der
 * Live-Seite bleibt die normale Scroll-Animation unverändert erhalten.
 */
export function FadeInit() {
  const { edit } = useEditState();

  useEffect(() => {
    const els = Array.from(
      document.querySelectorAll<HTMLElement>(".fade-up")
    );
    if (els.length === 0) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Im Tina-Editor (oder bei reduzierten Bewegungen / fehlendem Observer):
    // sofort alles einblenden, statt auf ein Scroll-Reveal zu warten.
    if (edit || reduceMotion || typeof IntersectionObserver === "undefined") {
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
    // `edit` in den Deps: Wechselt der Nutzer in den Bearbeiten-Modus, läuft
    // der Effekt erneut und blendet sofort alles ein. Das deckt auch die durch
    // useTina neu gemounteten .fade-up-Knoten ab, die sonst ohne `.in` blieben.
  }, [edit]);

  return null;
}
