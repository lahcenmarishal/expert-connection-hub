import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { MobileTabBar, SiteFooter, SiteHeader } from "@/components/site";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { detectContactLeak } from "@/lib/marketplace";

export const Route = createFileRoute("/_authenticated/messages")({
  head: () => ({
    meta: [
      { title: "Messagerie — ProFinder" },
      {
        name: "description",
        content:
          "Discutez avec les professeurs ou les clients dans la messagerie interne sécurisée de ProFinder.",
      },
      { property: "og:title", content: "Messagerie — ProFinder" },
      {
        property: "og:description",
        content: "Messagerie interne : vos coordonnées restent protégées avant réservation.",
      },
    ],
  }),
  component: Messages,
});

function Messages() {
  const { user } = useAuth();
  const qc = useQueryClient();
  const [active, setActive] = useState<string | null>(null);
  const [body, setBody] = useState("");

  const messages = useQuery({
    queryKey: ["messages"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("messages")
        .select("*")
        .order("created_at", { ascending: true });
      if (error) throw error;
      return data ?? [];
    },
  });

  const pros = useQuery({
    queryKey: ["pro-contacts"],
    queryFn: async () => {
      const { data } = await supabase
        .from("professionals")
        .select("user_id, display_name, headline, phone, photo_url, city_id, cities(name)")
        .not("user_id", "is", null);
      return data ?? [];
    },
  });

  const profiles = useQuery({
    queryKey: ["profile-contacts"],
    queryFn: async () => {
      const { data } = await supabase.from("profiles").select("id, full_name, phone, city, avatar_url");
      return data ?? [];
    },
  });


  useEffect(() => {
    const channel = supabase
      .channel("messages-live")
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "messages" }, () => {
        qc.invalidateQueries({ queryKey: ["messages"] });
      })
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [qc]);

  const all = messages.data ?? [];
  const counterparts = Array.from(
    new Set(all.map((m) => (m.sender_id === user?.id ? m.recipient_id : m.sender_id))),
  );
  const current = active ?? counterparts[0] ?? null;
  const thread = all.filter(
    (m) => m.sender_id === current || m.recipient_id === current,
  );

  const infoFor = (userId: string) => {
    const pro = pros.data?.find((p) => p.user_id === userId);
    const profile = profiles.data?.find((p) => p.id === userId);
    return {
      name: pro?.display_name ?? profile?.full_name ?? "Utilisateur",
      subtitle: pro?.headline ?? (profile ? "Élève / parent" : null),
      phone: pro?.phone ?? profile?.phone ?? null,
      city: (pro as { cities?: { name: string } | null } | undefined)?.cities?.name ?? profile?.city ?? null,
      photo: pro?.photo_url ?? profile?.avatar_url ?? null,
      isPro: Boolean(pro),
    };
  };

  const nameFor = (userId: string) => infoFor(userId).name;

  const unreadFor = (userId: string) =>
    all.filter((m) => m.sender_id === userId && m.recipient_id === user?.id && !m.read_at).length;


  // Marque comme lus les messages du fil ouvert.
  useEffect(() => {
    if (!user || !current) return;
    const ids = all
      .filter((m) => m.sender_id === current && m.recipient_id === user.id && !m.read_at)
      .map((m) => m.id);
    if (ids.length === 0) return;
    supabase
      .from("messages")
      .update({ read_at: new Date().toISOString() })
      .in("id", ids)
      .then(() => qc.invalidateQueries({ queryKey: ["messages"] }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current, user, all.length]);


  const send = async () => {
    if (!user || !current || !body.trim()) return;
    const flagged = detectContactLeak(body);
    const { error } = await supabase.from("messages").insert({
      sender_id: user.id,
      recipient_id: current,
      body,
      flagged,
    });
    if (error) {
      toast.error(error.message);
      return;
    }
    setBody("");
    if (flagged)
      toast.warning("Les numéros et liens sont signalés : échangez via la plateforme.");
    qc.invalidateQueries({ queryKey: ["messages"] });
  };

  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      <SiteHeader />
      <main className="mx-auto max-w-5xl px-4 py-8 pb-24">
        <h1 className="mb-6 text-3xl font-extrabold tracking-tight">Messagerie</h1>
        {counterparts.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            Aucune conversation. Contactez un professeur depuis une proposition reçue.
          </p>
        ) : (
          <div className="grid gap-6 md:grid-cols-[240px_1fr]">
            <aside className="space-y-2">
              {counterparts.map((c) => (
                <button
                  key={c}
                  onClick={() => setActive(c)}
                  className={
                    c === current
                      ? "flex w-full items-center justify-between gap-2 rounded-xl border border-primary bg-primary/5 px-4 py-3 text-left text-sm font-semibold"
                      : "flex w-full items-center justify-between gap-2 rounded-xl border border-border bg-card px-4 py-3 text-left text-sm"
                  }
                >
                  <span className="truncate">{nameFor(c)}</span>
                  {unreadFor(c) > 0 && c !== current && (
                    <span className="inline-flex min-w-5 items-center justify-center rounded-full bg-primary px-1.5 text-[10px] font-bold text-primary-foreground">
                      {unreadFor(c)}
                    </span>
                  )}
                </button>
              ))}
            </aside>
            <section className="flex min-h-[400px] flex-col rounded-2xl border border-border bg-card p-4">
              {current &&
                (() => {
                  const info = infoFor(current);
                  return (
                    <header className="mb-4 flex items-start gap-3 border-b border-border pb-4">
                      {info.photo ? (
                        <img
                          src={info.photo}
                          alt={info.name}
                          loading="lazy"
                          className="size-12 shrink-0 rounded-2xl object-cover"
                        />
                      ) : (
                        <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-muted text-base font-bold">
                          {info.name.charAt(0)}
                        </div>
                      )}
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-bold">
                          {info.name}
                          <span className="ml-2 rounded-full bg-muted px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                            {info.isPro ? "Professeur" : "Élève / parent"}
                          </span>
                        </p>
                        {info.subtitle && (
                          <p className="truncate text-xs text-muted-foreground">{info.subtitle}</p>
                        )}
                        <p className="mt-1 flex flex-wrap gap-x-3 text-xs text-muted-foreground">
                          {info.city && <span>{info.city}</span>}
                          {info.phone && (
                            <a href={`tel:${info.phone}`} className="font-semibold text-primary">
                              {info.phone}
                            </a>
                          )}
                        </p>
                      </div>
                    </header>
                  );
                })()}
              <div className="flex-1 space-y-3 overflow-y-auto">
                {thread.map((m) => {
                  const mine = m.sender_id === user?.id;
                  return (
                    <div key={m.id} className={mine ? "ml-auto max-w-[80%]" : "max-w-[80%]"}>
                      <p className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                        {mine ? "Vous" : nameFor(m.sender_id)} ·{" "}
                        {new Date(m.created_at).toLocaleString("fr-FR", {
                          day: "2-digit",
                          month: "2-digit",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                      <div
                        className={
                          mine
                            ? "rounded-2xl bg-primary px-4 py-2 text-sm text-primary-foreground"
                            : "rounded-2xl bg-muted px-4 py-2 text-sm"
                        }
                      >
                        {m.body}
                        {m.flagged && (
                          <span className="mt-1 block text-[10px] opacity-70">
                            Signalé : coordonnées détectées
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-4 flex gap-2">
                <input
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  placeholder="Écrire un message…"
                  className="flex-1 rounded-xl border border-border bg-muted px-4 py-3 text-sm"
                />
                <button
                  onClick={send}
                  className="rounded-xl bg-primary px-5 py-3 text-sm font-bold text-primary-foreground"
                >
                  Envoyer
                </button>
              </div>
            </section>
          </div>
        )}
      </main>
      <MobileTabBar />
      <SiteFooter />
    </div>
  );
}
