"use client";

import { useTina } from "tinacms/dist/react";
import type { DetailseiteQuery } from "@/tina/__generated__/types";
import { FadeInit } from "./fade-in";
import { DetailHero } from "./detail/DetailHero";
import { DetailIntro } from "./detail/DetailIntro";
import { DetailGalerie } from "./detail/DetailGalerie";
import { DetailAblauf } from "./detail/DetailAblauf";
import { DetailCta } from "./detail/DetailCta";

export interface DetailClientPageProps {
  data: {
    detailseite: DetailseiteQuery["detailseite"];
  };
  variables: {
    relativePath: string;
  };
  query: string;
}

/**
 * Gemeinsamer Renderer für alle Detailseiten (Template-Gedanke):
 * der-kunstmaler.json und holz-und-marmor.json teilen sich diese Komponente.
 *
 * Verbindliche Reihenfolge der Sektionen:
 *   Hero → Intro → Galerie → (optional Ablauf) → CTA
 *
 * Header/Footer/Theme kommen aus dem Layout (components/layout/layout.tsx).
 *
 * VISUAL EDITING / CLICK-TO-EDIT (verbindlich):
 * `useTina` macht `data.detailseite` live-editierbar. Jede Sektion bekommt
 * ihren Teilbaum als zusammenhängende `data`-Prop (z. B. <DetailHero data={d?.hero} />),
 * NICHT gespreadet. Nur so bleiben die `_content_source`-Metadaten erhalten,
 * die `tinaField(data, "feld")` in den Sektionen für Click-to-Edit braucht.
 * Ein Spread (`{...obj}`) würde sie verlieren. Daher hier KEIN `?? {}`-Fallback
 * mehr — das defensive Lesen passiert in der Komponente über `data?.feld`.
 *
 * FadeInit ist eingebunden, weil DetailIntro/DetailGalerie/DetailAblauf
 * `.fade-up` nutzen (sonst blieben Elemente unsichtbar). DetailAblauf rendert
 * null, wenn keine Schritte vorhanden sind (z. B. der-kunstmaler.json).
 */
export default function DetailClientPage(props: DetailClientPageProps) {
  const { data } = useTina({ ...props });
  const d = data?.detailseite;

  return (
    <>
      <DetailHero data={d?.hero} />
      <DetailIntro data={d?.intro} />
      <DetailGalerie data={d?.galerie} />
      <DetailAblauf data={d?.ablauf} />
      <DetailCta data={d?.cta} />
      <FadeInit />
    </>
  );
}
