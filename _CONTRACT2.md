# Bau-Vertrag 2 — Detailseiten-Vorlage (Mende-Unterseiten)

> Verbindliche Schnittstellen-Definition für die wiederverwendbare Detailseiten-
> Vorlage. Der nächste Bau-Schritt erstellt die Sektions-Komponenten (DetailHero,
> DetailIntro, DetailGalerie, DetailAblauf, DetailCta) exakt gegen die hier
> dokumentierten Props/Typen und hängt sie in `DetailClientPage` ein.
>
> Ergänzt `_CONTRACT.md` (Homepage). Alle dortigen harten Regeln gelten weiter:
> echte Umlaute (ä/ö/ü/ß), Theme-Tokens statt Hex, `font-bold/semibold/medium`,
> interne Links als Next.js-Routen (nicht .html), Header/Footer aus dem Layout,
> `.fade-up` nur mit `<FadeInit/>`.

Stand: Fundament fertig. Tina-Build (`npx tinacms build --local --skip-cloud-checks`)
grün, Typen generiert. Collection registriert, Content + Routen + Platzhalter-
`DetailClientPage` vorhanden.

---

## 0. Was das Fundament gebaut hat (Ist-Zustand)

| Bereich | Datei | Zustand |
|---|---|---|
| Schema Collection | `tina/collection/detailseite.ts` | EINE Collection `detailseite`, `format: json`, `path: content/detailseite`. Felder: seo / hero / intro / galerie / ablauf (optional) / cta |
| Registrierung | `tina/config.tsx` | `collections: [Home, Detailseite, Global]` |
| Content Kunstmaler | `content/detailseite/der-kunstmaler.json` | echte Texte/Bildpfade aus `02_Website/der-kunstmaler.html`. `ablauf.steps` leer |
| Content Holz & Marmor | `content/detailseite/holz-und-marmor.json` | echte Texte/Bildpfade aus `02_Website/holz-und-marmor.html`. `ablauf` mit 4 Schritten |
| Bilder | `public/assets/bilder/*.webp` | alle 26 referenzierten Bilder bereits vorhanden (nichts kopiert) |
| Route Kunstmaler | `app/der-kunstmaler/page.tsx` | Server Component, fetch `client.queries.detailseite({ relativePath: "der-kunstmaler.json" })`, rendert `<Layout rawPageData={data}><DetailClientPage {...data}/></Layout>`, plus `generateMetadata` (SEO) |
| Route Holz & Marmor | `app/holz-und-marmor/page.tsx` | analog, `relativePath: "holz-und-marmor.json"` |
| Renderer | `components/mende/detail-client-page.tsx` | **Platzhalter** mit `useTina` — rendert vorerst nur `<div/>` + `<FadeInit/>`. Hier werden die Sektionen eingehängt |
| Generierte Typen | `tina/__generated__/types.ts` + `client.ts` | valide, enthalten `Detailseite*`-Typen + `DetailseiteQuery` |

Interne Links umgestellt (.html → Route):
- `components/mende/Galerie.tsx`: `/der-kunstmaler`, `/holz-und-marmor`
- `components/mende/UeberUns.tsx`: `/der-kunstmaler`
- `content/home/index.json`: Leistungs-Kachel „Holz & Marmor / Stuckmarmor" → `href: "/holz-und-marmor"`

Routen-Mapping: Startseite `/`, Kunstmaler `/der-kunstmaler`, Holz & Marmor `/holz-und-marmor`.

---

## 1. Datenfluss / wie eine Sektion eingehängt wird

`app/<route>/page.tsx` (Server) holt `data` via `client.queries.detailseite({ relativePath })`
und gibt es an `DetailClientPage` (Client) weiter. `DetailClientPage` ruft
`useTina({...props})` auf und hat damit `data.detailseite` als live-editierbares
Objekt vom Typ `DetailseiteQuery["detailseite"]`.

`DetailClientPageProps` ist exportiert in `components/mende/detail-client-page.tsx`:

```ts
export interface DetailClientPageProps {
  data: { detailseite: DetailseiteQuery["detailseite"] };
  variables: { relativePath: string };
  query: string;
}
```

**Einbau (ersetzt den Platzhalter-`<div/>`):**

```tsx
"use client";
import { useTina } from "tinacms/dist/react";
import type { DetailseiteQuery } from "@/tina/__generated__/types";
import { DetailHero } from "./DetailHero";
import { DetailIntro } from "./DetailIntro";
import { DetailGalerie } from "./DetailGalerie";
import { DetailAblauf } from "./DetailAblauf";
import { DetailCta } from "./DetailCta";
import { FadeInit } from "./fade-in";

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
```

Verbindliche Reihenfolge: **Hero → Intro → Galerie → (optional) Ablauf → CTA.**

Kontaktdaten (Telefon für sekundären Hero-CTA, ggf. Sticky-Bar) kommen aus `global`
via `useLayout()` (`globalSettings.contact`), genau wie bei der Homepage. Die CTA-
Links der Detailseiten zeigen über die Content-Felder `primaryCtaHref` / `cta.primaryHref`
auf `/#kontakt` (Kontaktbereich der Startseite) bzw. `#galerie` (Anker auf der Seite selbst).

---

## 2. Komponenten-Konvention (verbindlich)

- Jede Sektion = eigene Datei `components/mende/Detail<Name>.tsx`, **benannter** Export.
- Da der Elternteil `DetailClientPage` bereits `"use client"` ist, sind die
  Sektionen am einfachsten ebenfalls Client-Components (DetailGalerie braucht es
  zwingend wegen Lightbox-State).
- Markup/Styling an den Homepage-Komponenten und den HTML-Vorlagen orientieren
  (gleiche Klassen/Abstände/Rundungen): `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`,
  `py-20 lg:py-24`, `rounded-xl`/`rounded-2xl`, `ring-1 ring-sand`.
- Schriftgewichte: `font-bold` / `font-semibold` / `font-medium`.
- Farben nur über Tokens: `bg-bordeaux`, `text-bordeaux`, `ring-bordeaux`,
  `hover:bg-bordeaux-dark`. Text auf Primärflächen = `text-bordeaux-foreground`
  (NICHT `text-white`). Dunkle CTA-Sektion = `bg-ink text-cream`.
- Alle Felder optional (`Maybe<string>`) → defensiv rendern (Optional Chaining),
  Listen mit `?.map(...)`.
- `.fade-up` darf genutzt werden (Intro-Absätze, Galerie-Items, Ablauf-Schritte) —
  `<FadeInit/>` ist im Renderer bereits eingebunden.

Empfehlung: generierte Typen importieren:
`import type { ... } from "@/tina/__generated__/types"`.

---

## 3. Props pro Sektions-Komponente (feldgenau, abgeleitet aus dem Schema)

Alle Felder optional. Die empfohlenen Props-Typen entsprechen 1:1 den
generierten `Detailseite*`-Typen.

### 3.1 `DetailHero` — `components/mende/DetailHero.tsx`
Quelle: `detailseite.hero` (Typ `DetailseiteHero`). Props = `DetailseiteHero`.
```ts
interface DetailHeroProps {
  badge?: string | null;             // "Mehr als Handwerk" (Kunstmaler); bei H&M leer
  headlineLead?: string | null;      // "Steffen Mende —" / "Holz & Marmor —"
  headlineHighlight?: string | null; // "der Kunstmaler" / "edle Imitationstechniken" -> text-bordeaux
  subline?: string | null;
  image?: string | null;            // /assets/bilder/<name>.webp  (Hero-Bild rechts)
  primaryCtaLabel?: string | null;  // "Gemälde ansehen" / "Kostenloses Angebot anfordern"
  primaryCtaHref?: string | null;   // "#galerie" / "/#kontakt"
  backLabel?: string | null;        // Breadcrumb: aktueller Seitenname ("Der Kunstmaler")
}
```
Layout aus den HTML-Vorlagen: `section.relative` mit `grid lg:grid-cols-2`, Text links
(`order-2 lg:order-1`, `lg:pl-[max(2rem,calc((100vw-80rem)/2+2rem))]`), Bild rechts
(`order-1 lg:order-2 min-h-[280px] lg:min-h-[560px]`, `object-cover`).
- Breadcrumb oben: `<a href="/">Start</a> › <span>{backLabel}</span>` (`text-sm text-stone`).
- Badge (nur falls vorhanden): `inline-flex … text-bordeaux … <span class="h-px w-8 bg-bordeaux"/> {badge}`.
- Primär-CTA: `<a href={primaryCtaHref}>` mit `bg-bordeaux hover:bg-bordeaux-dark text-bordeaux-foreground`.
- Sekundär-CTA (fest): Telefon-Button aus `useLayout().globalSettings.contact`
  (phoneRaw/phoneDisplay), Stil `border-2 border-bordeaux/30 hover:border-bordeaux`.

### 3.2 `DetailIntro` — `components/mende/DetailIntro.tsx`
Quelle: `detailseite.intro` (Typ `DetailseiteIntro`). Props = `DetailseiteIntro`.
```ts
interface DetailIntroProps {
  eyebrow?: string | null;   // "Über den Künstler" / "Die Technik"
  heading?: string | null;
  paragraphs?: Array<{ text?: string | null } | null> | null;
}
```
`section py-20 lg:py-24`, `max-w-7xl … grid lg:grid-cols-3 gap-12 items-start`.
Linke Spalte (`lg:col-span-2`): Eyebrow (`text-bordeaux font-semibold uppercase
tracking-[0.18em] text-sm`), Heading (`font-serif text-3xl lg:text-4xl font-bold`),
dann `paragraphs?.map` als `text-lg text-stone leading-relaxed` (erster `mt-5`, weitere `mt-4`).
Die rechte Info-Karte der HTML-Vorlagen (Motiv-/Eignungs-Liste) ist NICHT Teil des
Schemas — sie kann bei Bedarf später als eigenes Listenfeld ergänzt werden; im aktuellen
Vertrag rendert DetailIntro nur Eyebrow/Heading/Absätze.

### 3.3 `DetailGalerie` — `components/mende/DetailGalerie.tsx`  (Client, Lightbox)
Quelle: `detailseite.galerie` (Typ `DetailseiteGalerie`). Props = `DetailseiteGalerie`.
```ts
interface DetailGalerieProps {
  eyebrow?: string | null;   // "Galerie"
  heading?: string | null;
  intro?: string | null;
  items?: Array<{ image?: string | null; alt?: string | null } | null> | null;
}
```
`section py-20 lg:py-24 bg-sand/50` (+ `id="galerie" scroll-mt-24`, da der Hero-CTA
darauf verlinkt). KEINE Filter (anders als die Homepage-Galerie) — flache Bildliste.
Layout: Masonry `columns-2 md:columns-3 lg:columns-4 gap-4 [&>*]:mb-4`, Items als
`figure.gal-item break-inside-avoid rounded-xl overflow-hidden ring-1 ring-sand
cursor-zoom-in` mit `<img loading="lazy" className="w-full"/>`. Klick → Lightbox
(`bg-black/85`), schließbar via X / Backdrop / Escape; `useState` + `lb-active` am Body
(identisch zur Homepage-`Galerie.tsx`).

### 3.4 `DetailAblauf` — `components/mende/DetailAblauf.tsx`  (optional)
Quelle: `detailseite.ablauf` (Typ `DetailseiteAblauf`). Props = `DetailseiteAblauf`.
```ts
interface DetailAblaufProps {
  eyebrow?: string | null;   // "So läuft es ab"
  heading?: string | null;
  steps?: Array<{ number?: string | null; title?: string | null; text?: string | null } | null> | null;
}
```
**Bedingtes Rendern:** Wenn `!steps || steps.length === 0` → `return null` (Kunstmaler
hat keinen Ablauf, Holz & Marmor schon). `section py-20 lg:py-24`,
`grid md:grid-cols-4 gap-8`. Große Nummer `font-serif text-5xl font-bold text-bordeaux/20`,
Titel `font-serif text-xl font-semibold text-ink mt-2`, Text `mt-2 text-stone`.

### 3.5 `DetailCta` — `components/mende/DetailCta.tsx`
Quelle: `detailseite.cta` (Typ `DetailseiteCta`). Props = `DetailseiteCta`.
```ts
interface DetailCtaProps {
  heading?: string | null;
  text?: string | null;
  primaryLabel?: string | null;   // "Kontakt aufnehmen" / "Kostenloses Angebot anfordern"
  primaryHref?: string | null;    // "/#kontakt"
}
```
Dunkle Sektion `py-16 lg:py-20 bg-ink text-cream`, zentriert `max-w-4xl … text-center`.
Heading `font-serif text-3xl lg:text-4xl font-bold text-white`, Text `text-cream/75`.
Buttons: Primär `<a href={primaryHref}>` `bg-bordeaux hover:bg-bordeaux-light
text-bordeaux-foreground`; Sekundär fest = Telefon-Button aus `useLayout()` mit
`border-2 border-white/25 hover:border-white text-white`.

---

## 4. Optional-Block-Regel (Template-Gedanke)

`DetailAblauf` ist die einzige bedingt sichtbare Sektion. Steuergröße =
`detailseite.ablauf.steps`:
- Holz & Marmor: 4 Schritte → Sektion sichtbar.
- Der Kunstmaler: `steps: []` → Sektion rendert `null`.

So teilen sich beide Dokumente denselben Komponenten-Satz; der Unterschied liegt
ausschließlich im Content. Neue Detailseiten = neues JSON unter `content/detailseite/`
+ neue Route nach demselben Muster (`app/<slug>/page.tsx`).

---

## 5. Tokens, Reveal, Bilder (Verweis)

Tokens/Utilities, `.fade-up`/`FadeInit`, `.gal-item`-Hover-Zoom, `.lb-active` und die
Bildkonventionen sind identisch zu `_CONTRACT.md` Abschnitt 6/7. Alle Bildpfade
liegen unter `public/assets/bilder/*.webp` und werden im Content als `/assets/bilder/<name>.webp`
referenziert.

---

## 6. Harte Regeln

1. Fundament-Dateien aus Abschnitt 0 nicht überschreiben, AUSSER
   `components/mende/detail-client-page.tsx` (Platzhalter → echte Sektionsliste).
2. Neue Sektionen nur als `components/mende/Detail<Name>.tsx`.
3. Theme-Tokens statt Hex; Text auf Primärflächen = `text-bordeaux-foreground`.
4. `font-bold/semibold/medium`; echte Umlaute überall.
5. Interne Links als Routen (`/`, `/der-kunstmaler`, `/holz-und-marmor`), nie `.html`.
6. Felder optional behandeln, Listen mit `?.map`; `DetailAblauf` rendert `null` ohne Schritte.
7. `<FadeInit/>` bleibt im Renderer (bereits vorhanden), wenn `.fade-up` genutzt wird.
8. Build grün halten: nach Einbau `npx tinacms build --local --skip-cloud-checks`
   und `npx tsc --noEmit` prüfen.
```
