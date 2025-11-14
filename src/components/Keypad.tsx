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
          className="w-full text-5xl md:text-6xl p-6 rounded-md border border-slate-300 text-right"
          value={value}
          readOnly
        />
        <div className="mt-4 grid grid-cols-3 gap-3">
          {buttons.flat().map((b) => (
            <button
              key={b}
              className="text-4xl md:text-5xl py-5 rounded-md bg-slate-100 hover:bg-slate-200 border border-slate-200"
              onClick={() => handlePress(b)}
            >
              {b}
            </button>
          ))}
          <button
            className="col-span-3 text-3xl md:text-4xl py-5 rounded-md bg-white hover:bg-slate-50 border border-slate-300 text-slate-700"
            onClick={() => onChange("")}
          >
            Borrar
          </button>
          <button
            className="col-span-3 text-3xl md:text-4xl py-5 rounded-md bg-emerald-700 hover:bg-emerald-600 text-white"
            onClick={onSubmit}
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
}
