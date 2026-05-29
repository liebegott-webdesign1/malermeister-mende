import React from "react";
import { wrapFieldsWithMeta } from "tinacms";

/**
 * Farb-Eingabefeld für die Primärfarbe der Seite.
 *
 * Speichert IMMER einen Hex-Code (z. B. #800000) — nicht mehr CSS-Farbnamen.
 * Dadurch entspricht der angezeigte Swatch exakt der angewendeten Farbe.
 * Bietet kuratierte, gut lesbare Marken-Vorlagen, einen nativen Farbwaehler
 * und ein Freitext-Hex-Feld.
 */

export const colorPresets: { label: string; hex: string }[] = [
  { label: "Bordeaux", hex: "#800000" },
  { label: "Anthrazit", hex: "#1f2937" },
  { label: "Dunkelblau", hex: "#1e3a5f" },
  { label: "Petrol", hex: "#0f766e" },
  { label: "Tannengrün", hex: "#166534" },
  { label: "Oliv", hex: "#3f6212" },
  { label: "Rostrot", hex: "#9a3412" },
  { label: "Aubergine", hex: "#6b21a8" },
  { label: "Schiefer", hex: "#334155" },
  { label: "Kaffeebraun", hex: "#5b3a29" },
];

// Rückwärtskompatibler Export (früher CSS-Farbnamen-Liste).
export const colorOptions = colorPresets.map((p) => p.hex);

const isHex6 = (v: string) => /^#[0-9a-fA-F]{6}$/.test(v);

export const ColorPickerInput = wrapFieldsWithMeta(({ input }: any) => {
  const value: string = (input.value as string) || "#800000";
  const active = value.trim().toLowerCase();

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap gap-2">
        {colorPresets.map((p) => {
          const selected = active === p.hex.toLowerCase();
          return (
            <button
              key={p.hex}
              type="button"
              title={`${p.label} (${p.hex})`}
              onClick={() => input.onChange(p.hex)}
              className="w-9 h-9 rounded-full shadow border border-black/10"
              style={{
                backgroundColor: p.hex,
                outline: selected ? "2px solid #2563eb" : "none",
                outlineOffset: "2px",
              }}
            />
          );
        })}
      </div>

      <div className="flex items-center gap-3">
        <input
          type="color"
          aria-label="Farbe wählen"
          value={isHex6(value) ? value : "#800000"}
          onChange={(e) => input.onChange(e.target.value)}
          className="w-10 h-10 rounded cursor-pointer border border-black/10 bg-transparent p-0"
        />
        <input
          type="text"
          spellCheck={false}
          value={value}
          placeholder="#800000"
          onChange={(e) => {
            let v = e.target.value.trim();
            if (v && !v.startsWith("#")) v = "#" + v;
            input.onChange(v);
          }}
          className="w-32 rounded border border-gray-300 px-3 py-2 text-sm font-mono"
        />
        <span
          className="inline-block w-7 h-7 rounded border border-black/10"
          style={{ backgroundColor: isHex6(value) ? value : "transparent" }}
        />
      </div>

      <p className="text-xs text-gray-500 leading-relaxed">
        Vorlage anklicken oder eigenen Hex-Code eingeben (z. B. #800000).
        Sehr helle Farben (Weiß, Neon-Gelb) vermeiden — sonst leidet die
        Lesbarkeit. Die Textfarbe auf Buttons passt sich automatisch an.
      </p>
    </div>
  );
});
