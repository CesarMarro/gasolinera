"use client";

import { useCallback } from "react";

type Props = {
  value: string;
  onChange: (val: string) => void;
  onSubmit?: () => void;
};

const buttons = [
  ["7", "8", "9"],
  ["4", "5", "6"],
  ["1", "2", "3"],
  [".", "0", "←"],
];

export default function Keypad({ value, onChange, onSubmit }: Props) {
  const handlePress = useCallback(
    (key: string) => {
      if (key === "←") {
        onChange(value.slice(0, -1));
        return;
      }
      if (key === ".") {
        if (value.includes(".")) return;
        onChange(value ? value + "." : "0.");
        return;
      }
      onChange((value || "") + key);
    },
    [onChange, value]
  );

  return (
    <div className="flex gap-6 w-full">
      <div className="flex-1">
        <input
          className="w-full text-4xl md:text-5xl p-4 rounded-md border border-gris-medio text-right text-vino bg-white"
          value={value}
          readOnly
        />
        <div className="mt-3 grid grid-cols-3 gap-2">
          {buttons.flat().map((b) => (
            <button
              key={b}
              className="text-3xl md:text-4xl py-4 rounded-md bg-white hover:bg-gris-claro border border-gris-medio text-vino"
              onClick={() => handlePress(b)}
            >
              {b}
            </button>
          ))}
          <button
            className="col-span-3 text-2xl md:text-3xl py-4 rounded-md bg-white hover:bg-gris-claro border border-gris-medio text-vino"
            onClick={() => onChange("")}
          >
            Borrar
          </button>
          <button
            className="col-span-3 text-2xl md:text-3xl py-4 rounded-md bg-rojo-fuerte hover:bg-rojo-oscuro text-white"
            onClick={onSubmit}
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
}
