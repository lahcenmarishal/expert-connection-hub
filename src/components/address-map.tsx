import { useEffect, useRef, useState } from "react";
import type * as LeafletNS from "leaflet";

export type AddressValue = {
  address: string;
  lat: number | null;
  lng: number | null;
};

const MOROCCO_CENTER: [number, number] = [31.7917, -7.0926];

/** Interactive Leaflet + OpenStreetMap picker for the client's exact address. */
export function AddressMap({
  value,
  onChange,
  center,
}: {
  value: AddressValue;
  onChange: (next: AddressValue) => void;
  center?: { lat?: number | null | undefined; lng?: number | null | undefined } | undefined;
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<LeafletNS.Map | null>(null);
  const markerRef = useRef<LeafletNS.Marker | null>(null);
  const leafletRef = useRef<typeof LeafletNS | null>(null);
  const onChangeRef = useRef(onChange);
  const [query, setQuery] = useState("");
  const [busy, setBusy] = useState(false);
  type Suggestion = { lat: string; lon: string; display_name: string };
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [openList, setOpenList] = useState(false);
  const [searching, setSearching] = useState(false);
  const skipNextFetch = useRef(false);

  onChangeRef.current = onChange;

  const reverse = async (lat: number, lng: number) => {
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&zoom=18&lat=${lat}&lon=${lng}`,
        { headers: { Accept: "application/json" } },
      );
      const json = (await res.json()) as { display_name?: string };
      return json.display_name ?? "";
    } catch {
      return "";
    }
  };

  const place = async (lat: number, lng: number, address?: string) => {
    const L = leafletRef.current;
    const map = mapRef.current;
    if (!L || !map) return;
    if (markerRef.current) markerRef.current.setLatLng([lat, lng]);
    else markerRef.current = L.marker([lat, lng], { draggable: true }).addTo(map);
    markerRef.current.off("dragend");
    markerRef.current.on("dragend", () => {
      const p = markerRef.current!.getLatLng();
      void place(p.lat, p.lng);
    });
    map.setView([lat, lng], Math.max(map.getZoom(), 15));
    const resolved = address ?? (await reverse(lat, lng));
    onChangeRef.current({ lat, lng, address: resolved });
  };

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      const L = (await import("leaflet")).default;
      if (cancelled || !containerRef.current || mapRef.current) return;
      leafletRef.current = L;
      const start: [number, number] =
        value.lat != null && value.lng != null
          ? [value.lat, value.lng]
          : center?.lat != null && center?.lng != null
            ? [center.lat, center.lng]
            : MOROCCO_CENTER;
      const map = L.map(containerRef.current).setView(start, value.lat != null ? 15 : 6);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap",
        maxZoom: 19,
      }).addTo(map);
      mapRef.current = map;
      if (value.lat != null && value.lng != null) {
        markerRef.current = L.marker([value.lat, value.lng], { draggable: true }).addTo(map);
        markerRef.current.on("dragend", () => {
          const p = markerRef.current!.getLatLng();
          void place(p.lat, p.lng);
        });
      }
      map.on("click", (e: LeafletNS.LeafletMouseEvent) => {
        void place(e.latlng.lat, e.latlng.lng);
      });
      setTimeout(() => map.invalidateSize(), 200);
    })();
    return () => {
      cancelled = true;
      mapRef.current?.remove();
      mapRef.current = null;
      markerRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Suggestions d'adresses dès 3 caractères saisis (debounce 350 ms).
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

  const pick = async (s: Suggestion) => {
    skipNextFetch.current = true;
    setQuery(s.display_name);
    setSuggestions([]);
    setOpenList(false);
    await place(Number(s.lat), Number(s.lon), s.display_name);
  };

  const search = async () => {
    if (!query.trim()) return;
    const first = suggestions[0];
    if (first) {
      await pick(first);
      return;
    }
    setBusy(true);
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&limit=1&countrycodes=ma&q=${encodeURIComponent(query)}`,
      );
      const json = (await res.json()) as Suggestion[];
      const hit = json[0];
      if (hit) await place(Number(hit.lat), Number(hit.lon), hit.display_name);
    } finally {
      setBusy(false);
    }
  };

  const locate = () => {
    if (typeof navigator === "undefined" || !navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition((pos) => {
      void place(pos.coords.latitude, pos.coords.longitude);
    });
  };

  return (
    <div className="space-y-2">
      <div className="flex flex-col gap-2 sm:flex-row">
        <div className="relative w-full">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setOpenList(suggestions.length > 0)}
            onBlur={() => setTimeout(() => setOpenList(false), 150)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                void search();
              }
              if (e.key === "Escape") setOpenList(false);
            }}
            role="combobox"
            aria-expanded={openList}
            aria-autocomplete="list"
            placeholder="Rechercher une adresse, un quartier…"
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
                      onClick={() => void pick(s)}
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
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => void search()}
            disabled={busy}
            className="rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground disabled:opacity-60"
          >
            Chercher
          </button>
          <button
            type="button"
            onClick={locate}
            className="rounded-xl border border-border px-4 py-3 text-sm font-semibold"
          >
            Ma position
          </button>
        </div>
      </div>
      <div
        ref={containerRef}
        className="h-64 w-full overflow-hidden rounded-2xl border border-border"
        aria-label="Carte pour sélectionner votre adresse exacte"
      />
      <p className="text-xs text-muted-foreground">
        {value.address
          ? `Adresse sélectionnée : ${value.address}`
          : "Cliquez sur la carte pour indiquer votre adresse exacte."}
      </p>
    </div>
  );
}

export default AddressMap;
