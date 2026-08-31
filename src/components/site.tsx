import { Link, useRouter, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  
  
  ClipboardList,
  GraduationCap,
  Home,
  LayoutDashboard,
  LogOut,
  Menu,
  MessageSquare,
  Search,
  Settings,
  Tag,
  UserRound,
  X,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import logoAsset from "@/assets/logo.png.asset.json";

export type SiteVariant = "public" | "client" | "pro" | "admin";

/**
 * Détermine automatiquement l'espace courant (public / client / professeur / admin)
 * pour les pages partagées (messagerie, demandes…).
 */
export function useSiteVariant(explicit?: SiteVariant): SiteVariant {
  const { user, isAdmin } = useAuth();
  const [isPro, setIsPro] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (!user) {
      setIsPro(false);
      setChecked(false);
      return;
    }
    let cancelled = false;
    supabase
      .from("professionals")
      .select("id")
      .eq("user_id", user.id)
      .maybeSingle()
      .then(({ data }) => {
        if (!cancelled) {
          setIsPro(!!data);
          setChecked(true);
        }
      });
    return () => {
      cancelled = true;
    };
  }, [user]);

  if (explicit) return explicit;
  if (isAdmin) return "admin";
  if (isPro) return "pro";
  if (user && checked) return "client";
  return "public";
}


type NavItem = { to: string; label: string; Icon: typeof Search; search?: Record<string, string> };

function navItemsFor(variant: SiteVariant, isLogged: boolean): NavItem[] {
  if (variant === "admin") {
    return [
      { to: "/", label: "Accueil", Icon: Home },
      { to: "/admin", label: "Console", Icon: Settings },
      { to: "/professeurs", label: "Professeurs", Icon: GraduationCap },
      { to: "/demandes", label: "Demandes", Icon: ClipboardList },
      { to: "/messages", label: "Messages", Icon: MessageSquare },
    ];
  }
  if (variant === "pro") {
    return [
      { to: "/", label: "Accueil", Icon: Home },
      { to: "/pro", label: "Tableau de bord", Icon: LayoutDashboard },
      { to: "/pro/demandes", label: "Demandes pour vous", Icon: ClipboardList },
      { to: "/messages", label: "Messages", Icon: MessageSquare },
      { to: "/pro/inscription", label: "Mon profil", Icon: UserRound },
    ];
  }
  if (variant === "client") {
    return [
      { to: "/", label: "Accueil", Icon: Home },
      { to: "/compte", label: "Tableau de bord", Icon: LayoutDashboard },
      { to: "/professeurs", label: "Trouver un professeur", Icon: Search },
      { to: "/demandes", label: "Mes demandes", Icon: ClipboardList },
      { to: "/messages", label: "Messages", Icon: MessageSquare },
    ];
  }
  const items: NavItem[] = [
    { to: "/professeurs", label: "Trouver un professeur", Icon: Search },
    { to: "/tarifs", label: "Tarifs", Icon: Tag },
  ];
  if (isLogged) {
    items.push(
      { to: "/demandes", label: "Mes demandes", Icon: ClipboardList },
      { to: "/messages", label: "Messages", Icon: MessageSquare },
    );
  }
  return items;
}

const PRO_REQUEST_PATHS = ["/pro/demandes"];
const CLIENT_REQUEST_PATHS = ["/demandes"];
const MESSAGE_PATHS = ["/messages"];
// Alertes affichées sur « Demandes pour vous » (professeur).
const REQUEST_TYPES = ["request_match", "request_targeted"];

function Badge({ count, className = "" }: { count: number; className?: string }) {
  return (
    <span
      className={`relative inline-flex min-w-5 items-center justify-center rounded-full bg-primary px-1.5 text-[10px] font-bold text-primary-foreground ${className}`}
    >
      <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-60" />
      <span className="relative">{count}</span>
    </span>
  );
}

export function SiteHeader({ variant: variantProp }: { variant?: SiteVariant }) {
  const variant = useSiteVariant(variantProp);
  const { user } = useAuth();
  const router = useRouter();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [unread, setUnread] = useState(0);
  const [unreadRequests, setUnreadRequests] = useState(0);
  const [unreadProposals, setUnreadProposals] = useState(0);
  const [unreadMessages, setUnreadMessages] = useState(0);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!user) {
      setUnread(0);
      setUnreadRequests(0);
      setUnreadProposals(0);
      setUnreadMessages(0);
      return;
    }
    let active = true;

    const senderName = async (senderId: string) => {
      const { data: pro } = await supabase
        .from("professionals")
        .select("display_name")
        .eq("user_id", senderId)
        .maybeSingle();
      if (pro?.display_name) return pro.display_name;
      const { data: profile } = await supabase
        .from("profiles")
        .select("full_name")
        .eq("id", senderId)
        .maybeSingle();
      return profile?.full_name ?? "un utilisateur";
    };

    const load = async () => {
      const [{ data: notifs }, { data: msgs }] = await Promise.all([
        supabase.from("notifications").select("id, type").is("read_at", null).limit(200),
        supabase
          .from("messages")
          .select("id")
          .eq("recipient_id", user.id)
          .is("read_at", null)
          .limit(200),
      ]);
      if (!active) return;
      const rows = notifs ?? [];
      setUnread(rows.length);
      setUnreadRequests(rows.filter((n) => REQUEST_TYPES.includes(n.type)).length);
      setUnreadProposals(rows.filter((n) => !REQUEST_TYPES.includes(n.type)).length);
      setUnreadMessages((msgs ?? []).length);
    };
    load();

    const channel = supabase
      .channel("header-live")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "notifications" },
        () => load(),
      )
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "messages" },
        async (payload) => {
          const row = payload.new as { sender_id: string; recipient_id: string; body: string };
          load();
          if (row.recipient_id !== user.id) return;
          const name = await senderName(row.sender_id);
          toast.message(`Nouveau message de ${name}`, {
            description: row.body?.slice(0, 120),
          });
        },
      )
      .subscribe();
    const onFocus = () => load();
    window.addEventListener("focus", onFocus);
    return () => {
      active = false;
      window.removeEventListener("focus", onFocus);
      supabase.removeChannel(channel);
    };
  }, [user]);

  // Les badges disparaissent dès qu'on ouvre la page concernée.
  useEffect(() => {
    if (!user) return;
    const now = new Date().toISOString();

    if (PRO_REQUEST_PATHS.includes(pathname)) {
      // Alertes « nouvelle demande » côté professeur.
      supabase
        .from("notifications")
        .update({ read_at: now })
        .in("type", REQUEST_TYPES)
        .is("read_at", null)
        .then(() => {
          setUnreadRequests(0);
          setUnread(unreadProposals);
        });
    } else if (CLIENT_REQUEST_PATHS.includes(pathname)) {
      // Alertes « nouvelle proposition » côté élève, visibles sur « Mes demandes ».
      supabase
        .from("notifications")
        .update({ read_at: now })
        .not("type", "in", `(${REQUEST_TYPES.join(",")})`)
        .is("read_at", null)
        .then(() => {
          setUnreadProposals(0);
          setUnread(unreadRequests);
        });
    } else if (MESSAGE_PATHS.includes(pathname)) {
      supabase
        .from("messages")
        .update({ read_at: now })
        .eq("recipient_id", user.id)
        .is("read_at", null)
        .then(() => setUnreadMessages(0));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, user]);

  const badgeFor = (to: string) =>
    PRO_REQUEST_PATHS.includes(to)
      ? unreadRequests
      : CLIENT_REQUEST_PATHS.includes(to)
        ? unreadProposals
        : MESSAGE_PATHS.includes(to)
          ? unreadMessages
          : 0;




  const isWorkspace = variant !== "public";
  const homeTo =
    variant === "admin" ? "/admin" : variant === "pro" ? "/pro" : variant === "client" ? "/compte" : "/";
  const items = navItemsFor(variant, !!user);

  const linkClass =
    "flex items-center gap-1.5 whitespace-nowrap text-muted-foreground transition-colors hover:text-primary";

  const signOut = async () => {
    setOpen(false);
    await supabase.auth.signOut();
    router.navigate({ to: "/" });
  };

  const showCta = variant === "public" || variant === "client";

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-card/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <Link to={homeTo} className="flex items-center gap-2" onClick={() => setOpen(false)}>
          <img src={logoAsset.url} alt="ProFinder" className="h-6 w-auto md:h-8" />
          {isWorkspace && (
            <span className="hidden rounded-full bg-primary/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-primary sm:inline">
              {variant === "admin" ? "Admin" : variant === "pro" ? "Professeur" : "Mon espace"}
            </span>
          )}
        </Link>

        {/* Desktop */}
        <div className="hidden items-center gap-3 text-sm font-medium xl:flex xl:gap-5">
          {items.map(({ to, label, Icon }) => (
            <Link key={to} to={to} className={linkClass} activeProps={{ className: "flex items-center gap-1.5 whitespace-nowrap text-primary" }}>

              <Icon className="size-4" />
              {label}
              {badgeFor(to) > 0 && <Badge count={badgeFor(to)} className="ml-0.5" />}

            </Link>
          ))}
          {showCta && (
            <Link
              to="/publier"
              className="whitespace-nowrap rounded-full bg-primary px-4 py-2 text-sm font-bold text-primary-foreground shadow-sm transition hover:opacity-90"
            >
              Déposer une demande
            </Link>
          )}
          {user ? (
            <button aria-label="Déconnexion" className={linkClass} onClick={signOut}>
              <LogOut className="size-4" />
              Déconnexion
            </button>
          ) : (
            <>
              <Link to="/auth" search={{ mode: "signin", role: "client" }} className={linkClass}>
                <UserRound className="size-4" />
                Se connecter
              </Link>
              <Link
                to="/inscription"
                className="flex items-center gap-1.5 whitespace-nowrap rounded-full border border-border px-4 py-2 hover:bg-muted"
              >
                <GraduationCap className="size-4" />
                S'inscrire
              </Link>
            </>
          )}
        </div>

        {/* Mobile: hamburger */}
        <button
          type="button"
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="relative flex size-10 items-center justify-center rounded-full bg-muted text-foreground xl:hidden"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
          {!open && unread > 0 && (
            <span className="absolute -top-1 -right-1 inline-flex min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[9px] font-bold text-primary-foreground">
              {unread}
            </span>
          )}
        </button>
      </div>

      {open && (
        <div className="border-t border-border bg-card px-4 py-4 xl:hidden">
          <div className="flex flex-col gap-1 text-sm font-medium">
            {items.map(({ to, label, Icon }) => (
              <Link
                key={to}
                to={to}
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 rounded-xl px-3 py-3 text-muted-foreground hover:bg-muted"
                activeProps={{ className: "flex items-center gap-3 rounded-xl bg-primary/10 px-3 py-3 text-primary" }}
              >
                <Icon className="size-4" />
                {label}
                {badgeFor(to) > 0 && <Badge count={badgeFor(to)} className="ml-auto" />}

              </Link>
            ))}

            {showCta && (
              <Link
                to="/publier"
                onClick={() => setOpen(false)}
                className="mt-3 rounded-xl bg-primary px-3 py-3 text-center font-bold text-primary-foreground"
              >
                Déposer une demande
              </Link>
            )}

            {user ? (
              <button
                onClick={signOut}
                className="mt-3 flex items-center gap-3 rounded-xl px-3 py-3 text-left text-muted-foreground hover:bg-muted"
              >
                <LogOut className="size-4" />
                Déconnexion
              </button>
            ) : (
              <div className="mt-3 flex flex-col gap-2">
                <Link
                  to="/auth"
                  search={{ mode: "signin", role: "client" }}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-center gap-2 rounded-xl border border-border px-3 py-3 font-semibold"
                >
                  <UserRound className="size-4" />
                  Se connecter
                </Link>
                <Link
                  to="/inscription"
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-center gap-2 rounded-xl border border-border px-3 py-3 font-semibold"
                >
                  <GraduationCap className="size-4" />
                  S'inscrire
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

/** Remplacé par le menu hamburger du header. */
export function MobileTabBar(_props: { variant?: SiteVariant }) {
  return null;
}


export function SiteFooter({ variant: variantProp }: { variant?: SiteVariant }) {
  const variant = useSiteVariant(variantProp);
  return (
    <footer className="border-t border-border bg-card py-12 pb-24 md:pb-12">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 px-4 md:flex-row">
        <div className="flex items-center gap-2">
          <img src={logoAsset.url} alt="ProFinder" className="h-5 w-auto" loading="lazy" />
        </div>
        {variant === "public" && (
          <div className="flex gap-6 text-sm text-muted-foreground">
            <Link to="/tarifs" className="flex items-center gap-1.5 hover:text-primary">
              <Tag className="size-4" /> Tarifs
            </Link>
            <Link to="/professeurs" className="flex items-center gap-1.5 hover:text-primary">
              <GraduationCap className="size-4" /> Professeurs
            </Link>
            <Link
              to="/auth"
              search={{ mode: "signup", role: "pro" }}
              className="flex items-center gap-1.5 hover:text-primary"
            >
              <UserRound className="size-4" /> Inscription
            </Link>
          </div>
        )}

        <p className="text-sm text-muted-foreground">© 2026 ProFinder. Tous droits réservés.</p>
      </div>
    </footer>
  );
}
