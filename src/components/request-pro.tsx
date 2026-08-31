import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { submitDirectRequest } from "@/lib/marketplace";
import { CITIES } from "@/lib/cities";
import { LEVELS } from "@/lib/catalog";
import { cyclesOf } from "@/lib/marketplace";
import { CitySelect } from "@/components/city-select";
import { AddressPicker, type AddressValue } from "@/components/address-picker";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "@tanstack/react-router";
import {
  resolveStudentNeed,
  savePendingProTarget,
  sendNeedToProfessional,
} from "@/lib/student-need";

type Mode = "home" | "studio" | "online";

const MODES: Array<{ value: Mode; label: string }> = [
  { value: "home", label: "🏠 À domicile" },
  { value: "studio", label: "👨‍🏫 Chez le professeur" },
  { value: "online", label: "💻 En ligne" },
];

export type RequestProTarget = {
  id: string;
  category_id: string;
  city_id?: string | null | undefined;
  phone?: string | null | undefined;
  email?: string | null | undefined;
  user_id?: string | null | undefined;
};

/**
 * Bouton « Demander ce professeur ».
 * - Client connecté : envoi automatique avec ses informations, puis coordonnées affichées.
 * - Visiteur : choix entre créer un compte ou envoyer une demande rapide (formulaire simplifié).
 */
export function RequestProButton({
  pro,
  className = "",
  label = "Demander ce professeur",
}: {
  pro: RequestProTarget;
  className?: string;
  label?: string;
}) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState<"idle" | "choice" | "form" | "done">("idle");
  const [sending, setSending] = useState(false);
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [cityId, setCityId] = useState(pro.city_id ?? "");
  const [mode, setMode] = useState<Mode>("home");
  const [address, setAddress] = useState<AddressValue>({ address: "", lat: null, lng: null });
  const [cycle, setCycle] = useState("");
  const [levelId, setLevelId] = useState("");

  const cycles = cyclesOf(LEVELS);
  const levelsForCycle = cycle ? LEVELS.filter((l) => l.cycle === cycle) : [];

  /**
   * Client connecté : la demande part directement avec ses informations de
   * compte et le besoin exprimé à l'inscription — aucun formulaire.
   */
  async function sendAsClient() {
    if (!user) return;
    setSending(true);
    try {
      const need = await resolveStudentNeed(user.id);
      if (!need) {
        savePendingProTarget({ id: pro.id, category_id: pro.category_id });
        toast.message("Complétez votre besoin une seule fois pour envoyer vos demandes en un clic.");
        navigate({ to: "/mon-besoin" });
        return;
      }
      await sendNeedToProfessional(user.id, { id: pro.id, category_id: pro.category_id }, need);
      toast.success("Demande envoyée au professeur");
      setStep("done");
    } catch {
      toast.error("Envoi impossible pour le moment");
    } finally {
      setSending(false);
    }
  }

  /** Ouvre le formulaire en pré-remplissant les infos du compte connecté. */
  async function openForm() {
    setStep("form");
    if (!user) return;
    const { data: profile } = await supabase
      .from("profiles")
      .select("full_name, phone, city")
      .eq("id", user.id)
      .maybeSingle();
    setFullName(
      profile?.full_name || (user.user_metadata?.["full_name"] as string | undefined) || "",
    );
    setPhone(profile?.phone ?? "");
    const cityMatch = CITIES.find(
      (c) => c.name.toLowerCase() === (profile?.city ?? "").toLowerCase(),
    );
    if (cityMatch) setCityId(cityMatch.id);
  }

  async function sendQuick(e: React.FormEvent) {
    e.preventDefault();
    if (!fullName.trim() || !phone.trim()) {
      toast.error("Nom et téléphone sont obligatoires");
      return;
    }
    setSending(true);
    try {
      const city = CITIES.find((c) => c.id === cityId);
      await submitDirectRequest({
        professionalId: pro.id,
        categoryId: pro.category_id,
        clientId: user?.id ?? null,
        service_id: null,
        level_id: levelId || null,
        city_id: cityId || null,
        mode,
        budget_min: null,
        budget_max: null,
        slots: [],
        description: null,
        area: address.address || (city?.name ?? null),
        lat: address.lat,
        lng: address.lng,
        contact: {
          full_name: fullName.trim(),
          email: user?.email ?? "",
          phone: phone.trim(),
        },
      });
      toast.success("Demande envoyée au professeur");
      setStep("done");
    } catch {
      toast.error("Envoi impossible pour le moment");
    } finally {
      setSending(false);
    }
  }

  const field =
    "w-full rounded-xl border border-border bg-muted px-4 py-3 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/20";
  const labelClass = "text-xs font-semibold uppercase tracking-wider text-muted-foreground";

  // Un professeur ne peut pas s'envoyer une demande à lui-même
  const isOwnProfile = Boolean(user && pro.user_id && user.id === pro.user_id);

  const overlay = (content: React.ReactNode) => (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-foreground/40 p-0 sm:items-center sm:p-4">
      <div className="max-h-[90vh] w-full max-w-md overflow-y-auto rounded-t-3xl border border-border bg-card p-5 text-card-foreground shadow-panel sm:rounded-3xl">
        <div className="mb-3 flex justify-end">
          <button
            type="button"
            onClick={() => setStep("idle")}
            aria-label="Fermer"
            className="rounded-full px-2 py-1 text-lg leading-none text-muted-foreground hover:bg-muted"
          >
            ×
          </button>
        </div>
        {content}
      </div>
    </div>
  );

  return (
    <>
      {step === "done" ? (
        <div className={className}>
          <p className="rounded-xl border border-primary/30 bg-primary/5 px-4 py-3 text-center text-xs font-semibold">
            Demande envoyée. Le professeur vous contactera directement.
          </p>
        </div>
      ) : isOwnProfile ? (
        <p className="rounded-xl border border-border bg-muted px-4 py-3 text-center text-xs font-semibold text-muted-foreground">
          C'est votre profil professeur.
        </p>
      ) : (
        <button
          type="button"
          disabled={sending}
          onClick={() => (user ? void sendAsClient() : setStep("choice"))}
          className={
            className ||
            "w-full rounded-xl bg-primary px-4 py-3 text-sm font-bold text-primary-foreground hover:opacity-90"
          }
        >
          {sending ? "Envoi…" : label}
        </button>
      )}

      {step === "choice" &&
        overlay(
          <div>
            <p className="text-base font-extrabold text-foreground">
              Comment souhaitez-vous continuer ?
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Créez un compte ou envoyez une demande rapide en 30 secondes.
            </p>
            <div className="mt-4 grid gap-3">
              <Link
                to="/auth"
                search={{ mode: "signup", role: "client" }}
                onClick={() => savePendingProTarget({ id: pro.id, category_id: pro.category_id })}
                className="rounded-xl bg-primary px-4 py-3 text-center text-sm font-bold text-primary-foreground hover:opacity-90"
              >
                Créer un compte élève / parent
              </Link>
              <button
                type="button"
                onClick={() => setStep("form")}
                className="rounded-xl border-2 border-border bg-background px-4 py-3 text-sm font-bold text-foreground hover:border-primary hover:bg-muted"
              >
                Envoyer une demande rapide
              </button>
            </div>
          </div>,
        )}

      {step === "form" &&
        overlay(
          <form onSubmit={sendQuick} className="space-y-4">
            <div>
              <p className="text-base font-extrabold text-foreground">Demande rapide</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Le professeur reçoit votre demande immédiatement.
              </p>
            </div>

            <div className="space-y-1">
              <label className={labelClass} htmlFor="rp-name">
                Nom complet
              </label>
              <input
                id="rp-name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                maxLength={100}
                required
                placeholder="Votre nom et prénom"
                className={field}
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1">
                <label className={labelClass} htmlFor="rp-cycle">
                  Niveau
                </label>
                <select
                  id="rp-cycle"
                  value={cycle}
                  onChange={(e) => {
                    setCycle(e.target.value);
                    setLevelId("");
                  }}
                  className={field}
                >
                  <option value="">Choisir un niveau</option>
                  {cycles.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-1">
                <label className={labelClass} htmlFor="rp-level">
                  Classe
                </label>
                <select
                  id="rp-level"
                  value={levelId}
                  onChange={(e) => setLevelId(e.target.value)}
                  disabled={!cycle}
                  className={field}
                >
                  <option value="">{cycle ? "Choisir une classe" : "Niveau d'abord"}</option>
                  {levelsForCycle.map((l) => (
                    <option key={l.id} value={l.id}>
                      {l.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-1">
              <label className={labelClass} htmlFor="rp-phone">
                Téléphone
              </label>
              <input
                id="rp-phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                type="tel"
                maxLength={30}
                required
                placeholder="06 12 34 56 78"
                className={field}
              />
            </div>

            <div className="space-y-1">
              <label className={labelClass} htmlFor="rp-mode">
                Type de cours
              </label>
              <select
                id="rp-mode"
                value={mode}
                onChange={(e) => {
                  const next = e.target.value as Mode;
                  setMode(next);
                  if (next === "online") {
                    setCityId("");
                    setAddress({ address: "", lat: null, lng: null });
                  }
                }}
                className={field}
              >
                {MODES.map((m) => (
                  <option key={m.value} value={m.value}>
                    {m.label}
                  </option>
                ))}
              </select>
            </div>

            {mode !== "online" && (
              <div className="space-y-1">
                <label className={labelClass} htmlFor="rp-city">
                  Où ?
                </label>
                <CitySelect
                  id="rp-city"
                  cities={CITIES.map((c) => ({ id: c.id, name: c.name }))}
                  value={cityId}
                  onChange={setCityId}
                  className={field}
                />
              </div>
            )}

            {mode === "home" && (
              <div className="space-y-1">
                <span className={labelClass}>Votre adresse exacte</span>
                <AddressPicker value={address} onChange={setAddress} />
              </div>
            )}

            <button
              type="submit"
              disabled={sending}
              className="w-full rounded-xl bg-primary px-4 py-3 text-sm font-bold text-primary-foreground hover:opacity-90 disabled:opacity-60"
            >
              {sending ? "Envoi…" : "Envoyer ma demande"}
            </button>
          </form>,
        )}
    </>
  );
}

