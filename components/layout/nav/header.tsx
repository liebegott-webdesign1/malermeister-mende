"use client";

import React from "react";
import Link from "next/link";
import { useLayout } from "../layout-context";

export const Header = () => {
  const { globalSettings } = useLayout();
  const brand = globalSettings?.brand;
  const contact = globalSettings?.contact;
  const nav = globalSettings?.nav ?? [];
  const ctaLabel = globalSettings?.ctaLabel ?? "Angebot anfordern";

  const [menuOpen, setMenuOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Markenname mit hervorgehobenem letzten Wort ("Malermeister Mende")
  const renderBrand = () => {
    const name = brand?.name ?? "Malermeister Mende";
    const parts = name.trim().split(" ");
    if (parts.length < 2) {
      return <span className="text-bordeaux">{name}</span>;
    }
    const last = parts.pop();
    return (
      <>
        {parts.join(" ")} <span className="text-bordeaux">{last}</span>
      </>
    );
  };

  const phoneRaw = contact?.phoneRaw ?? "";
  const phoneDisplay = contact?.phoneDisplay ?? "";

  return (
    <header
      className={`sticky top-0 z-40 bg-cream/95 backdrop-blur border-b border-sand transition-shadow ${
        scrolled ? "shadow-md" : ""
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex flex-col leading-none group">
            <span className="font-serif text-2xl sm:text-[1.7rem] font-bold text-ink tracking-tight">
              {renderBrand()}
            </span>
            <span className="text-[11px] tracking-[0.25em] uppercase text-stone mt-0.5">
              {brand?.location ?? "Halle (Saale)"}
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8 text-[15px] font-medium text-ink">
            {nav.map((item, index) => {
              const subs = item?.dropdown ?? [];
              if (subs.length > 0) {
                return (
                  <div key={index} className="relative group">
                    <button
                      type="button"
                      className="nav-link flex items-center gap-1 py-2"
                      aria-haspopup="true"
                    >
                      {item?.label}
                      <svg
                        className="w-4 h-4"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.23 7.21a.75.75 0 011.06.02L10 11.17l3.71-3.94a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                    <div className="absolute left-1/2 -translate-x-1/2 top-full pt-3 w-72 invisible opacity-0 translate-y-1 transition-all duration-200 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 group-focus-within:visible group-focus-within:opacity-100 group-focus-within:translate-y-0 z-50">
                      <div className="bg-white rounded-xl shadow-xl ring-1 ring-black/5 overflow-hidden py-2">
                        {subs.map((sub, si) => {
                          const href = sub?.href ?? "#";
                          const isPage =
                            href.startsWith("/") && !href.includes("#");
                          return (
                            <Link
                              key={si}
                              href={href}
                              className="flex items-center justify-between px-5 py-3 text-sm hover:bg-cream hover:text-bordeaux transition"
                            >
                              {sub?.label}
                              {isPage && (
                                <span className="text-[10px] uppercase tracking-wider text-bordeaux/70">
                                  Seite
                                </span>
                              )}
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              }
              return (
                <Link
                  key={index}
                  href={item?.href ?? "#"}
                  className="nav-link"
                >
                  {item?.label}
                </Link>
              );
            })}
          </nav>

          {/* Right: phone + CTA */}
          <div className="hidden lg:flex items-center gap-5">
            {phoneRaw && (
              <a
                href={`tel:${phoneRaw}`}
                className="flex items-center gap-2 text-ink hover:text-bordeaux transition font-semibold"
              >
                <svg
                  className="w-5 h-5 text-bordeaux"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M2 3.5A1.5 1.5 0 013.5 2h1.148a1.5 1.5 0 011.465 1.175l.716 3.223a1.5 1.5 0 01-1.052 1.767l-.933.267c.41 1.62 1.7 2.91 3.32 3.32l.267-.933a1.5 1.5 0 011.767-1.052l3.223.716A1.5 1.5 0 0118 13.352V14.5a1.5 1.5 0 01-1.5 1.5H15c-7.18 0-13-5.82-13-13V3.5z" />
                </svg>
                {phoneDisplay}
              </a>
            )}
            <a
              href="/#kontakt"
              className="bg-bordeaux hover:bg-bordeaux-dark text-bordeaux-foreground px-5 py-2.5 rounded-lg font-semibold text-sm transition shadow-sm"
            >
              {ctaLabel}
            </a>
          </div>

          {/* Burger */}
          <button
            onClick={() => setMenuOpen((s) => !s)}
            className="lg:hidden p-2 -mr-2 text-ink"
            aria-label={menuOpen ? "Menü schließen" : "Menü öffnen"}
            aria-expanded={menuOpen}
          >
            <svg
              className="w-7 h-7"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="lg:hidden border-t border-sand bg-cream">
          <nav className="px-4 py-4 space-y-1 text-ink font-medium">
            {nav.map((item, index) => {
              const subs = item?.dropdown ?? [];
              if (subs.length > 0) {
                return (
                  <details key={index} className="border-b border-sand/70">
                    <summary className="flex items-center justify-between py-2.5 cursor-pointer list-none">
                      {item?.label}
                      <svg
                        className="w-4 h-4"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" />
                      </svg>
                    </summary>
                    <div className="pl-4 pb-2 space-y-1 text-sm text-stone">
                      {subs.map((sub, si) => (
                        <Link
                          key={si}
                          href={sub?.href ?? "#"}
                          onClick={() => setMenuOpen(false)}
                          className="block py-2"
                        >
                          {sub?.label}
                        </Link>
                      ))}
                    </div>
                  </details>
                );
              }
              return (
                <Link
                  key={index}
                  href={item?.href ?? "#"}
                  onClick={() => setMenuOpen(false)}
                  className="block py-2.5 border-b border-sand/70"
                >
                  {item?.label}
                </Link>
              );
            })}
            <a
              href="/#kontakt"
              onClick={() => setMenuOpen(false)}
              className="block mt-3 text-center bg-bordeaux text-bordeaux-foreground px-5 py-3 rounded-lg font-semibold"
            >
              {ctaLabel}
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};
