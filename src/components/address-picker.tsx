import { useEffect, useRef, useState } from "react";

export type AddressValue = {
  address: string;
  lat: number | null;
  lng: number | null;
};

type Suggestion = { lat: string; lon: string; display_name: string };

/**
 * Sélecteur d'adresse léger : autocomplétion Nominatim + géolocalisation.
 * Pas de carte, pas de bouton « Chercher » : les suggestions s'affichent
 * automatiquement dès 3 caractères saisis.
 */
export function AddressPicker({
  value,
  onChange,
}: {
  value: AddressValue;
  onChange: (next: AddressValue) => void;
}) {
  const [query, setQuery] = useState(value.address ?? "");
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [openList, setOpenList] = useState(false);
  const [searching, setSearching] = useState(false);
  const [locating, setLocating] = useState(false);
  const skipNextFetch = useRef(false);

  useEffect(() => {
    if (skipNextFetch.current) {
      skipNextFetch.current = false;
      return;
    }
    const q = query.trim();
    if (q.length < 3) {
      setSuggestions([]);
      setOpenList(false);
      return;
    }
    let cancelled = false;
    setSearching(true);
    const timer = setTimeout(() => {
      void (async () => {
        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/search?format=json&addressdetails=0&limit=6&countrycodes=ma&q=${encodeURIComponent(q)}`,
            { headers: { Accept: "application/json" } },
          );
          const json = (await res.json()) as Suggestion[];
          if (cancelled) return;
          setSuggestions(json);
          setOpenList(json.length > 0);
        } catch {
          if (!cancelled) setSuggestions([]);
        } finally {
          if (!cancelled) setSearching(false);
        }
      })();
    }, 350);
    return () => {
      cancelled = true;
      clearTimeout(timer);
      setSearching(false);
    };
  }, [query]);

  const pick = (s: Suggestion) => {
    skipNextFetch.current = true;
    setQuery(s.display_name);
    setSuggestions([]);
    setOpenList(false);
    onChange({ address: s.display_name, lat: Number(s.lat), lng: Number(s.lon) });
  };

  const locate = () => {
    if (typeof navigator === "undefined" || !navigator.geolocation) return;
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        void (async () => {
          let address = "Ma position actuelle";
          try {
            const res = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&zoom=18&lat=${latitude}&lon=${longitude}`,
              { headers: { Accept: "application/json" } },
            );
            const json = (await res.json()) as { display_name?: string };
            if (json.display_name) address = json.display_name;
          } catch {
            /* garde le libellé par défaut */
          }
          skipNextFetch.current = true;
          setQuery(address);
          onChange({ address, lat: latitude, lng: longitude });
          setLocating(false);
        })();
      },
      () => setLocating(false),
      { enableHighAccuracy: true, timeout: 10000 },
    );
  };

  return (
    <div className="space-y-3">
      <button
        type="button"
        onClick={locate}
        disabled={locating}
        className="group flex w-full items-center gap-4 rounded-2xl border-2 border-primary/30 bg-primary/10 px-5 py-4 text-left transition-all hover:border-primary hover:bg-primary/15 active:scale-[0.99] disabled:opacity-70"
      >
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-panel transition-transform group-hover:scale-110">
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
            <circle cx="12" cy="12" r="3" />
            <path d="M12 2v3M12 19v3M2 12h3M19 12h3" strokeLinecap="round" />
            <circle cx="12" cy="12" r="8" opacity="0.4" />
          </svg>
        </span>
        <span>
          <span className="block text-sm font-bold text-primary">
            {locating ? "Localisation en cours…" : "Utiliser ma position"}
          </span>
          <span className="block text-xs text-muted-foreground">
            Un clic suffit : on trouve les professeurs les plus proches de vous.
          </span>
        </span>
      </button>

      <div className="relative">
        <input
          value={query}
          onChange={(e) => {
            const text = e.target.value;
            setQuery(text);
            // Adresse saisie à la main (sans GPS) : on l'exporte quand même.
            onChange({ address: text, lat: null, lng: null });
          }}
          onFocus={() => setOpenList(suggestions.length > 0)}
          onBlur={() => setTimeout(() => setOpenList(false), 150)}
          onKeyDown={(e) => {
            if (e.key === "Enter") e.preventDefault();
            if (e.key === "Escape") setOpenList(false);
          }}
          role="combobox"
          aria-expanded={openList}
          aria-autocomplete="list"
          placeholder="Ou saisir une adresse, un quartier…"
          className="w-full rounded-xl border border-border bg-muted px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/20"
        />
        {query.trim().length >= 3 && (openList || searching) && (
          <ul className="absolute left-0 right-0 top-full z-[1000] mt-1 max-h-64 overflow-auto rounded-xl border border-border bg-card shadow-panel">
            {searching && suggestions.length === 0 ? (
              <li className="px-4 py-3 text-sm text-muted-foreground">Recherche…</li>
            ) : (
              suggestions.map((s) => (
                <li key={`${s.lat}-${s.lon}-${s.display_name}`}>
                  <button
                    type="button"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => pick(s)}
                    className="block w-full px-4 py-2.5 text-left text-sm hover:bg-muted"
                  >
                    {s.display_name}
                  </button>
                </li>
              ))
            )}
          </ul>
        )}
      </div>

      {value.address && (
        <p className="text-xs text-muted-foreground">Adresse sélectionnée : {value.address}</p>
      )}
    </div>
  );
}

export default AddressPicker;
