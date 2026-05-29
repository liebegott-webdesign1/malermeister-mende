"use client";
import React from "react";
import Link from "next/link";
import { useLayout } from "../layout-context";

export const Footer = () => {
  const { globalSettings } = useLayout();
  const brand = globalSettings?.brand;
  const contact = globalSettings?.contact;
  const nav = globalSettings?.nav ?? [];

  const year = new Date().getFullYear();

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
            <span className="font-serif text-2xl font-bold text-white">
              {renderBrand()}
            </span>
            <p className="mt-4 max-w-md text-cream/70 leading-relaxed">
              Meisterbetrieb für klassische Malerarbeiten und dekorative
              Techniken in Halle (Saale). Vom sauberen Anstrich bis zur
              Kunstmalerei.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">Kontakt</h4>
            <ul className="space-y-2 text-cream/70 text-sm">
              <li>{contact?.addressStreet}</li>
              <li>{contact?.addressCity}</li>
              {contact?.phoneRaw && (
                <li>
                  <a
                    href={`tel:${contact.phoneRaw}`}
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
              {nav.map((item, index) => (
                <li key={index}>
                  <Link href={item?.href ?? "#"} className="hover:text-white">
                    {item?.label}
                  </Link>
                </li>
              ))}
              <li>
                <a href="#" className="hover:text-white">
                  Impressum
                </a>{" "}
                ·{" "}
                <a href="#" className="hover:text-white">
                  Datenschutz
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 mt-12 pt-6 text-sm text-cream/50 flex flex-col sm:flex-row justify-between gap-2">
          <p>
            © {year} Malermeister Steffen Mende · {brand?.location}
          </p>
          <p>Meisterbetrieb · Halle (Saale) und Umgebung</p>
        </div>
      </div>
    </footer>
  );
};
