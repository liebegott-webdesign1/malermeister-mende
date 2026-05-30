"use client";
import React from "react";
import Link from "next/link";
import { tinaField } from "tinacms/dist/react";
import { useLayout } from "../layout-context";

export const Footer = () => {
  const { globalSettings } = useLayout();
  const brand = globalSettings?.brand;
  const contact = globalSettings?.contact;
  const footer = globalSettings?.footer;

  const year = new Date().getFullYear();

  // Footer-Spalte "Seiten" — jetzt aus global.footer.pages editierbar.
  // Fallback auf die Original-Einträge, falls (noch) nichts gepflegt ist.
  const footerPages =
    footer?.pages && footer.pages.length > 0
      ? footer.pages
      : [
          { label: "Leistungen", href: "/#leistungen" },
          { label: "Referenzen", href: "/#galerie" },
          { label: "Holz & Marmor", href: "/holz-und-marmor" },
          { label: "Der Kunstmaler", href: "/der-kunstmaler" },
          { label: "Kontakt", href: "/#kontakt" },
        ];

  const legalLinks =
    footer?.legalLinks && footer.legalLinks.length > 0
      ? footer.legalLinks
      : [
          { label: "Impressum", href: "#" },
          { label: "Datenschutz", href: "#" },
        ];

  // Markenname mit hervorgehobenem letzten Wort
  const renderBrand = () => {
    const name = brand?.name ?? "Malermeister Mende";
    const parts = name.trim().split(" ");
    if (parts.length < 2) {
      return <span className="text-bordeaux-light">{name}</span>;
    }
    const last = parts.pop();
    return (
      <>
        {parts.join(" ")} <span className="text-bordeaux-light">{last}</span>
      </>
    );
  };

  return (
    <footer className="bg-ink text-cream/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <span
              data-tina-field={brand ? tinaField(brand, "name") : undefined}
              className="font-serif text-2xl font-bold text-white"
            >
              {renderBrand()}
            </span>
            <p
              data-tina-field={
                footer ? tinaField(footer, "description") : undefined
              }
              className="mt-4 max-w-md text-cream/70 leading-relaxed"
            >
              {footer?.description ??
                "Meisterbetrieb für klassische Malerarbeiten und dekorative Techniken in Halle (Saale). Vom sauberen Anstrich bis zur Kunstmalerei."}
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">Kontakt</h4>
            <ul className="space-y-2 text-cream/70 text-sm">
              <li
                data-tina-field={
                  contact ? tinaField(contact, "addressStreet") : undefined
                }
              >
                {contact?.addressStreet}
              </li>
              <li
                data-tina-field={
                  contact ? tinaField(contact, "addressCity") : undefined
                }
              >
                {contact?.addressCity}
              </li>
              {contact?.phoneRaw && (
                <li>
                  <a
                    href={`tel:${contact.phoneRaw}`}
                    data-tina-field={tinaField(contact, "phoneDisplay")}
                    className="hover:text-white"
                  >
                    Tel.: {contact?.phoneDisplay}
                  </a>
                </li>
              )}
              {contact?.mobile && (
                <li>
                  <a
                    href={`tel:${contact.mobile.replace(/\s/g, "")}`}
                    data-tina-field={tinaField(contact, "mobile")}
                    className="hover:text-white"
                  >
                    Mobil: {contact.mobile}
                  </a>
                </li>
              )}
              {contact?.email && (
                <li>
                  <a
                    href={`mailto:${contact.email}`}
                    data-tina-field={tinaField(contact, "email")}
                    className="hover:text-white"
                  >
                    {contact.email}
                  </a>
                </li>
              )}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">Seiten</h4>
            <ul className="space-y-2 text-cream/70 text-sm">
              {footerPages.map((item, index) => (
                <li key={index}>
                  <Link
                    href={item?.href ?? "#"}
                    data-tina-field={
                      footer && item ? tinaField(item, "label") : undefined
                    }
                    className="hover:text-white"
                  >
                    {item?.label}
                  </Link>
                </li>
              ))}
              <li>
                {legalLinks.map((item, index) => (
                  <React.Fragment key={index}>
                    {index > 0 && " · "}
                    <a
                      href={item?.href ?? "#"}
                      data-tina-field={
                        footer && item ? tinaField(item, "label") : undefined
                      }
                      className="hover:text-white"
                    >
                      {item?.label}
                    </a>
                  </React.Fragment>
                ))}
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 mt-12 pt-6 text-sm text-cream/50 flex flex-col sm:flex-row justify-between gap-2">
          <p
            data-tina-field={
              footer ? tinaField(footer, "copyrightName") : undefined
            }
          >
            © {year} {footer?.copyrightName ?? "Malermeister Steffen Mende"} ·{" "}
            {brand?.location}
          </p>
          <p
            data-tina-field={
              footer ? tinaField(footer, "copyrightTagline") : undefined
            }
          >
            {footer?.copyrightTagline ??
              "Meisterbetrieb · Halle (Saale) und Umgebung"}
          </p>
        </div>
      </div>
    </footer>
  );
};
