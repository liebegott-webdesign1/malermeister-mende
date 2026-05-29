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
 * `useTina` macht `data.detailseite` live-editierbar; alle Felder sind im
 * Schema optional (Maybe<...>) und werden in den Sektionen defensiv behandelt.
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
      <DetailHero {...(d?.hero ?? {})} />
      <DetailIntro {...(d?.intro ?? {})} />
      <DetailGalerie {...(d?.galerie ?? {})} />
      <DetailAblauf {...(d?.ablauf ?? {})} />
      <DetailCta {...(d?.cta ?? {})} />
      <FadeInit />
    </>
  );
}
