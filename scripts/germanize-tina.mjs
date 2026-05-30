#!/usr/bin/env node
/**
 * germanize-tina.mjs
 * --------------------------------------------------------------------------
 * Übersetzt die nutzer-sichtbaren Strings der TinaCMS-Admin-Oberfläche ins
 * Deutsche. Tina bietet KEINEN offiziellen Schalter dafür (siehe
 * https://github.com/tinacms/tinacms/issues/4756), darum patchen wir die
 * Strings direkt im (unminifizierten) Toolkit-Bundle.
 *
 * Sicherheit:
 *  - Jede Regel ersetzt einen KONTEXT-genauen Teilstring (kein blindes "Add").
 *  - Strings, die intern als Schlüssel dienen (z.B. category !== "Site"),
 *    werden NICHT angefasst — nur die jeweiligen Anzeige-Literale.
 *  - Pro Regel wird die Trefferzahl gemeldet. 0 Treffer = Warnung
 *    (Bundle hat sich vermutlich durch ein Tina-Update geändert).
 *
 * Aufruf:  node scripts/germanize-tina.mjs
 * Wird per "postinstall" automatisch nach jedem npm install ausgeführt.
 */
import { readFileSync, writeFileSync, copyFileSync, existsSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const TARGET = 'node_modules/tinacms/dist/index.js';
const BACKUP = join(tmpdir(), 'tina-index-orig.js');

// [von, nach, anmerkung]  — "von" muss exakt (inkl. Kontext) im Bundle stehen.
const RULES = [
  // ── Formular-Footer (Default-Button-Labels der Form-Klasse) ──────────────
  ['save: "Save"',                       'save: "Speichern"',            'Speichern-Button (Default)'],
  ['reset: "Reset"',                     'reset: "Zurücksetzen"',        'Zurücksetzen-Button (Default)'],
  ['}, "Reset")',                        '}, "Zurücksetzen")',           'Feld-Reset-Buttons'],

  // ── Sidebar / Navigation (nur Anzeige-Literale, keine Schlüssel) ─────────
  ['"span", null, "Collections")',       '"span", null, "Inhalte")',     'Sidebar-Überschrift "Collections"'],
  ['text-gray-700" }, "Site")',          'text-gray-700" }, "Website")',  'Sidebar-Überschrift "Site"'],
  ['navCategory: "Dashboard"',           'navCategory: "Übersicht"',     'Sidebar-Überschrift "Dashboard"'],
  ['name: "Media Manager"',              'name: "Medien"',               'Sidebar-Eintrag "Media Manager"'],
  ['}, "Media Manager")',                '}, "Medien")',                 'Medien-Seitenüberschrift'],
  ['name: "Media Usage"',                'name: "Speicherplatz"',        'Dashboard-Eintrag "Media Usage"'],
  ['" Log Out"',                         '" Abmelden"',                  'Abmelden-Button'],

  // ── Top-Leiste (title + aria-label, je 2x) ───────────────────────────────
  ['"Show editing panel"',               '"Bearbeitung einblenden"',     'Panel einblenden'],
  ['"Hide editing panel"',               '"Bearbeitung ausblenden"',     'Panel ausblenden'],
  ['"Open navigation menu"',             '"Menü öffnen"',                'Menü öffnen'],
  ['"Toggle navigation menu"',           '"Menü umschalten"',            'Menü umschalten'],

  // ── Listen-Ansicht ───────────────────────────────────────────────────────
  ['"Filename"',                         '"Dateiname"',                  'Spalte "Filename"'],
  ['}, "Extension")',                    '}, "Typ")',                    'Spalte "Extension"'],
  ['}, "Template")',                     '}, "Vorlage")',                'Spalte "Template"'],
  [' Previous")',                        ' Zurück")',                    'Pager zurück'],
  ['"Next ", ',                          '"Weiter ", ',                  'Pager weiter'],
  ['}, "No documents found.")',          '}, "Keine Einträge gefunden.")', 'Leere Liste'],

  // ── Medien-Manager / Dialoge ─────────────────────────────────────────────
  ['"Cancel"',                           '"Abbrechen"',                  'Abbrechen-Buttons'],
  ['"Delete"',                           '"Löschen"',                    'Löschen-Buttons'],
  ['"New Folder"',                       '"Neuer Ordner"',               'Neuer Ordner'],
  ['"Create Folder"',                    '"Ordner erstellen"',           'Ordner erstellen'],
  ['"Loading..."',                       '"Lädt …"',                     'Ladeanzeige'],
  ['"Add"',                              '"Hinzufügen"',                 'Hinzufügen-Button'],

  // ── Visual-Editing-Panel (sieht der Redakteur beim Bearbeiten) ───────────
  ['"TinaCMS form fields "',             '"Die Bearbeitungsfelder "',    'Panel-Hinweis (Teil 1)'],
  ['"will appear here."',                '"erscheinen hier."',           'Panel-Hinweis (Teil 2)'],

  // ── Hinweise (nur Dev/Local-Modus, schaden aber nicht) ───────────────────
  ['"You are in local mode"',            '"Lokaler Modus"',              'Local-Mode-Hinweis'],
  ['"You have not configured search."',  '"Suche ist nicht eingerichtet."', 'Such-Hinweis'],
];

function main() {
  if (!existsSync(TARGET)) {
    console.error(`[germanize-tina] ❌ ${TARGET} nicht gefunden — übersprungen.`);
    process.exit(0); // nicht den npm-install abbrechen
  }

  // Original einmalig sichern (für Notfall-Revert via cp)
  if (!existsSync(BACKUP)) copyFileSync(TARGET, BACKUP);

  let src = readFileSync(TARGET, 'utf8');
  let total = 0;
  const misses = [];

  for (const [from, to, note] of RULES) {
    const count = src.split(from).length - 1;
    if (count === 0) {
      misses.push(note);
      console.warn(`[germanize-tina] ⚠️  0 Treffer: ${note}  (Muster: ${from})`);
      continue;
    }
    src = src.split(from).join(to);
    total += count;
    console.log(`[germanize-tina] ✅ ${String(count).padStart(2)}x  ${note}`);
  }

  writeFileSync(TARGET, src, 'utf8');
  console.log(`[germanize-tina] Fertig: ${total} Ersetzungen, ${misses.length} Regel(n) ohne Treffer.`);
  if (misses.length) {
    console.log('[germanize-tina] Hinweis: Bundle evtl. durch Tina-Update geändert — Muster prüfen.');
  }
}

main();
