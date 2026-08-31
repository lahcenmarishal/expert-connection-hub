import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Check, Trash2 } from "lucide-react";
import { MobileTabBar, SiteFooter, SiteHeader } from "@/components/site";
import { CitySelect } from "@/components/city-select";
import { OnboardingProgress } from "@/components/onboarding-progress";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { MODE_LABELS, WEEKDAYS, cyclesOf, fetchReferenceData, formatSlot } from "@/lib/marketplace";
import { SUPERIOR_BRANCHES, branchOfSpecialty } from "@/lib/branches";

import {
  ALLOWED_DOC_EXTENSIONS,
  DOCUMENT_KINDS,
  MAX_DOC_SIZE_MB,
  MAX_PHOTO_SIZE_MB,
  ONBOARDING_STEPS,
  completionOf,
  timeToMinutes,
} from "@/lib/teacher-onboarding";

export const Route = createFileRoute("/_authenticated/pro/inscription")({
  head: () => ({
    meta: [
      { title: "Inscription professeur en 10 étapes — ProFinder" },
      {
        name: "description",
        content:
          "Complétez votre profil professeur ProFinder : informations, matières, niveaux, tarifs, disponibilités, qualifications et documents de vérification.",
      },
      { property: "og:title", content: "Inscription professeur — ProFinder" },
      {
        property: "og:description",
        content: "Parcours guidé pour devenir professeur vérifié sur ProFinder.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ProOnboarding,
});

const input =
  "mt-1 w-full rounded-xl border border-border bg-muted px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/20";
const label = "text-sm font-medium";
const chip = (active: boolean) =>
  active
    ? "rounded-full bg-primary px-3 py-1 text-xs font-bold text-primary-foreground"
    : "rounded-full bg-muted px-3 py-1 text-xs";

function ProOnboarding() {
  const { user } = useAuth();
  const qc = useQueryClient();
  const navigate = useNavigate();
  const emailVerified = !!user?.email_confirmed_at;

  const ref = useQuery({ queryKey: ["reference"], queryFn: fetchReferenceData });

  const me = useQuery({
    queryKey: ["my-pro", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("professionals")
        .select("*, professional_services(service_id), professional_levels(level_id)")
        .eq("user_id", user!.id)
        .maybeSingle();
      if (error) throw error;
      return data;
    },
  });
  const pro = me.data;

  const availability = useQuery({
    queryKey: ["my-availability", pro?.id],
    enabled: !!pro?.id,
    queryFn: async () => {
      const { data } = await supabase
        .from("professional_availability")
        .select("*")
        .eq("professional_id", pro!.id)
        .order("weekday");
      return data ?? [];
    },
  });

  const documents = useQuery({
    queryKey: ["my-documents", pro?.id],
    enabled: !!pro?.id,
    queryFn: async () => {
      const { data } = await supabase
        .from("verification_documents")
        .select("*")
        .eq("professional_id", pro!.id)
        .order("created_at", { ascending: false });
      return data ?? [];
    },
  });

  const [step, setStep] = useState(1);
  const [busy, setBusy] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    phone: "",
    city_id: "",
    area: "",
    bio: "",
    photo_url: "",
    levels: [] as string[],
    services: [] as string[],
    modes: ["home", "online"] as string[],
    radius_km: "10",
    hourly_rate: "150",
    experience_years: "3",
    diplomas: "",
    institutions: "",
    specialty: "",
    certifications: "",
    experience_description: "",
  });
  const [slotDraft, setSlotDraft] = useState({ weekday: "1", start: "16:00", end: "20:00" });
  const [docKind, setDocKind] = useState<string>(DOCUMENT_KINDS[0].value);

  // Reprise automatique : on charge les données déjà enregistrées.
  useEffect(() => {
    if (hydrated || !pro) return;
    const meta = user?.user_metadata ?? {};
    setForm((f) => ({
      ...f,
      first_name: pro.first_name ?? (meta['first_name'] as string) ?? "",
      last_name: pro.last_name ?? (meta['last_name'] as string) ?? "",
      phone: pro.phone ?? (meta['phone'] as string) ?? "",
      city_id: pro.city_id ?? "",
      area: pro.area ?? "",
      bio: pro.bio ?? "",
      photo_url: pro.photo_url ?? "",
      levels: (pro.professional_levels as { level_id: string }[]).map((l) => l.level_id),
      services: (pro.professional_services as { service_id: string }[]).map((s) => s.service_id),
      modes: [
        pro.mode_home ? "home" : null,
        pro.mode_studio ? "studio" : null,
        pro.mode_online ? "online" : null,
      ].filter((m): m is string => m !== null),
      radius_km: String(pro.radius_km ?? 10),
      hourly_rate: String(Number(pro.hourly_rate ?? 150)),
      experience_years: String(pro.experience_years ?? 0),
      diplomas: pro.diplomas ?? "",
      institutions: pro.institutions ?? "",
      specialty: pro.specialty ?? "",
      certifications: pro.certifications ?? "",
      experience_description: pro.experience_description ?? "",
    }));
    setStep(Math.min(Math.max(pro.onboarding_step ?? 1, 1), ONBOARDING_STEPS.length));
    setHydrated(true);
  }, [pro, user, hydrated]);

  useEffect(() => {
    if (!pro && me.isSuccess && !hydrated) {
      const meta = user?.user_metadata ?? {};
      setForm((f) => ({
        ...f,
        first_name: (meta['first_name'] as string) ?? "",
        last_name: (meta['last_name'] as string) ?? "",
        phone: (meta['phone'] as string) ?? "",
      }));
      setStep(emailVerified ? 2 : 1);
      setHydrated(true);
    }
  }, [pro, me.isSuccess, hydrated, user, emailVerified]);

  const done = completionOf({
    emailVerified,
    pro: pro
      ? { ...pro, phone: form.phone || pro.phone }
      : null,
    serviceCount: form.services.length,
    levelCount: form.levels.length,
    slotCount: availability.data?.length ?? 0,
    documentCount: documents.data?.length ?? 0,
  });

  /** Enregistre le profil (création si nécessaire) et renvoie son identifiant. */
  const persist = async (patch: Record<string, unknown>, nextStep?: number) => {
    if (!user) return null;
    const categoryId = pro?.category_id ?? ref.data?.categories[0]?.id;
    if (!categoryId) {
      toast.error("Catalogue indisponible, réessayez.");
      return null;
    }
    const displayName =
      `${form.first_name} ${form.last_name}`.trim() || pro?.display_name || user.email || "Professeur";
    const payload = {
      user_id: user.id,
      category_id: categoryId,
      display_name: displayName,
      ...(nextStep ? { onboarding_step: nextStep } : {}),
      ...patch,
    };
    const { data, error } = pro
      ? await supabase
          .from("professionals")
          .update(payload)
          .eq("id", pro.id)
          .select("id")
          .maybeSingle()
      : await supabase.from("professionals").insert(payload).select("id").maybeSingle();
    if (error || !data) {
      toast.error(error?.message ?? "Enregistrement impossible.");
      return null;
    }
    await qc.invalidateQueries({ queryKey: ["my-pro", user.id] });
    return data.id;
  };

  const saveRelations = async (proId: string) => {
    const validLevelIds = new Set(levels.map((l) => l.id));
    const validServiceIds = new Set(services.map((s) => s.id));
    const levelRows = form.levels
      .filter((level_id) => validLevelIds.has(level_id))
      .map((level_id) => ({ professional_id: proId, level_id }));
    const serviceRows = form.services
      .filter((service_id) => validServiceIds.has(service_id))
      .map((service_id) => ({ professional_id: proId, service_id }));

    await supabase.from("professional_levels").delete().eq("professional_id", proId);
    await supabase.from("professional_services").delete().eq("professional_id", proId);
    if (levelRows.length) {
      const { error } = await supabase.from("professional_levels").insert(levelRows);
      if (error) throw new Error(`Classes non enregistrées : ${error.message}`);
    }
    if (serviceRows.length) {
      const { error } = await supabase.from("professional_services").insert(serviceRows);
      if (error) throw new Error(`Matières non enregistrées : ${error.message}`);
    }
  };

  const toggle = (key: "levels" | "services" | "modes", value: string) =>
    setForm((f) => ({
      ...f,
      [key]: f[key].includes(value) ? f[key].filter((v) => v !== value) : [...f[key], value],
    }));

  const serviceBelongsToLevel = (serviceId: string, levelId: string) => {
    const service = services.find((s) => s.id === serviceId);
    if (!service) return false;
    return (
      service.level_id === levelId ||
      specialties.some((sp) => sp.id === service.specialty_id && sp.level_id === levelId)
    );
  };

  const toggleLevel = (levelId: string) =>
    setForm((f) => {
      const active = f.levels.includes(levelId);
      return {
        ...f,
        levels: active ? f.levels.filter((id) => id !== levelId) : [...f.levels, levelId],
        services: active ? f.services.filter((id) => !serviceBelongsToLevel(id, levelId)) : f.services,
      };
    });

  const servicesForLevel = (levelId: string) =>
    services.filter(
      (s) =>
        s.level_id === levelId ||
        specialties.some((sp) => sp.id === s.specialty_id && sp.level_id === levelId),
    );

  const toggleAllLevelsForCycle = (cycle: string) => {
    const ids = levels.filter((l) => l.cycle === cycle).map((l) => l.id);
    setForm((f) => {
      const allSelected = ids.every((id) => f.levels.includes(id));
      return {
        ...f,
        levels: allSelected
          ? f.levels.filter((id) => !ids.includes(id))
          : Array.from(new Set([...f.levels, ...ids])),
        services: allSelected
          ? f.services.filter((serviceId) => !ids.some((levelId) => serviceBelongsToLevel(serviceId, levelId)))
          : f.services,
      };
    });
  };

  const toggleAllServicesForLevel = (levelId: string) => {
    const ids = servicesForLevel(levelId).map((s) => s.id);
    setForm((f) => {
      const allSelected = ids.length > 0 && ids.every((id) => f.services.includes(id));
      return {
        ...f,
        services: allSelected
          ? f.services.filter((id) => !ids.includes(id))
          : Array.from(new Set([...f.services, ...ids])),
      };
    });
  };

  const cycleLevelIds = (cycle: string) =>
    levels.filter((l) => l.cycle === cycle).map((l) => l.id);

  const servicesForCycle = (cycle: string) => {
    const levelIds = cycleLevelIds(cycle);
    const ids = new Set<string>();
    for (const levelId of levelIds) for (const s of servicesForLevel(levelId)) ids.add(s.id);
    return [...ids];
  };

  const allServicesSelectedForCycle = (cycle: string) => {
    const ids = servicesForCycle(cycle);
    return ids.length > 0 && ids.every((id) => form.services.includes(id));
  };

  /** Sélectionne (ou retire) tout un cycle : toutes ses classes et toutes leurs matières. */
  const toggleAllServicesForCycle = (cycle: string) => {
    const levelIds = cycleLevelIds(cycle);
    const serviceIds = servicesForCycle(cycle);
    const allSelected = allServicesSelectedForCycle(cycle);
    setForm((f) => ({
      ...f,
      levels: allSelected
        ? f.levels.filter((id) => !levelIds.includes(id))
        : Array.from(new Set([...f.levels, ...levelIds])),
      services: allSelected
        ? f.services.filter((id) => !serviceIds.includes(id))
        : Array.from(new Set([...f.services, ...serviceIds])),
    }));
  };

  const goNext = async () => {
    setBusy(true);
    try {
      const next = Math.min(step + 1, ONBOARDING_STEPS.length);
      if (step === 1) {
        if (!emailVerified) {
          toast.error("Confirmez d'abord votre adresse email.");
          return;
        }
        await persist({}, next);
      } else if (step === 2) {
        if (!form.first_name.trim() || !form.last_name.trim() || !form.phone.trim() || !form.city_id) {
          toast.error("Prénom, nom, téléphone et ville sont obligatoires.");
          return;
        }
        await persist(
          {
            first_name: form.first_name,
            last_name: form.last_name,
            phone: form.phone,
            city_id: form.city_id,
            area: form.area,
            bio: form.bio,
            photo_url: form.photo_url || null,
          },
          next,
        );
      } else if (step === 3) {
        if (form.levels.length === 0) {
          toast.error("Sélectionnez au moins une classe.");
          return;
        }
        if (form.services.length === 0) {
          toast.error("Sélectionnez au moins une matière.");
          return;
        }
        const id = await persist({}, next);
        if (id) await saveRelations(id);
      } else if (step === 4) {
        if (form.modes.length === 0) {
          toast.error("Choisissez au moins un type de cours.");
          return;
        }
        if (Number(form.hourly_rate) <= 0) {
          toast.error("Indiquez un tarif horaire valide.");
          return;
        }
        if ((availability.data?.length ?? 0) === 0) {
          toast.error("Ajoutez au moins un créneau de disponibilité.");
          return;
        }
        await persist(
          {
            mode_home: form.modes.includes("home"),
            mode_studio: form.modes.includes("studio"),
            mode_online: form.modes.includes("online"),
            radius_km: Number(form.radius_km) || 10,
            area: form.area,
            hourly_rate: Number(form.hourly_rate),
          },
          next,
        );
      } else {
        await persist(
          {
            experience_years: Number(form.experience_years) || 0,
            diplomas: form.diplomas,
            institutions: form.institutions,
            specialty: form.specialty,
            certifications: form.certifications,
            experience_description: form.experience_description,
          },
          next,
        );
      }

      setStep(next);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Enregistrement impossible.");
    } finally {
      setBusy(false);
    }
  };

  const addSlot = async () => {
    const id = pro?.id ?? (await persist({}));
    if (!id) return;
    const start = timeToMinutes(slotDraft.start);
    const end = timeToMinutes(slotDraft.end);
    if (end <= start) {
      toast.error("L'heure de fin doit être après l'heure de début.");
      return;
    }
    const { error } = await supabase.from("professional_availability").insert({
      professional_id: id,
      weekday: Number(slotDraft.weekday),
      start_min: start,
      end_min: end,
    });
    if (error) {
      toast.error(error.message);
      return;
    }
    qc.invalidateQueries({ queryKey: ["my-availability", id] });
  };

  const removeSlot = async (slotId: string) => {
    await supabase.from("professional_availability").delete().eq("id", slotId);
    qc.invalidateQueries({ queryKey: ["my-availability", pro?.id] });
  };

  const uploadPhoto = async (file: File) => {
    if (!user) return;
    if (file.size > MAX_PHOTO_SIZE_MB * 1024 * 1024) {
      toast.error(`Photo trop lourde (max ${MAX_PHOTO_SIZE_MB} Mo).`);
      return;
    }
    const ext = (file.name.split(".").pop() ?? "").toLowerCase();
    if (!["jpg", "jpeg", "png", "webp"].includes(ext)) {
      toast.error("Formats acceptés : JPG, PNG, WEBP.");
      return;
    }
    const path = `${user.id}/avatar-${Date.now()}.${ext}`;
    const up = await supabase.storage.from("avatars").upload(path, file, { upsert: true });
    if (up.error) {
      toast.error(up.error.message);
      return;
    }
    const signed = await supabase.storage.from("avatars").createSignedUrl(path, 60 * 60 * 24 * 365);
    const url = signed.data?.signedUrl ?? "";
    setForm((f) => ({ ...f, photo_url: url }));
    toast.success("Photo ajoutée.");
  };

  const uploadDocument = async (file: File) => {
    if (!user) return;
    const id = pro?.id ?? (await persist({}));
    if (!id) return;
    if (file.size > MAX_DOC_SIZE_MB * 1024 * 1024) {
      toast.error(`Document trop lourd (max ${MAX_DOC_SIZE_MB} Mo).`);
      return;
    }
    const ext = (file.name.split(".").pop() ?? "").toLowerCase();
    if (!ALLOWED_DOC_EXTENSIONS.includes(ext)) {
      toast.error(`Formats acceptés : ${ALLOWED_DOC_EXTENSIONS.join(", ").toUpperCase()}.`);
      return;
    }
    const path = `${user.id}/${id}/${docKind}-${Date.now()}.${ext}`;
    const up = await supabase.storage.from("verification-docs").upload(path, file);
    if (up.error) {
      toast.error(up.error.message);
      return;
    }
    const { error } = await supabase.from("verification_documents").insert({
      professional_id: id,
      kind: docKind,
      file_path: path,
      status: "pending",
    });
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Document envoyé.");
    qc.invalidateQueries({ queryKey: ["my-documents", id] });
  };

  const removeDocument = async (docId: string, path: string) => {
    await supabase.storage.from("verification-docs").remove([path]);
    await supabase.from("verification_documents").delete().eq("id", docId);
    qc.invalidateQueries({ queryKey: ["my-documents", pro?.id] });
  };

  const submitDossier = async () => {
    if (!pro) return;
    if ((documents.data?.length ?? 0) === 0) {
      toast.error("Ajoutez au moins un document avant l'envoi.");
      return;
    }
    setBusy(true);
    try {
      const { error: reqError } = await supabase
        .from("verification_requests")
        .insert({ professional_id: pro.id, status: "pending" });
      if (reqError) {
        toast.error(reqError.message);
        return;
      }
      const { error } = await supabase
        .from("professionals")
        .update({
          verification_status: "pending",
          onboarding_completed: true,
          onboarding_step: ONBOARDING_STEPS.length,
          experience_years: Number(form.experience_years) || 0,
          diplomas: form.diplomas,
          institutions: form.institutions,
          specialty: form.specialty,
          certifications: form.certifications,
          experience_description: form.experience_description,
        })
        .eq("id", pro.id);
      if (error) {
        toast.error(error.message);
        return;
      }
      toast.success("Dossier envoyé pour vérification.");
      await qc.invalidateQueries();
      navigate({ to: "/pro" });
    } finally {
      setBusy(false);
    }
  };

  const cities = ref.data?.cities ?? [];
  const levels = ref.data?.levels ?? [];
  const services = ref.data?.services ?? [];
  const specialties = ref.data?.specialties ?? [];
  const selectedLevels = levels.filter((l) => form.levels.includes(l.id));

  // Matières disponibles pour les niveaux choisis, regroupées par nom (ex. « Mathématiques »).
  const groupByName = (levelList: typeof selectedLevels) => {
    const map = new Map<string, string[]>();
    for (const l of levelList) {
      for (const s of servicesForLevel(l.id)) {
        map.set(s.name, [...(map.get(s.name) ?? []), s.id]);
      }
    }
    return Array.from(map.entries())
      .map(([name, ids]) => ({ name, ids }))
      .sort((a, b) => a.name.localeCompare(b.name, "fr"));
  };

  const schoolLevels = selectedLevels.filter((l) => l.cycle !== "Supérieur");
  const superiorLevels = selectedLevels.filter((l) => l.cycle === "Supérieur");
  const subjectGroups = groupByName(schoolLevels);

  // Cycle supérieur : toutes les matières sont classées dans les 9 grandes branches.
  const branchGroups: Array<{ branch: string; subjects: Array<{ name: string; ids: string[] }> }> =
    (() => {
      const map = new Map<string, Map<string, string[]>>();
      for (const branch of SUPERIOR_BRANCHES) map.set(branch.name, new Map());
      for (const l of superiorLevels) {
        for (const s of servicesForLevel(l.id)) {
          const specialty = specialties.find((sp) => sp.id === s.specialty_id);
          const branch = branchOfSpecialty(specialty?.name);
          const subjects = map.get(branch)!;
          subjects.set(s.name, [...(subjects.get(s.name) ?? []), s.id]);
        }
      }
      return SUPERIOR_BRANCHES.map((b) => ({
        branch: b.name,
        subjects: Array.from(map.get(b.name)!.entries())
          .map(([name, ids]) => ({ name, ids }))
          .sort((a, b2) => a.name.localeCompare(b2.name, "fr")),
      })).filter((g) => g.subjects.length > 0);
    })();

  const stepTitle = ONBOARDING_STEPS[step - 1]?.label ?? "";

  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      <SiteHeader variant="pro" />
      <main className="mx-auto max-w-3xl px-4 py-8 pb-28">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight">Mon profil</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Vos réponses sont enregistrées à chaque étape : vous pouvez quitter et reprendre plus
              tard.
            </p>
          </div>
          {pro?.id && (
            <Link
              to="/professeurs/$id"
              params={{ id: pro.id }}
              className="rounded-xl border border-border px-4 py-2 text-sm font-semibold hover:bg-muted"
            >
              Voir mon profil public
            </Link>
          )}
        </div>

        <OnboardingProgress current={step} className="mt-6" />

        <ol className="mt-4 flex flex-wrap gap-2 text-xs">
          {ONBOARDING_STEPS.map((s, i) => (
            <li key={s.key}>
              <button
                onClick={() => setStep(i + 1)}
                className={
                  i + 1 === step
                    ? "rounded-full bg-primary px-3 py-1 font-bold text-primary-foreground"
                    : done[s.key]
                      ? "rounded-full bg-primary/10 px-3 py-1 font-semibold text-primary"
                      : "rounded-full bg-muted px-3 py-1 text-muted-foreground"
                }
              >
                {done[s.key] && <Check className="mr-1 inline h-3 w-3" aria-hidden />}
                {i + 1}. {s.label}
              </button>
            </li>
          ))}
        </ol>

        <section className="mt-6 rounded-3xl border border-border bg-card p-6 shadow-panel">
          <h2 className="text-xl font-bold">
            Étape {step} — {stepTitle}
          </h2>

          {step === 1 && (
            <div className="mt-4 space-y-3 text-sm">
              <p className="text-muted-foreground">
                Votre compte a bien été créé : {user?.email}
              </p>
              <p className="rounded-xl bg-muted px-4 py-3">
                Prochaine étape : la confirmation de votre adresse email.
              </p>
            </div>
          )}

          {step === 1 && (
            <div className="mt-4 space-y-3 text-sm">
              {emailVerified ? (
                <p className="rounded-xl bg-primary/10 px-4 py-3 font-semibold text-primary">
                  ✅ Email vérifié — {user?.email}
                </p>
              ) : (
                <>
                  <p className="text-muted-foreground">
                    Votre adresse <span className="font-semibold">{user?.email}</span> n'est pas
                    encore confirmée.
                  </p>
                  <Link
                    to="/verifier-email"
                    search={{ email: user?.email ?? "" }}
                    className="inline-block rounded-xl border border-border px-4 py-2 font-semibold hover:bg-muted"
                  >
                    Renvoyer l'email de vérification
                  </Link>
                </>
              )}
            </div>
          )}

          {step === 2 && (
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <span className={label}>Photo de profil (facultative, fortement recommandée)</span>
                <div className="mt-2 flex items-center gap-4">
                  {form.photo_url ? (
                    <img
                      src={form.photo_url}
                      alt="Aperçu de votre photo de profil"
                      className="h-16 w-16 rounded-full object-cover"
                    />
                  ) : (
                    <div className="h-16 w-16 rounded-full bg-muted" />
                  )}
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) void uploadPhoto(file);
                    }}
                    className="text-sm"
                  />
                </div>
              </div>
              <label className={label}>
                Prénom
                <input
                  value={form.first_name}
                  onChange={(e) => setForm({ ...form, first_name: e.target.value })}
                  maxLength={80}
                  className={input}
                />
              </label>
              <label className={label}>
                Nom
                <input
                  value={form.last_name}
                  onChange={(e) => setForm({ ...form, last_name: e.target.value })}
                  maxLength={80}
                  className={input}
                />
              </label>
              <label className={label}>
                Téléphone
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  maxLength={30}
                  className={input}
                />
              </label>
              <div className={label}>
                Ville
                <div className="mt-1">
                  <CitySelect
                    cities={cities}
                    value={form.city_id}
                    onChange={(id) => setForm({ ...form, city_id: id })}
                    className="w-full rounded-xl border border-border bg-muted px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              </div>
              <label className={label}>
                Quartier
                <input
                  value={form.area}
                  onChange={(e) => setForm({ ...form, area: e.target.value })}
                  maxLength={120}
                  className={input}
                />
              </label>
              <label className={`${label} sm:col-span-2`}>
                Présentation personnelle
                <textarea
                  value={form.bio}
                  onChange={(e) => setForm({ ...form, bio: e.target.value })}
                  maxLength={2000}
                  className={`${input} h-28`}
                />
              </label>
            </div>
          )}

          {step === 3 && (
            <div className="mt-4 space-y-5">
              <p className="text-sm text-muted-foreground">
                Choisissez les niveaux que vous enseignez (ex. primaire, collège), puis vos
                matières (ex. mathématiques).
              </p>

              <div>
                <p className="text-sm font-semibold">Niveaux</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {cyclesOf(levels).map((cycle) => {
                    const cycleLevels = levels.filter((l) => l.cycle === cycle);
                    const active = cycleLevels.every((l) => form.levels.includes(l.id));
                    return (
                      <button
                        key={cycle}
                        onClick={() => toggleAllLevelsForCycle(cycle)}
                        className={chip(active)}
                      >
                        {cycle}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <p className="text-sm font-semibold">Matières</p>
                {selectedLevels.length === 0 ? (
                  <p className="mt-2 text-xs text-muted-foreground">
                    Choisissez d'abord un ou plusieurs niveaux.
                  </p>
                ) : (
                  <div className="mt-2 space-y-4">
                    {branchGroups.map((bg) => (
                      <div key={bg.branch}>
                        <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                          {bg.branch}
                        </p>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {bg.subjects.map((group) => {
                            const active = group.ids.every((id) => form.services.includes(id));
                            return (
                              <button
                                key={`${bg.branch}-${group.name}`}
                                onClick={() =>
                                  setForm((f) => ({
                                    ...f,
                                    services: active
                                      ? f.services.filter((id) => !group.ids.includes(id))
                                      : Array.from(new Set([...f.services, ...group.ids])),
                                  }))
                                }
                                className={chip(active)}
                              >
                                {group.name}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  <div className="flex flex-wrap gap-2">
                    {subjectGroups.map((group) => {
                      const active = group.ids.every((id) => form.services.includes(id));
                      return (
                        <button
                          key={group.name}
                          onClick={() =>
                            setForm((f) => ({
                              ...f,
                              services: active
                                ? f.services.filter((id) => !group.ids.includes(id))
                                : Array.from(new Set([...f.services, ...group.ids])),
                            }))
                          }
                          className={chip(active)}
                        >
                          {group.name}
                        </button>
                      );
                    })}
                  </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="mt-4 space-y-4">
              <div className="flex flex-wrap gap-2">
                {Object.entries(MODE_LABELS).map(([code, text]) => (
                  <button
                    key={code}
                    onClick={() => toggle("modes", code)}
                    className={chip(form.modes.includes(code))}
                  >
                    {text}
                  </button>
                ))}
              </div>
              {form.modes.includes("home") && (
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className={label}>
                    Ville desservie
                    <div className="mt-1">
                      <CitySelect
                        cities={cities}
                        value={form.city_id}
                        onChange={(id) => setForm({ ...form, city_id: id })}
                        className="w-full rounded-xl border border-border bg-muted px-3 py-2 text-sm"
                      />
                    </div>
                  </div>
                  <label className={label}>
                    Quartiers desservis
                    <input
                      value={form.area}
                      onChange={(e) => setForm({ ...form, area: e.target.value })}
                      placeholder="Maârif, Gauthier…"
                      className={input}
                    />
                  </label>
                </div>
              )}
              {form.modes.includes("online") && (
                <p className="rounded-xl bg-primary/10 px-4 py-3 text-sm font-semibold text-primary">
                  Cours en ligne disponible
                </p>
              )}
            </div>
          )}

          {step === 4 && (
            <div className="mt-4 space-y-3">
              <label className={label}>
                Tarif horaire (DH / heure)
                <input
                  type="number"
                  min={0}
                  value={form.hourly_rate}
                  onChange={(e) => setForm({ ...form, hourly_rate: e.target.value })}
                  className={input}
                />
              </label>
              <p className="text-xs text-muted-foreground">
                Ce tarif est modifiable à tout moment depuis votre espace professeur. Des tarifs
                différenciés par matière, niveau ou type de cours pourront être ajoutés plus tard.
              </p>
            </div>
          )}

          {step === 4 && (
            <div className="mt-4 space-y-4">
              <div className="flex flex-wrap gap-2">
                {(availability.data ?? []).map((s) => (
                  <span
                    key={s.id}
                    className="inline-flex items-center gap-2 rounded-full bg-muted px-3 py-1 text-xs"
                  >
                    {formatSlot({ weekday: s.weekday, start_min: s.start_min, end_min: s.end_min })}
                    <button onClick={() => removeSlot(s.id)} aria-label="Supprimer le créneau">
                      <Trash2 className="h-3 w-3 text-destructive" aria-hidden />
                    </button>
                  </span>
                ))}
                {(availability.data ?? []).length === 0 && (
                  <span className="text-sm text-muted-foreground">Aucun créneau enregistré.</span>
                )}
              </div>
              <div className="flex flex-wrap items-end gap-2">
                <select
                  value={slotDraft.weekday}
                  onChange={(e) => setSlotDraft({ ...slotDraft, weekday: e.target.value })}
                  className="rounded-xl border border-border bg-muted px-3 py-2 text-sm"
                >
                  {WEEKDAYS.map((d, i) => (
                    <option key={d} value={String(i)}>
                      {d}
                    </option>
                  ))}
                </select>
                <input
                  type="time"
                  value={slotDraft.start}
                  onChange={(e) => setSlotDraft({ ...slotDraft, start: e.target.value })}
                  className="rounded-xl border border-border bg-muted px-3 py-2 text-sm"
                />
                <input
                  type="time"
                  value={slotDraft.end}
                  onChange={(e) => setSlotDraft({ ...slotDraft, end: e.target.value })}
                  className="rounded-xl border border-border bg-muted px-3 py-2 text-sm"
                />
                <button
                  onClick={addSlot}
                  className="rounded-xl bg-secondary px-4 py-2 text-sm font-semibold text-secondary-foreground"
                >
                  Ajouter le créneau
                </button>
              </div>
              <p className="text-xs text-muted-foreground">
                Les créneaux sont récurrents chaque semaine. Supprimez un créneau pour signaler une
                indisponibilité.
              </p>
            </div>
          )}

          {step === 5 && (
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <label className={label}>
                Années d'expérience
                <input
                  type="number"
                  min={0}
                  max={60}
                  value={form.experience_years}
                  onChange={(e) => setForm({ ...form, experience_years: e.target.value })}
                  className={input}
                />
              </label>
              <label className={label}>
                Spécialité
                <input
                  value={form.specialty}
                  onChange={(e) => setForm({ ...form, specialty: e.target.value })}
                  maxLength={160}
                  className={input}
                />
              </label>
              <label className={label}>
                Diplôme(s)
                <input
                  value={form.diplomas}
                  onChange={(e) => setForm({ ...form, diplomas: e.target.value })}
                  maxLength={300}
                  className={input}
                />
              </label>
              <label className={label}>
                Établissement(s)
                <input
                  value={form.institutions}
                  onChange={(e) => setForm({ ...form, institutions: e.target.value })}
                  maxLength={300}
                  className={input}
                />
              </label>
              <label className={`${label} sm:col-span-2`}>
                Certifications
                <input
                  value={form.certifications}
                  onChange={(e) => setForm({ ...form, certifications: e.target.value })}
                  maxLength={300}
                  className={input}
                />
              </label>
              <label className={`${label} sm:col-span-2`}>
                Description de l'expérience d'enseignement
                <textarea
                  value={form.experience_description}
                  onChange={(e) => setForm({ ...form, experience_description: e.target.value })}
                  maxLength={2000}
                  className={`${input} h-28`}
                />
              </label>
            </div>
          )}

          {step === 5 && (
            <div className="mt-4 space-y-4">
              <h3 className="text-base font-bold">Vérifiez votre profil professionnel</h3>
              <p className="text-sm text-muted-foreground">
                Envoyez vos justificatifs (PDF ou image, {MAX_DOC_SIZE_MB} Mo maximum). Vos documents
                restent privés : seuls vous et les administrateurs habilités y ont accès.
              </p>
              <div className="flex flex-wrap items-center gap-2">
                <select
                  value={docKind}
                  onChange={(e) => setDocKind(e.target.value)}
                  className="rounded-xl border border-border bg-muted px-3 py-2 text-sm"
                >
                  {DOCUMENT_KINDS.map((k) => (
                    <option key={k.value} value={k.value}>
                      {k.label}
                    </option>
                  ))}
                </select>
                <input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png,.webp"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) void uploadDocument(file);
                    e.target.value = "";
                  }}
                  className="text-sm"
                />
              </div>

              <ul className="space-y-2 text-sm">
                {(documents.data ?? []).map((d) => (
                  <li
                    key={d.id}
                    className="flex items-center justify-between rounded-xl bg-muted px-4 py-2"
                  >
                    <span>
                      {DOCUMENT_KINDS.find((k) => k.value === d.kind)?.label ?? d.kind} ·{" "}
                      <span className="text-xs text-muted-foreground">{d.status}</span>
                    </span>
                    <button
                      onClick={() => removeDocument(d.id, d.file_path)}
                      className="text-xs font-semibold text-destructive"
                    >
                      Retirer
                    </button>
                  </li>
                ))}
                {(documents.data ?? []).length === 0 && (
                  <li className="text-muted-foreground">Aucun document envoyé.</li>
                )}
              </ul>

              {pro?.verification_status === "pending" ? (
                <p className="rounded-xl bg-secondary px-4 py-3 text-sm font-semibold text-secondary-foreground">
                  🕐 Vérification en cours — votre dossier a été envoyé. Notre équipe va vérifier les
                  informations et documents fournis.
                </p>
              ) : (
                <button
                  onClick={submitDossier}
                  disabled={busy}
                  className="w-full rounded-xl bg-primary py-3 text-sm font-bold text-primary-foreground disabled:opacity-60"
                >
                  Envoyer mon dossier pour vérification
                </button>
              )}
            </div>
          )}

          <div className="mt-8 flex items-center justify-between gap-3">
            <button
              onClick={() => setStep(Math.max(1, step - 1))}
              disabled={step === 1}
              className="rounded-xl border border-border px-4 py-2 text-sm font-semibold disabled:opacity-40"
            >
              Précédent
            </button>
            <div className="flex gap-2">
              <Link
                to="/pro"
                className="rounded-xl border border-border px-4 py-2 text-sm font-semibold hover:bg-muted"
              >
                Reprendre plus tard
              </Link>
              {step < 5 && (
                <button
                  onClick={goNext}
                  disabled={busy}
                  className="rounded-xl bg-primary px-5 py-2 text-sm font-bold text-primary-foreground disabled:opacity-60"
                >
                  Enregistrer et continuer
                </button>
              )}
            </div>
          </div>
        </section>
      </main>
      <MobileTabBar variant="pro" />
      <SiteFooter variant="pro" />
    </div>
  );
}
