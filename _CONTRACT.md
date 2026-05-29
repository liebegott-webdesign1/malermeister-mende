# Bau-Vertrag — Malermeister Mende (Phase 1 Foundation → Phase 2 Sektionen)

> Verbindliche Schnittstellen-Definition. Phase 2 baut die Sektions-Komponenten
> exakt gegen die hier dokumentierten Props/Typen/Tokens. Foundation steht und
> baut fehlerfrei (`next build` gruen, siehe Abschnitt 8).

Stand: Foundation fertig. Next.js 15.3.8 (App Router) + TinaCMS 3.8 + Tailwind v4.
Alle Texte Deutsch mit echten Umlauten. `html lang="de"`.

---

## 0. Was Phase 1 gebaut hat (Ist-Zustand)

| Bereich | Datei | Zustand |
|---|---|---|
| Fonts | `app/layout.tsx` | Cormorant Garamond (`--font-serif`, weights 500/600/700) + Source Sans 3 (`--font-sans`, 400/500/600/700) via `next/font/google`. `<html lang="de">`, `<body class="bg-cream text-ink font-sans">` |
| Design-Tokens | `styles.css` | `:root` CSS-Variablen + `@theme inline`-Mapping (siehe Abschnitt 6) + Original-Helfer-CSS (`.nav-link`, `.gal-item`, `.fade-up`, `details`-Akkordeon, `.dropdown`, `.lb-active`) |
| Schema global | `tina/collection/global.ts` | brand/contact/nav/ctaLabel/theme |
| Schema home | `tina/collection/home.ts` | alle Sektionen als verschachtelte objects |
| Registrierung | `tina/config.tsx` | `collections: [Home, Global]` |
| Content global | `content/global/index.json` | Mende-Kontaktdaten + Nav |
| Content home | `content/home/index.json` | ALLE echten Mende-Texte + Bildpfade |
| Bilder | `public/assets/bilder/*.webp` + `public/assets/iStock-2169196050.webp` | aufloesbar unter `/assets/...` |
| Generierte Typen | `tina/__generated__/types.ts` + `client.ts` | valide (Build lief) |
| Layout | `components/layout/layout.tsx` | laedt global, setzt `--bordeaux` inline auf Wrapper, rendert Header/main/Footer |
| Header | `components/layout/nav/header.tsx` | Mende-Header (Client Component, Mobile-Menue, Scroll-Shadow) |
| Footer | `components/layout/nav/footer.tsx` | Mende-Footer (4 Spalten + Copyright) |
| Layout-Context | `components/layout/layout-context.tsx` | `useLayout()` liefert `globalSettings` + `theme` |
| Home-Page | `app/page.tsx` | fetch `client.queries.home({ relativePath: "index.json" })`, rendert `<Layout><HomeClientPage/></Layout>` |
| ClientPage | `components/mende/home-client-page.tsx` | **Platzhalter** mit `useTina` — hier werden in Phase 2 die Sektionen eingehaengt |

**Deaktivierter Demo-Code** (NICHT mehr verwenden, liegt in `_disabled-demo-routes/`):
`blocks/`, `mdx-components.tsx`, `posts/`, `urlSegments/`, `tina-collection/` (page/post/author/tag).
`tsconfig.json` schliesst `_disabled-demo-routes` aus. In neuen Dateien NIEMALS auf
`post`/`author`/`tag`/`page`-Collections oder `components/blocks/*` verweisen.

---

## 1. Datenfluss / wie eine Sektion eingehaengt wird

`app/page.tsx` (Server) holt `data` und gibt es an `HomeClientPage` (Client) weiter.
`HomeClientPage` ruft `useTina({...props})` auf und hat damit `data.home` als
live-editierbares Objekt vom Typ `HomeQuery["home"]`.

**Phase 2: In `components/mende/home-client-page.tsx`** wird der Platzhalter-`<div>`
ersetzt durch die Sektionsliste, z. B.:

```tsx
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

export default function HomeClientPage(props: HomeClientPageProps) {
  const { data } = useTina({ ...props });
  const h = data.home;
  return (
    <>
      <Hero {...h.hero} />
      <TrustBar items={h.trustBar} />
      <Nutzen {...h.nutzen} />
      <Leistungen {...h.leistungen} />
      <Galerie {...h.galerie} />
      <Einwand {...h.einwand} />
      <Ablauf {...h.ablauf} />
      <Bewertungen {...h.bewertungen} />
      <UeberUns {...h.ueberUns} />
      <Faq {...h.faq} />
      <Kontakt {...h.kontakt} />
    </>
  );
}
```

Kontaktdaten (Telefon, Adresse, E-Mail) fuer Hero-/Kontakt-CTAs kommen aus
`global` — entweder via `useLayout()` (`globalSettings.contact`) ODER als zusaetzliche
Props durchgereicht. Empfehlung: `useLayout()` in den Komponenten, die Kontakt brauchen
(Hero-Telefon-Button, Kontakt-Sektion, Sticky-Bar).

`HomeClientPageProps` ist bereits exportiert in
`components/mende/home-client-page.tsx`:

```ts
export interface HomeClientPageProps {
  data: { home: HomeQuery["home"] };
  variables: { relativePath: string };
  query: string;
}
```

---

## 2. Komponenten-Konvention (verbindlich)

- Jede Sektion = eigene Datei `components/mende/<Name>.tsx`, **benannter** Export.
- Interaktive Sektionen (Galerie-Filter+Lightbox, FAQ-Accordion via `<details>`,
  Formular-Demo in Kontakt) = `"use client"`.
- Reine Render-Sektionen koennen Server- oder Client-Components sein (da der Elternteil
  `HomeClientPage` bereits Client ist, ist Client am einfachsten und unproblematisch).
- `tinaField`/`data-tina-field` ist OPTIONAL (nicht zwingend).
- Markup/Styling EXAKT aus `02_Website/index.html` uebernehmen, nur Farb-/Font-Klassen
  auf Tokens mappen (Abschnitt 6) und Inhalte aus Props speisen.
- **Schriftgewichte uebersetzen:** `font-700`→`font-bold`, `font-600`→`font-semibold`,
  `font-500`→`font-medium`.
- Alle Felder sind im Schema optional (`Maybe<string>`), daher in JSX defensiv rendern
  (Optional Chaining / Fallbacks), und Listen mit `?.map(...)`.

Props-Interfaces dürfen entweder die generierten Typen aus
`@/tina/__generated__/types` importieren ODER eigene Interfaces sein, die feldgenau
passen. Empfehlung: generierte Typen verwenden (siehe Abschnitt 3, jeweils der `Home*`-Typ).

---

## 3. Props pro Sektions-Komponente (feldgenau, abgeleitet aus dem finalen Schema)

Alle Felder optional (`?: string | null` bzw. Listen `Array<... | null> | null`).
Importpfad: `import type { ... } from "@/tina/__generated__/types"`.

### 3.1 `Hero` — `components/mende/Hero.tsx`
Quelle: `home.hero` (Typ `HomeHero`). Empfohlene Props = `HomeHero`.
```ts
interface HeroProps {
  badge?: string | null;            // "Meisterbetrieb seit Jahrzehnten"
  headlineLead?: string | null;     // "Malermeister in"
  headlineHighlight?: string | null;// "Halle (Saale)"  -> text-bordeaux, nbsp im Markup
  subline?: string | null;
  primaryCtaLabel?: string | null;  // "Kostenloses Angebot anfordern" -> href="#kontakt"
  trustNote?: string | null;
  image?: string | null;            // "/assets/bilder/IMG_7713_Kopie.webp"
}
```
Telefon-Sekundaer-CTA: aus `useLayout().globalSettings.contact` (phoneRaw/phoneDisplay).
Layout: zweispaltiges grid, Bild rechts mit `object-cover` + Gradient-Overlay.

### 3.2 `TrustBar` — `components/mende/TrustBar.tsx`
Quelle: `home.trustBar` (Liste `HomeTrustBar[]`).
```ts
interface TrustBarProps {
  items?: Array<{ title?: string | null; subtitle?: string | null } | null> | null;
}
```
`bg-bordeaux text-white`, 4-spaltiges grid mit `divide-x divide-white/15`.

### 3.3 `Nutzen` — `components/mende/Nutzen.tsx`
Quelle: `home.nutzen` (Typ `HomeNutzen`). Props = `HomeNutzen`.
```ts
interface NutzenProps {
  eyebrow?: string | null;
  heading?: string | null;
  intro?: string | null;
  cards?: Array<{ title?: string | null; text?: string | null } | null> | null;
}
```
3 Karten `bg-white rounded-2xl p-7 ring-1 ring-sand shadow-sm fade-up`. Die SVG-Icons
im Original sind fix im Markup (3 verschiedene) — pro Karten-Index ein festes Icon
beibehalten (Daten liefern keine Icons).

### 3.4 `Leistungen` — `components/mende/Leistungen.tsx`
Quelle: `home.leistungen` (Typ `HomeLeistungen`). Props = `HomeLeistungen`.
```ts
interface LeistungenProps {
  eyebrow?: string | null;
  heading?: string | null;
  intro?: string | null;
  items?: Array<{
    image?: string | null; title?: string | null;
    text?: string | null; href?: string | null;
  } | null> | null;
}
```
Section-`id="leistungen"`, `bg-sand/50 scroll-mt-24`. Karten als `<a href={item.href}>`.

### 3.5 `Galerie` — `components/mende/Galerie.tsx`  (Client, Filter + Lightbox)
Quelle: `home.galerie` (Typ `HomeGalerie`). Props = `HomeGalerie`.
```ts
interface GalerieProps {
  eyebrow?: string | null;
  heading?: string | null;
  intro?: string | null;
  filters?: Array<{ key?: string | null; label?: string | null } | null> | null;
  items?: Array<{ image?: string | null; alt?: string | null; category?: string | null } | null> | null;
}
```
Section-`id="galerie" scroll-mt-24`. Filter-Buttons: aktiver = `bg-bordeaux text-white`,
inaktiv = `bg-white text-ink border-bordeaux/20`. Filtern: `category === activeKey || activeKey === "all"`.
Masonry: `columns-2 md:columns-3 lg:columns-4`. Klick auf Bild → Lightbox-Overlay
(`bg-black/85`), schliessbar via X / Backdrop / Escape. State per `useState`.

### 3.6 `Einwand` — `components/mende/Einwand.tsx`
Quelle: `home.einwand` (Typ `HomeEinwand`). Props = `HomeEinwand`.
```ts
interface EinwandProps {
  eyebrow?: string | null;
  heading?: string | null;
  items?: Array<{ question?: string | null; answer?: string | null } | null> | null;
  ctaLabel?: string | null;        // -> href="#kontakt"
}
```
Dunkle Sektion `bg-ink text-cream`. Eyebrow in `text-bordeaux-light`. 3-spaltig.

### 3.7 `Ablauf` — `components/mende/Ablauf.tsx`
Quelle: `home.ablauf` (Typ `HomeAblauf`). Props = `HomeAblauf`.
```ts
interface AblaufProps {
  eyebrow?: string | null;
  heading?: string | null;
  steps?: Array<{ number?: string | null; title?: string | null; text?: string | null } | null> | null;
}
```
4-spaltig. Grosse Nummer `font-serif text-5xl font-bold text-bordeaux/20`.

### 3.8 `Bewertungen` — `components/mende/Bewertungen.tsx`
Quelle: `home.bewertungen` (Typ `HomeBewertungen`). Props = `HomeBewertungen`.
```ts
interface BewertungenProps {
  eyebrow?: string | null;
  heading?: string | null;
  placeholderNote?: string | null; // Amber-Hinweis-Box beibehalten
  items?: Array<{ quote?: string | null; author?: string | null } | null> | null;
}
```
`bg-sand/50`. 5-Sterne (`★★★★★ text-amber-400`) FIX im Markup. Jede Karte hat
"Beispiel"-Badge `text-amber-600` (Platzhalter-Charakter beibehalten).

### 3.9 `UeberUns` — `components/mende/UeberUns.tsx`
Quelle: `home.ueberUns` (Typ `HomeUeberUns`). Props = `HomeUeberUns`.
```ts
interface UeberUnsProps {
  eyebrow?: string | null;
  heading?: string | null;
  paragraphs?: Array<{ text?: string | null } | null> | null;
  image?: string | null;           // "/assets/iStock-2169196050.webp"
  imageNote?: string | null;       // "Foto folgt" -> Badge unten links
  ctaLabel?: string | null;        // "Mehr ueber den Kunstmaler →"
}
```
Section-`id="ueber-uns" scroll-mt-24`. Zweispaltig, Bild `aspect-[4/3] object-cover`.

### 3.10 `Faq` — `components/mende/Faq.tsx`  (Client/`<details>`)
Quelle: `home.faq` (Typ `HomeFaq`). Props = `HomeFaq`.
```ts
interface FaqProps {
  eyebrow?: string | null;
  heading?: string | null;
  items?: Array<{ question?: string | null; answer?: string | null } | null> | null;
  footerNote?: string | null;      // "Ihre Frage ist nicht dabei? Rufen Sie einfach an →"
}
```
`bg-sand/50`, `max-w-3xl`. Akkordeon mit `<details><summary>` + `.faq-icon`
(Plus-SVG, rotiert via CSS-Regel `details[open] .faq-icon`). footerNote-Link → `tel:`
aus `useLayout().globalSettings.contact.phoneRaw`.

### 3.11 `Kontakt` — `components/mende/Kontakt.tsx`  (Client, Formular-Demo)
Quelle: `home.kontakt` (Typ `HomeKontakt`) + Kontaktdaten aus `global`.
```ts
interface KontaktProps {
  eyebrow?: string | null;
  heading?: string | null;
  intro?: string | null;
}
```
Section-`id="kontakt" scroll-mt-24`. Linke Spalte: Telefon (gross, `font-serif`),
Mobil, Adresse, E-Mail — alles aus `useLayout().globalSettings.contact`.
Rechte Spalte: Demo-Formular (Name / Telefon-oder-E-Mail / Anliegen / Datenschutz-Checkbox /
Submit). Submit per `onSubmit={e => { e.preventDefault(); setSent(true); }}` —
Erfolgs-State zeigt "Vielen Dank!"-Block (Demo, kein echter Versand).

### 3.12 Optional: `StickyBar` — `components/mende/StickyBar.tsx` (Client)
Mobile Sticky-Bottom-Bar (`lg:hidden fixed bottom-0`): "Anrufen" (`tel:`) + "Angebot anfordern"
(`#kontakt`). Daten aus `useLayout().globalSettings`. Falls gebaut, in `HomeClientPage`
oder im Layout ausserhalb `<main>` einhaengen.

---

## 4. Global-Daten (Header/Footer/Kontakt) — bereits via `useLayout()` verfuegbar

`import { useLayout } from "@/components/layout/layout-context";`
`const { globalSettings, theme } = useLayout();`

```ts
// globalSettings: GlobalQuery["global"]
globalSettings.brand:   { name?, location? }                 // GlobalBrand
globalSettings.contact: {                                    // GlobalContact
  phoneDisplay?, phoneRaw?, mobile?, email?, addressStreet?, addressCity?
}
globalSettings.nav:     Array<{ label?, href? } | null>      // GlobalNav[]
globalSettings.ctaLabel?: string
globalSettings.theme:   { color? }                           // GlobalTheme (Hex, Default #800000)
```
Content-Werte (siehe `content/global/index.json`):
phoneDisplay `"0345 120 78 57"`, phoneRaw `"03451207857"`, mobile `"0170 735 82 00"`,
email `"steffen_mende@t-online.de"`, addressStreet `"Lutherstraße 66"`,
addressCity `"06110 Halle (Saale)"`, ctaLabel `"Angebot anfordern"`.
Nav: Leistungen→`#leistungen`, Referenzen→`#galerie`, Über uns→`#ueber-uns`, Kontakt→`#kontakt`.

Header (`pt`-frei, da `sticky`) und Footer sind bereits final gebaut — Phase 2 muss sie
NICHT mehr anfassen. Falls die Desktop-Nav den Original-Dropdown "Leistungen & Techniken"
braucht: aktuell bewusst weggelassen (Nav kommt rein aus `global.nav`); bei Bedarf in Phase 2
als statisches Markup im Header ergaenzbar — aber nicht Teil dieses Vertrags.

---

## 5. Theme-Regler (Kunde)

`global.theme.color` (Hex, Default `#800000`) wird in `components/layout/layout.tsx`
als inline `style={{ ['--bordeaux']: bordeaux }}` auf den Layout-Wrapper gesetzt.
Dadurch faerben ALLE `bordeaux`-Utilities (siehe Abschnitt 6) zur Laufzeit um.
**Konsequenz fuer Phase 2:** Immer die Token-Utilities (`bg-bordeaux`, `text-bordeaux`,
`hover:bg-bordeaux-dark`, …) verwenden — NIE Hex-Werte hardcoden. Das Original-JS, das
Filter-Buttons mit Inline-`#800000` faerbte, in React durch `bg-bordeaux`/`text-white`
ersetzen, damit der Theme-Regler greift.

---

## 6. Design-Tokens & Tailwind-Utilities (verfuegbar)

In `styles.css` definiert (`:root` + `@theme inline`). Nutzbare Utilities:

| Token | CSS-Var | Hex (Default) | Utilities |
|---|---|---|---|
| bordeaux | `--bordeaux` | #800000 | `bg-bordeaux` `text-bordeaux` `border-bordeaux` `ring-bordeaux` `fill-bordeaux` `accent-bordeaux` (+ `/20`,`/30`,`/70` Opacity) |
| bordeaux-dark | `--bordeaux-dark` | #5e0000 | `bg-bordeaux-dark` `hover:bg-bordeaux-dark` `text-bordeaux-dark` |
| bordeaux-light | `--bordeaux-light` | #9a2424 | `bg-bordeaux-light` `text-bordeaux-light` `hover:bg-bordeaux-light` |
| cream | `--cream` | #faf7f2 | `bg-cream` `text-cream` (+ `/40`,`/70`,`/75`) |
| sand | `--sand` | #f1ece4 | `bg-sand` `ring-sand` `border-sand` (+ `/50`,`/70`) |
| ink | `--ink` | #2a2522 | `bg-ink` `text-ink` (+ `/90`) |
| stone | `--stone` | #6b6259 | `text-stone` |

Fonts: `font-serif` (Cormorant Garamond), `font-sans` (Source Sans 3, Body-Default).
Body ist bereits `bg-cream text-ink font-sans`.

**Original-Helfer-CSS** (in `styles.css`, einfach Klassen verwenden):
- `.nav-link` — animierter Bordeaux-Unterstrich on hover (Header nutzt es schon)
- `.gal-item` / `.gal-item img` — Hover-Zoom (Galerie)
- `.fade-up` / `.fade-up.in` — Scroll-Einblendung (IntersectionObserver in Phase 2 setzen,
  der `.in` hinzufuegt; oder weglassen — dann sind Elemente sofort sichtbar nur wenn `.in`
  gesetzt wird, daher: entweder IO implementieren ODER `.fade-up` weglassen)
- `details > summary` / `details[open] .faq-icon` — FAQ-Akkordeon
- `.dropdown` / `.dropdown-menu` — optionales Desktop-Dropdown
- `.lb-active` — `overflow:hidden` am Body fuer Lightbox

> Hinweis `.fade-up`: Standardmaessig `opacity:0`. In Phase 2 entweder einen kleinen
> `useEffect`-IntersectionObserver bauen, der `.in` setzt (wie im Original), ODER die
> Klasse weglassen. Nicht setzen ohne IO → Inhalt bliebe unsichtbar.

---

## 7. Bild-Referenzen (alle vorhanden unter `public/assets/`)

Hero: `/assets/bilder/IMG_7713_Kopie.webp`
Leistungen: `Filzen_1`, `Tapezierarbeiten_4`, `Lackierarbeiten`, `IMG_3124`,
`Saeule_Stucco`, `Lasur_Marmorlook` (jeweils `.webp` unter `/assets/bilder/`)
Galerie: 32 Bilder, Kategorien `holz|stuck|lasur|spritz|tapete|dekor|kunst`
(vollstaendig in `content/home/index.json` → `galerie.items`).
Ueber uns: `/assets/iStock-2169196050.webp`.

`next/image` ist konfiguriert (remotePatterns fuer tina.io/cloudinary), lokale `/assets/...`
funktionieren mit `next/image` ODER normalem `<img>`. Original nutzt `<img>` mit
`object-cover` — fuer 1:1-Treue `<img>` ok; `next/image` mit `fill`+`sizes` ist optionale Optimierung.

---

## 8. Build-Status & Verifikation

- `npx tinacms build --local --skip-cloud-checks` → **OK**, generiert
  `tina/__generated__/{client.ts,types.ts}`, Schema valide.
- `npx tsc --noEmit` → **0 Fehler** (aktives Projekt, `_disabled-demo-routes` exkludiert).
- `next build` (mit `NODE_ENV=production` + laufendem Tina-Datalayer auf Port 4001) →
  **OK**: Route `/` und `/_not-found` statisch prerendert.

**Wichtig fuer Build/CI:** Der `next build` MUSS mit `NODE_ENV=production` laufen.
Wird `tinacms dev -c "next build"` benutzt, setzt der Wrapper `NODE_ENV=development`,
was den `/404`-Prerender mit "<Html> should not be imported outside of pages/_document"
brechen laesst (dev-React-DOM). Empfohlener lokaler Build:
1. Datalayer starten: `npx tinacms dev -p 4001` (oder Tina-Cloud-Creds setzen)
2. In zweitem Terminal: `NODE_ENV=production npx next build`

Fuer Produktion mit TinaCloud: `npm run build` (= `tinacms build && next build`)
sobald `NEXT_PUBLIC_TINA_CLIENT_ID` / `TINA_TOKEN` / `branch` gesetzt sind.

---

## 9. Harte Regeln fuer Phase 2

1. Keine Foundation-Datei aus Abschnitt 0 ueberschreiben, AUSSER
   `components/mende/home-client-page.tsx` (Platzhalter → echte Sektionsliste).
2. Neue Sektionen ausschliesslich in `components/mende/<Name>.tsx`.
3. Keine Referenz auf `post/author/tag/page`-Collections oder `components/blocks/*`.
4. Farb-/Font-Klassen nur ueber Tokens (Abschnitt 6), keine Hex-Hardcodes (Theme-Regler!).
5. `font-700/600/500` → `font-bold/semibold/medium`.
6. Deutsch mit echten Umlauten (ä/ö/ü/ß), auch im Markup.
7. Felder optional behandeln (Optional Chaining), Listen mit `?.map`.
8. Build muss gruen bleiben: nach dem Einbau `NODE_ENV=production npx next build`
   gegen laufenden Datalayer pruefen.
