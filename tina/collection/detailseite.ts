import type { Collection } from "tinacms";

/**
 * Wiederverwendbare Detailseiten-Vorlage (Template-Gedanke).
 *
 * EINE Collection, beliebig viele Dokumente unter content/detailseite/*.json.
 * Aktuell: der-kunstmaler.json und holz-und-marmor.json.
 *
 * Gemeinsame Struktur jeder Detailseite:
 *   Hero → Intro → Galerie → (optional Ablauf) → CTA
 *
 * Der Ablauf-Block ist optional: Lässt man `ablauf.steps` leer, rendert die
 * zugehörige Komponente (DetailAblauf) nichts. So teilt sich Holz & Marmor
 * (mit Ablauf-Schritten) denselben Komponenten-Satz wie Der Kunstmaler (ohne).
 *
 * Interne Links als Next.js-Routen (z. B. "/", nicht index.html).
 * Bildpfade als /assets/bilder/<name>.webp.
 */
const Detailseite: Collection = {
  label: "Detailseiten",
  name: "detailseite",
  path: "content/detailseite",
  format: "json",
  ui: {
    // Slug aus dem Dateinamen — keine neuen Dokumente über die Admin-UI,
    // die Routen sind fest verdrahtet (der-kunstmaler / holz-und-marmor).
    allowedActions: {
      create: false,
      delete: false,
    },
    // Visual Editing: Jede Detailseite liegt unter content/detailseite/<slug>.json
    // und wird von Next.js unter "/<slug>" gerendert. Der Dateiname OHNE Endung
    // (_sys.filename) ist exakt der Slug — z. B. "der-kunstmaler" => /der-kunstmaler
    // (app/der-kunstmaler/page.tsx), "holz-und-marmor" => /holz-und-marmor
    // (app/holz-und-marmor/page.tsx). Der zurückgegebene Pfad muss mit der
    // statisch generierten Next-Route übereinstimmen.
    router: ({ document }) => `/${document._sys.filename}`,
  },
  fields: [
    // ============ SEO ============
    {
      type: "object",
      label: "SEO",
      name: "seo",
      fields: [
        { type: "string", label: "Titel", name: "title" },
        {
          type: "string",
          label: "Beschreibung",
          name: "description",
          ui: { component: "textarea" },
        },
      ],
    },

    // ============ HERO ============
    {
      type: "object",
      label: "Hero",
      name: "hero",
      fields: [
        { type: "string", label: "Badge", name: "badge" },
        { type: "string", label: "Überschrift (Anfang)", name: "headlineLead" },
        {
          type: "string",
          label: "Überschrift (hervorgehoben)",
          name: "headlineHighlight",
        },
        {
          type: "string",
          label: "Subline",
          name: "subline",
          ui: { component: "textarea" },
        },
        { type: "image", label: "Hero-Bild", name: "image" },
        {
          type: "string",
          label: "Primärer CTA — Beschriftung",
          name: "primaryCtaLabel",
        },
        {
          type: "string",
          label: "Primärer CTA — Link (Route oder Anker)",
          name: "primaryCtaHref",
        },
        {
          type: "string",
          label: "Zurück-Link Beschriftung (Breadcrumb)",
          name: "backLabel",
        },
        {
          type: "string",
          label: "Breadcrumb — Eltern-Beschriftung (optional)",
          name: "breadcrumbParentLabel",
          description:
            "Optional. Wenn gesetzt, wird ein 3-stufiger Breadcrumb gerendert (Start › Eltern › aktuell).",
        },
        {
          type: "string",
          label: "Breadcrumb — Eltern-Link (Route oder Anker)",
          name: "breadcrumbParentHref",
        },
        {
          type: "string",
          label: "Sekundärer CTA — Beschriftung (optional)",
          name: "secondaryCtaLabel",
        },
        {
          type: "string",
          label: "Sekundärer CTA — Link (Route oder Anker)",
          name: "secondaryCtaHref",
        },
        {
          type: "string",
          label: "Hero-Bild — Alt-Text (optional)",
          name: "imageAlt",
        },
      ],
    },

    // ============ INTRO ============
    {
      type: "object",
      label: "Intro / Einleitung",
      name: "intro",
      fields: [
        { type: "string", label: "Eyebrow", name: "eyebrow" },
        { type: "string", label: "Überschrift", name: "heading" },
        {
          type: "object",
          label: "Absätze",
          name: "paragraphs",
          list: true,
          ui: {
            itemProps: (item) => ({
              label: item?.text ? item.text.slice(0, 40) : "Absatz",
            }),
            defaultItem: { text: "Absatz-Text" },
          },
          fields: [
            {
              type: "string",
              label: "Text",
              name: "text",
              ui: { component: "textarea" },
            },
          ],
        },
        {
          type: "object",
          label: "Info-Karte (rechte Spalte, optional)",
          name: "sideCard",
          description:
            "Optional. Wenn gesetzt, erscheint rechts eine weiße Info-Karte mit Überschrift, Bullet-Liste und optionalem CTA-Link.",
          fields: [
            { type: "string", label: "Überschrift", name: "heading" },
            {
              type: "object",
              label: "Listenpunkte",
              name: "items",
              list: true,
              ui: {
                itemProps: (item) => ({ label: item?.text || "Listenpunkt" }),
                defaultItem: { text: "Listenpunkt" },
              },
              fields: [{ type: "string", label: "Text", name: "text" }],
            },
            {
              type: "string",
              label: "CTA — Beschriftung (optional)",
              name: "ctaLabel",
              ui: { component: "textarea" },
            },
            {
              type: "string",
              label: "CTA — Link (Route oder Anker)",
              name: "ctaHref",
            },
          ],
        },
      ],
    },

    // ============ GALERIE ============
    {
      type: "object",
      label: "Galerie",
      name: "galerie",
      fields: [
        { type: "string", label: "Eyebrow", name: "eyebrow" },
        { type: "string", label: "Überschrift", name: "heading" },
        {
          type: "string",
          label: "Intro",
          name: "intro",
          ui: { component: "textarea" },
        },
        {
          type: "object",
          label: "Galerie-Bilder",
          name: "items",
          list: true,
          ui: {
            itemProps: (item) => ({ label: item?.alt || "Bild" }),
            defaultItem: { alt: "Bild" },
          },
          fields: [
            { type: "image", label: "Bild", name: "image" },
            { type: "string", label: "Alt-Text", name: "alt" },
            {
              type: "string",
              label: "Bildunterschrift (optional)",
              name: "caption",
            },
          ],
        },
      ],
    },

    // ============ ABLAUF (optional) ============
    {
      type: "object",
      label: "Ablauf (optional)",
      name: "ablauf",
      description:
        "Optional. Bleibt das Feld leer (keine Schritte), wird der Ablauf-Block nicht gerendert.",
      fields: [
        { type: "string", label: "Eyebrow", name: "eyebrow" },
        { type: "string", label: "Überschrift", name: "heading" },
        {
          type: "object",
          label: "Schritte",
          name: "steps",
          list: true,
          ui: {
            itemProps: (item) => ({
              label: item?.number
                ? `${item.number} — ${item?.title}`
                : item?.title,
            }),
            defaultItem: {
              number: "01",
              title: "Schritt",
              text: "Beschreibung",
            },
          },
          fields: [
            { type: "string", label: "Nummer", name: "number" },
            { type: "string", label: "Titel", name: "title" },
            {
              type: "string",
              label: "Text",
              name: "text",
              ui: { component: "textarea" },
            },
          ],
        },
      ],
    },

    // ============ CTA ============
    {
      type: "object",
      label: "CTA / Abschluss",
      name: "cta",
      fields: [
        { type: "string", label: "Überschrift", name: "heading" },
        {
          type: "string",
          label: "Text",
          name: "text",
          ui: { component: "textarea" },
        },
        {
          type: "string",
          label: "Primärer CTA — Beschriftung",
          name: "primaryLabel",
        },
        {
          type: "string",
          label: "Primärer CTA — Link (Route oder Anker)",
          name: "primaryHref",
        },
      ],
    },
  ],
};

export default Detailseite;
