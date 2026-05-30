import type { Collection } from "tinacms";

const Home: Collection = {
  label: "Startseite",
  name: "home",
  path: "content/home",
  format: "json",
  ui: {
    global: true,
    // Visual Editing: Die Startseite liegt unter content/home/index.json und
    // wird von Next.js unter "/" gerendert (app/page.tsx). Der Router gibt
    // diesen Live-Pfad zurück, damit der Tina-Editor die Klick-zum-Bearbeiten-
    // Vorschau aktiviert. Rückgabe eines Strings => Visual Editing aktiv.
    router: () => "/",
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
        { type: "string", label: "Headline (Anfang)", name: "headlineLead" },
        {
          type: "string",
          label: "Headline (hervorgehoben)",
          name: "headlineHighlight",
        },
        {
          type: "string",
          label: "Subline",
          name: "subline",
          ui: { component: "textarea" },
        },
        {
          type: "string",
          label: "Primärer CTA",
          name: "primaryCtaLabel",
        },
        {
          type: "string",
          label: "Primärer CTA — Link (Anker oder URL)",
          name: "primaryCtaHref",
        },
        {
          type: "string",
          label: "Vertrauenshinweis",
          name: "trustNote",
        },
        { type: "image", label: "Hero-Bild", name: "image" },
      ],
    },

    // ============ TRUST-BAR ============
    {
      type: "object",
      label: "Trust-Bar",
      name: "trustBar",
      list: true,
      ui: {
        itemProps: (item) => ({ label: item?.title }),
        defaultItem: { title: "Meisterbetrieb", subtitle: "gepruefte Qualitaet" },
      },
      fields: [
        { type: "string", label: "Titel", name: "title" },
        { type: "string", label: "Untertitel", name: "subtitle" },
      ],
    },

    // ============ NUTZEN / DIFFERENZIERUNG ============
    {
      type: "object",
      label: "Nutzen / Warum wir",
      name: "nutzen",
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
          label: "Karten",
          name: "cards",
          list: true,
          ui: {
            itemProps: (item) => ({ label: item?.title }),
            defaultItem: { title: "Vorteil", text: "Beschreibung" },
          },
          fields: [
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

    // ============ LEISTUNGEN ============
    {
      type: "object",
      label: "Leistungen",
      name: "leistungen",
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
          label: "Leistungs-Kacheln",
          name: "items",
          list: true,
          ui: {
            itemProps: (item) => ({ label: item?.title }),
            defaultItem: {
              title: "Leistung",
              text: "Beschreibung",
              href: "#galerie",
            },
          },
          fields: [
            { type: "image", label: "Bild", name: "image" },
            { type: "string", label: "Titel", name: "title" },
            {
              type: "string",
              label: "Text",
              name: "text",
              ui: { component: "textarea" },
            },
            { type: "string", label: "Link", name: "href" },
          ],
        },
        {
          type: "string",
          label: "Kunstmaler-Link — Beschriftung",
          name: "kunstmalerCtaLabel",
        },
        {
          type: "string",
          label: "Kunstmaler-Link — Link (Anker oder URL)",
          name: "kunstmalerCtaHref",
        },
      ],
    },

    // ============ GALERIE / REFERENZEN ============
    {
      type: "object",
      label: "Galerie / Referenzen",
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
          label: "Filter",
          name: "filters",
          list: true,
          ui: {
            itemProps: (item) => ({ label: item?.label }),
            defaultItem: { key: "Alle", label: "Alle" },
          },
          fields: [
            { type: "string", label: "Schlüssel (key — identisch zum Label)", name: "key" },
            { type: "string", label: "Label", name: "label" },
          ],
        },
        {
          type: "object",
          label: "Galerie-Bilder",
          name: "items",
          list: true,
          ui: {
            itemProps: (item) => ({
              label: item?.alt || item?.category,
            }),
            defaultItem: { alt: "Bild", category: "Holz & Marmor" },
          },
          fields: [
            { type: "image", label: "Bild", name: "image" },
            { type: "string", label: "Alt-Text", name: "alt" },
            {
              type: "string",
              label: "Kategorie (muss exakt einem Filter-Label entsprechen)",
              name: "category",
            },
          ],
        },
        {
          type: "string",
          label: "Primärer CTA — Beschriftung",
          name: "primaryCtaLabel",
        },
        {
          type: "string",
          label: "Primärer CTA — Link (Anker oder URL)",
          name: "primaryCtaHref",
        },
        {
          type: "string",
          label: "Sekundärer CTA — Beschriftung",
          name: "secondaryCtaLabel",
        },
        {
          type: "string",
          label: "Sekundärer CTA — Link (Anker oder URL)",
          name: "secondaryCtaHref",
        },
      ],
    },

    // ============ EINWAND-ABBAU ============
    {
      type: "object",
      label: "Einwand-Abbau / Ihre Sicherheit",
      name: "einwand",
      fields: [
        { type: "string", label: "Eyebrow", name: "eyebrow" },
        { type: "string", label: "Überschrift", name: "heading" },
        {
          type: "object",
          label: "Punkte",
          name: "items",
          list: true,
          ui: {
            itemProps: (item) => ({ label: item?.question }),
            defaultItem: { question: "Frage?", answer: "Antwort." },
          },
          fields: [
            { type: "string", label: "Frage", name: "question" },
            {
              type: "string",
              label: "Antwort",
              name: "answer",
              ui: { component: "textarea" },
            },
          ],
        },
        { type: "string", label: "CTA-Beschriftung", name: "ctaLabel" },
        {
          type: "string",
          label: "CTA-Link (Anker oder URL)",
          name: "ctaHref",
        },
      ],
    },

    // ============ ABLAUF ============
    {
      type: "object",
      label: "Ablauf",
      name: "ablauf",
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
              label: item?.number ? `${item.number} — ${item?.title}` : item?.title,
            }),
            defaultItem: { number: "01", title: "Schritt", text: "Beschreibung" },
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

    // ============ BEWERTUNGEN ============
    {
      type: "object",
      label: "Bewertungen (Platzhalter)",
      name: "bewertungen",
      fields: [
        { type: "string", label: "Eyebrow", name: "eyebrow" },
        { type: "string", label: "Überschrift", name: "heading" },
        {
          type: "string",
          label: "Platzhalter-Hinweis",
          name: "placeholderNote",
          ui: { component: "textarea" },
        },
        {
          type: "object",
          label: "Stimmen",
          name: "items",
          list: true,
          ui: {
            itemProps: (item) => ({ label: item?.author }),
            defaultItem: { quote: "Beispieltext", author: "Mustername" },
          },
          fields: [
            {
              type: "string",
              label: "Zitat",
              name: "quote",
              ui: { component: "textarea" },
            },
            { type: "string", label: "Autor / Ort", name: "author" },
          ],
        },
      ],
    },

    // ============ UEBER UNS ============
    {
      type: "object",
      label: "Über uns",
      name: "ueberUns",
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
        { type: "image", label: "Bild", name: "image" },
        { type: "string", label: "Bild-Hinweis", name: "imageNote" },
        { type: "string", label: "CTA-Beschriftung", name: "ctaLabel" },
        {
          type: "string",
          label: "CTA-Link (Anker oder URL)",
          name: "ctaHref",
        },
      ],
    },

    // ============ FAQ ============
    {
      type: "object",
      label: "FAQ",
      name: "faq",
      fields: [
        { type: "string", label: "Eyebrow", name: "eyebrow" },
        { type: "string", label: "Überschrift", name: "heading" },
        {
          type: "object",
          label: "Fragen",
          name: "items",
          list: true,
          ui: {
            itemProps: (item) => ({ label: item?.question }),
            defaultItem: { question: "Frage?", answer: "Antwort." },
          },
          fields: [
            { type: "string", label: "Frage", name: "question" },
            {
              type: "string",
              label: "Antwort",
              name: "answer",
              ui: { component: "textarea" },
            },
          ],
        },
        {
          type: "string",
          label: "Fuß-Hinweis",
          name: "footerNote",
          ui: { component: "textarea" },
        },
      ],
    },

    // ============ KONTAKT ============
    {
      type: "object",
      label: "Kontakt",
      name: "kontakt",
      fields: [
        { type: "string", label: "Eyebrow", name: "eyebrow" },
        { type: "string", label: "Überschrift", name: "heading" },
        {
          type: "string",
          label: "Intro",
          name: "intro",
          ui: { component: "textarea" },
        },
      ],
    },
  ],
};

export default Home;
