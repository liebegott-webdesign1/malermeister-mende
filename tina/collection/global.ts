import type { Collection } from "tinacms";
import { ColorPickerInput } from "../fields/color";

const Global: Collection = {
  label: "Global / Einstellungen",
  name: "global",
  path: "content/global",
  format: "json",
  ui: {
    global: true,
  },
  fields: [
    {
      type: "object",
      label: "Marke",
      name: "brand",
      fields: [
        {
          type: "string",
          label: "Name",
          name: "name",
        },
        {
          type: "string",
          label: "Ort",
          name: "location",
        },
      ],
    },
    {
      type: "object",
      label: "Kontakt",
      name: "contact",
      fields: [
        {
          type: "string",
          label: "Telefon (Anzeige)",
          name: "phoneDisplay",
        },
        {
          type: "string",
          label: "Telefon (nur Ziffern, für tel:)",
          name: "phoneRaw",
        },
        {
          type: "string",
          label: "Mobil",
          name: "mobile",
        },
        {
          type: "string",
          label: "E-Mail",
          name: "email",
        },
        {
          type: "string",
          label: "Straße",
          name: "addressStreet",
        },
        {
          type: "string",
          label: "PLZ & Ort",
          name: "addressCity",
        },
      ],
    },
    {
      type: "object",
      label: "Navigation",
      name: "nav",
      list: true,
      ui: {
        itemProps: (item) => {
          return { label: item?.label };
        },
        defaultItem: {
          label: "Leistungen",
          href: "#leistungen",
        },
      },
      fields: [
        {
          type: "string",
          label: "Label",
          name: "label",
        },
        {
          type: "string",
          label: "Link (Anker oder URL)",
          name: "href",
        },
        {
          type: "object",
          label: "Untermenü (Dropdown, optional)",
          name: "dropdown",
          list: true,
          ui: {
            itemProps: (sub) => {
              return { label: sub?.label };
            },
          },
          fields: [
            {
              type: "string",
              label: "Label",
              name: "label",
            },
            {
              type: "string",
              label: "Link (Anker oder URL)",
              name: "href",
            },
          ],
        },
      ],
    },
    {
      type: "string",
      label: "CTA-Beschriftung",
      name: "ctaLabel",
    },
    {
      type: "string",
      label: "CTA-Link (Anker oder URL)",
      name: "ctaHref",
    },
    {
      type: "object",
      label: "Footer",
      name: "footer",
      fields: [
        {
          type: "string",
          label: "Beschreibungstext",
          name: "description",
          ui: {
            component: "textarea",
          },
        },
        {
          type: "object",
          label: "Seiten-Links",
          name: "pages",
          list: true,
          ui: {
            itemProps: (item) => {
              return { label: item?.label };
            },
            defaultItem: {
              label: "Leistungen",
              href: "/#leistungen",
            },
          },
          fields: [
            {
              type: "string",
              label: "Label",
              name: "label",
            },
            {
              type: "string",
              label: "Link (Anker oder URL)",
              name: "href",
            },
          ],
        },
        {
          type: "object",
          label: "Rechtliche Links (Impressum, Datenschutz)",
          name: "legalLinks",
          list: true,
          ui: {
            itemProps: (item) => {
              return { label: item?.label };
            },
            defaultItem: {
              label: "Impressum",
              href: "#",
            },
          },
          fields: [
            {
              type: "string",
              label: "Label",
              name: "label",
            },
            {
              type: "string",
              label: "Link (Anker oder URL)",
              name: "href",
            },
          ],
        },
        {
          type: "string",
          label: "Copyright-Name",
          name: "copyrightName",
        },
        {
          type: "string",
          label: "Copyright-Zusatz (rechts)",
          name: "copyrightTagline",
        },
      ],
    },
    {
      type: "object",
      label: "Theme",
      name: "theme",
      fields: [
        {
          type: "string",
          label: "Primärfarbe (Bordeaux)",
          name: "color",
          ui: {
            // Cast: Tina-Typing für Custom-UI-Komponenten (wie im Original-Starter)
            component: ColorPickerInput as any,
          },
        },
      ],
    },
  ],
};

export default Global;
