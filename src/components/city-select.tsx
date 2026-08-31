import { useEffect, useMemo, useRef, useState } from "react";

export type CityOption = { id: string; name: string };

/**
 * Champ ville avec saisie libre : les suggestions apparaissent dès 2 caractères.
 */
export function CitySelect({
  cities,
  value,
  onChange,
  id,
  className,
  placeholder = "Saisir une ville (2 lettres min.)",
}: {
  cities: CityOption[];
  value: string;
  onChange: (cityId: string) => void;
  id?: string;
  className?: string;
  placeholder?: string;
}) {
  const selected = cities.find((c) => c.id === value);
  const [query, setQuery] = useState(selected?.name ?? "");
  const [open, setOpen] = useState(false);
  const [highlight, setHighlight] = useState(0);
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const lastValue = useRef(value);

  useEffect(() => {
    if (lastValue.current !== value) {
      lastValue.current = value;
      setQuery(cities.find((c) => c.id === value)?.name ?? "");
    }
  }, [value, cities]);

  const norm = (s: string) =>
    s
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();

  const matches = useMemo(() => {
    const q = norm(query.trim());
    if (q.length < 2) return [];
    const nq = norm(q);
    return cities
      .filter((c) => norm(c.name).includes(nq))
      .sort((a, b) => {
        const as = norm(a.name).startsWith(nq) ? 0 : 1;
        const bs = norm(b.name).startsWith(nq) ? 0 : 1;
        return as - bs || a.name.localeCompare(b.name);
      })
      .slice(0, 20);
  }, [cities, query]);

  const pick = (c: CityOption) => {
    lastValue.current = c.id;
    setQuery(c.name);
    setOpen(false);
    onChange(c.id);
  };

  const base =
    className ??
    "w-full rounded-xl border border-border bg-muted px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/20";

  return (
    <div ref={wrapRef} className="relative">
      <input
        id={id}
        value={query}
        role="combobox"
        aria-expanded={open}
        aria-autocomplete="list"
        autoComplete="off"
        placeholder={placeholder}
        className={base}
        onChange={(e) => {
          setQuery(e.target.value);
          setHighlight(0);
          setOpen(true);
          if (value) {
            lastValue.current = "";
            onChange("");
          }
        }}
        onFocus={() => setOpen(true)}
        onBlur={() => setTimeout(() => setOpen(false), 150)}
        onKeyDown={(e) => {
          if (e.key === "ArrowDown") {
            e.preventDefault();
            setOpen(true);
            setHighlight((h) => Math.min(h + 1, matches.length - 1));
          } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setHighlight((h) => Math.max(h - 1, 0));
          } else if (e.key === "Enter" && open && matches[highlight]) {
            e.preventDefault();
            pick(matches[highlight]!);
          } else if (e.key === "Escape") {
            setOpen(false);
          }
        }}
      />
      {open && query.trim().length >= 2 && (
        <ul className="absolute left-0 right-0 top-full z-[1000] mt-1 max-h-64 overflow-auto rounded-xl border border-border bg-card shadow-panel">
          {matches.length === 0 ? (
            <li className="px-4 py-3 text-sm text-muted-foreground">Aucune ville trouvée</li>
          ) : (
            matches.map((c, i) => (
              <li key={c.id}>
                <button
                  type="button"
                  onMouseDown={(e) => e.preventDefault()}
                  onMouseEnter={() => setHighlight(i)}
                  onClick={() => pick(c)}
                  className={`block w-full px-4 py-2.5 text-left text-sm ${
                    i === highlight ? "bg-muted" : "hover:bg-muted"
                  }`}
                >
                  {c.name}
                </button>
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
}

export default CitySelect;
