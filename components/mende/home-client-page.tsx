"use client";

import { useTina } from "tinacms/dist/react";
import { HomeQuery } from "@/tina/__generated__/types";
import { Hero } from "./Hero";
import { TrustBar } from "./TrustBar";
import { Nutzen } from "./Nutzen";
import { Leistungen } from "./Leistungen";
import { Galerie } from "./Galerie";
import { Einwand } from "./Einwand";
import { Ablauf } from "./Ablauf";
import { Bewertungen } from "./Bewertungen";
import { UeberUns } from "./UeberUns";
import { Faq } from "./Faq";
import { Kontakt } from "./Kontakt";
import { FadeInit } from "./fade-in";

export interface HomeClientPageProps {
  data: {
    home: HomeQuery["home"];
  };
  variables: {
    relativePath: string;
  };
  query: string;
}

/**
 * Home-Renderer (Phase 2): rendert alle Sektions-Komponenten in der
 * verbindlichen Reihenfolge aus dem Original (02_Website/index.html):
 *
 *   Hero → TrustBar → Nutzen → Leistungen → Galerie → Einwand →
 *   Ablauf → Bewertungen → UeberUns → FAQ → Kontakt
 *
 * Header/Footer kommen aus dem Layout (components/layout/*).
 *
 * Alle Sektions-Felder im Schema sind optional (Maybe<...>); die Slices
 * werden defensiv via `?? {}` bzw. `?? []` gespreadet, damit der Build
 * auch bei fehlenden Sektionen typsicher und ohne Laufzeitfehler bleibt.
 * Die einzelnen Komponenten behandeln ihre Felder intern ebenfalls defensiv.
 */
export default function HomeClientPage(props: HomeClientPageProps) {
  const { data } = useTina({ ...props });
  const h = data?.home;

  return (
    <>
      <Hero {...(h?.hero ?? {})} />
      <TrustBar items={h?.trustBar ?? []} />
      <Nutzen {...(h?.nutzen ?? {})} />
      <Leistungen {...(h?.leistungen ?? {})} />
      <Galerie {...(h?.galerie ?? {})} />
      <Einwand {...(h?.einwand ?? {})} />
      <Ablauf {...(h?.ablauf ?? {})} />
      <Bewertungen {...(h?.bewertungen ?? {})} />
      <UeberUns {...(h?.ueberUns ?? {})} />
      <Faq {...(h?.faq ?? {})} />
      <Kontakt {...(h?.kontakt ?? {})} />
      <FadeInit />
    </>
  );
}
