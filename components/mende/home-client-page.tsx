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
 * VISUAL EDITING / CLICK-TO-EDIT (verbindlich):
 * Jede Sektion bekommt ihr Daten-Objekt als zusammenhängende `data`-Prop
 * übergeben (z. B. <Hero data={h?.hero} />), NICHT gespreadet. Nur so bleiben
 * die nicht-enumerierbaren `_content_source`-Metadaten erhalten, die useTina an
 * `data` hängt — und nur damit findet `tinaField(data, "feld")` in den
 * Sektionen den richtigen Pfad zur Sidebar. Ein Spread (`{...obj}`) würde diese
 * Metadaten verlieren und Click-to-Edit tot machen.
 *
 * Alle Sektions-Felder im Schema sind optional (Maybe<...>); die Komponenten
 * müssen `data === undefined` defensiv verkraften (siehe Contract). Daher hier
 * KEIN `?? {}`-Fallback mehr — das defensive Lesen passiert in der Komponente
 * über `data?.feld`.
 *
 * Sonderfall TrustBar: `trustBar` ist im Schema selbst eine Liste (kein Objekt
 * mit items-Feld). Die Komponente erhält die Liste daher direkt als `data` und
 * setzt tinaField pro Item via `tinaField(item)`.
 */
export default function HomeClientPage(props: HomeClientPageProps) {
  const { data } = useTina({ ...props });
  const h = data?.home;

  return (
    <>
      <Hero data={h?.hero} />
      <TrustBar data={h?.trustBar} />
      <Nutzen data={h?.nutzen} />
      <Leistungen data={h?.leistungen} />
      <Galerie data={h?.galerie} />
      <Einwand data={h?.einwand} />
      <Ablauf data={h?.ablauf} />
      <Bewertungen data={h?.bewertungen} />
      <UeberUns data={h?.ueberUns} />
      <Faq data={h?.faq} />
      <Kontakt data={h?.kontakt} />
      <FadeInit />
    </>
  );
}
