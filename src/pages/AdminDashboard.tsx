import { Fragment, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import {
  Calendar,
  CheckCircle2,
  Clock,
  Edit3,
  FileText,
  Image,
  Inbox,
  LayoutDashboard,
  LogOut,
  Mail,
  Phone,
  Plus,
  Save,
  Search,
  Shield,
  TrendingUp,
  Users,
  X,
  Trash2,
} from "lucide-react";

const db = supabase as any;

type Tab = "overview" | "inscriptions" | "articles" | "events" | "photos" | "team";
type Role = "admin" | "owner";
type PublishMode = "draft" | "published" | "scheduled";

const emptyArticle = { title: "", excerpt: "", content: "", tag: "Actualité", image_url: "", publishMode: "draft" as PublishMode, scheduled_at: "" };
const emptyEvent = { title: "", description: "", location: "", event_date: "", image_url: "", publishMode: "draft" as PublishMode, scheduled_at: "" };
const emptyPhoto = { title: "", image_url: "", alt_text: "", span: "col-span-1 row-span-1", publishMode: "published" as PublishMode, scheduled_at: "" };
const emptyTeam = { display_name: "", email: "", password: "" };

const nowIso = () => new Date().toISOString();
const toLocalDateTime = (value?: string | null) => (value ? new Date(value).toISOString().slice(0, 16) : "");
const statusLabel = (row: any) => {
  if (row.scheduled_at && row.published_at && new Date(row.published_at) > new Date()) return "Programmé";
  if (row.is_published) return "Publié";
  return "Brouillon";
};

const initials = (name: string) =>
  (name || "?")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0]?.toUpperCase())
    .join("") || "?";

const avatarColor = (seed: string) => {
  const hues = [0, 12, 200, 260, 145, 32];
  const i = (seed?.charCodeAt(0) || 0) % hues.length;
  return `hsl(${hues[i]} 70% 92%)`;
};

const formatDate = (iso?: string) => {
  if (!iso) return "—";
  const d = new Date(iso);
  return d.toLocaleDateString("fr-FR", { day: "2-digit", month: "short", year: "numeric" });
};

const leadStatusStyles: Record<string, string> = {
  nouveau: "bg-blue-50 text-blue-700 ring-1 ring-blue-200",
  "contacté": "bg-amber-50 text-amber-700 ring-1 ring-amber-200",
  converti: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200",
  "archivé": "bg-zinc-100 text-zinc-600 ring-1 ring-zinc-200",
};

const AdminDashboard = () => {
  const [user, setUser] = useState<any>(null);
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const navigate = useNavigate();

  const [articles, setArticles] = useState<any[]>([]);
  const [articleForm, setArticleForm] = useState(emptyArticle);
  const [editingArticleId, setEditingArticleId] = useState<string | null>(null);

  const [events, setEvents] = useState<any[]>([]);
  const [eventForm, setEventForm] = useState(emptyEvent);
  const [editingEventId, setEditingEventId] = useState<string | null>(null);

  const [photos, setPhotos] = useState<any[]>([]);
  const [photoForm, setPhotoForm] = useState(emptyPhoto);
  const [editingPhotoId, setEditingPhotoId] = useState<string | null>(null);

  const [leads, setLeads] = useState<any[]>([]);
  const [team, setTeam] = useState<any[]>([]);
  const [teamForm, setTeamForm] = useState(emptyTeam);

  const isOwner = roles.includes("owner");
  const isAdmin = roles.includes("admin") || isOwner;

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) { navigate("/login"); return; }
      setUser(session.user);

      const { data: roleRows, error } = await db.from("user_roles").select("role").eq("user_id", session.user.id);
      if (error || !roleRows?.length) {
        navigate("/");
        toast({ title: "Accès refusé", description: "Vous n'êtes pas administrateur.", variant: "destructive" });
        return;
      }
      setRoles(roleRows.map((r: any) => r.role));
      setLoading(false);
    };
    checkAuth();
  }, [navigate]);

  useEffect(() => {
    if (!isAdmin) return;
    loadData();
  }, [isAdmin, activeTab]);

  const stats = useMemo(() => ({
    leads: leads.length,
    pending: leads.filter((lead) => lead.status === "nouveau").length,
    converted: leads.filter((lead) => lead.status === "converti").length,
    published: articles.filter((article) => article.is_published).length,
  }), [leads, articles]);

  const filteredLeads = useMemo(() => {
    const q = search.trim().toLowerCase();
    return leads.filter((lead) => {
      if (statusFilter !== "all" && lead.status !== statusFilter) return false;
      if (!q) return true;
      return (
        lead.full_name?.toLowerCase().includes(q) ||
        lead.email?.toLowerCase().includes(q) ||
        lead.phone?.toLowerCase().includes(q) ||
        lead.programme?.toLowerCase().includes(q)
      );
    });
  }, [leads, search, statusFilter]);

  const loadData = async () => {
    if (activeTab === "overview") {
      const [leadRes, articleRes, eventRes] = await Promise.all([
        db.from("inscription_leads").select("*").order("created_at", { ascending: false }).limit(8),
        db.from("blog_articles").select("*").order("created_at", { ascending: false }).limit(8),
        db.from("events").select("*").order("event_date", { ascending: false }).limit(5),
      ]);
      setLeads(leadRes.data || []);
      setArticles(articleRes.data || []);
      setEvents(eventRes.data || []);
      return;
    }
    if (activeTab === "inscriptions") {
      const { data } = await db.from("inscription_leads").select("*").order("created_at", { ascending: false });
      setLeads(data || []);
    } else if (activeTab === "articles") {
      const { data } = await db.from("blog_articles").select("*").order("created_at", { ascending: false });
      setArticles(data || []);
    } else if (activeTab === "events") {
      const { data } = await db.from("events").select("*").order("event_date", { ascending: false });
      setEvents(data || []);
    } else if (activeTab === "photos") {
      const { data } = await db.from("photos").select("*").order("created_at", { ascending: false });
      setPhotos(data || []);
    } else if (activeTab === "team") {
      const { data } = await db.from("admin_team_members").select("*").order("created_at", { ascending: false });
      setTeam(data || []);
    }
  };

  const publishFields = (mode: PublishMode, scheduledAt: string) => {
    if (mode === "published") return { is_published: true, status: "published", published_at: nowIso(), scheduled_at: null };
    if (mode === "scheduled") {
      const date = scheduledAt ? new Date(scheduledAt).toISOString() : nowIso();
      return { is_published: true, status: "scheduled", published_at: date, scheduled_at: date };
    }
    return { is_published: false, status: "draft", published_at: null, scheduled_at: null };
  };

  const handleSaveArticle = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const payload = { title: articleForm.title, excerpt: articleForm.excerpt, content: articleForm.content, tag: articleForm.tag, image_url: articleForm.image_url, author_id: user.id, ...publishFields(articleForm.publishMode, articleForm.scheduled_at) };
    const query = editingArticleId ? db.from("blog_articles").update(payload).eq("id", editingArticleId) : db.from("blog_articles").insert(payload);
    const { error } = await query;
    setSaving(false);
    if (error) return toast({ title: "Erreur", description: error.message, variant: "destructive" });
    toast({ title: editingArticleId ? "Article modifié" : "Article créé" });
    setArticleForm(emptyArticle); setEditingArticleId(null); loadData();
  };

  const handleSaveEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const payload = { title: eventForm.title, description: eventForm.description, location: eventForm.location, event_date: eventForm.event_date, image_url: eventForm.image_url, ...publishFields(eventForm.publishMode, eventForm.scheduled_at) };
    const query = editingEventId ? db.from("events").update(payload).eq("id", editingEventId) : db.from("events").insert(payload);
    const { error } = await query;
    setSaving(false);
    if (error) return toast({ title: "Erreur", description: error.message, variant: "destructive" });
    toast({ title: editingEventId ? "Événement modifié" : "Événement créé" });
    setEventForm(emptyEvent); setEditingEventId(null); loadData();
  };

  const handleSavePhoto = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const payload = { title: photoForm.title, image_url: photoForm.image_url, alt_text: photoForm.alt_text, span: photoForm.span, ...publishFields(photoForm.publishMode, photoForm.scheduled_at) };
    const query = editingPhotoId ? db.from("photos").update(payload).eq("id", editingPhotoId) : db.from("photos").insert(payload);
    const { error } = await query;
    setSaving(false);
    if (error) return toast({ title: "Erreur", description: error.message, variant: "destructive" });
    toast({ title: editingPhotoId ? "Photo modifiée" : "Photo ajoutée" });
    setPhotoForm(emptyPhoto); setEditingPhotoId(null); loadData();
  };

  const handleUploadPhoto = async (file: File | undefined, target: "photo" | "article" | "event") => {
    if (!file) return;
    if (file.size > 10 * 1024 * 1024) {
      return toast({ title: "Fichier trop lourd", description: "Max 10 Mo", variant: "destructive" });
    }
    const ext = file.name.split(".").pop() || "jpg";
    const path = `${target}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
    const { error: upErr } = await supabase.storage.from("site-photos").upload(path, file, { cacheControl: "3600", upsert: false });
    if (upErr) return toast({ title: "Échec upload", description: upErr.message, variant: "destructive" });
    const { data } = supabase.storage.from("site-photos").getPublicUrl(path);
    const url = data.publicUrl;
    if (target === "photo") setPhotoForm((f) => ({ ...f, image_url: url }));
    if (target === "article") setArticleForm((f) => ({ ...f, image_url: url }));
    if (target === "event") setEventForm((f) => ({ ...f, image_url: url }));
    toast({ title: "Image téléversée" });
  };

  const handleDelete = async (table: string, id: string) => {
    const { error } = await db.from(table).delete().eq("id", id);
    if (error) return toast({ title: "Erreur", description: error.message, variant: "destructive" });
    toast({ title: "Supprimé" });
    loadData();
  };

  const updateLeadStatus = async (id: string, status: string) => {
    const { error } = await db.from("inscription_leads").update({ status }).eq("id", id);
    if (error) return toast({ title: "Erreur", description: error.message, variant: "destructive" });
    loadData();
  };

  const handleCreateTeamMember = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isOwner) return toast({ title: "Action réservée au owner", variant: "destructive" });
    setSaving(true);
    const { data, error } = await supabase.functions.invoke("create-team-member", { body: teamForm });
    setSaving(false);
    const fnError = (data as any)?.error;
    if (error || fnError) {
      return toast({ title: "Erreur création admin", description: fnError || error?.message || "Erreur inconnue", variant: "destructive" });
    }
    toast({ title: "Admin créé", description: teamForm.email });
    setTeamForm(emptyTeam); loadData();
  };

  const handleLogout = async () => { await supabase.auth.signOut(); navigate("/login"); };

  if (loading) return <div className="min-h-screen bg-zinc-50 flex items-center justify-center text-zinc-500">Chargement...</div>;

  const tabs: { key: Tab; label: string; icon: any; ownerOnly?: boolean }[] = [
    { key: "overview", label: "Vue générale", icon: LayoutDashboard },
    { key: "inscriptions", label: "Inscriptions", icon: Inbox },
    { key: "articles", label: "Articles", icon: FileText },
    { key: "events", label: "Événements", icon: Calendar },
    { key: "photos", label: "Photos", icon: Image },
    { key: "team", label: "Équipe", icon: Users, ownerOnly: true },
  ];

  const inputClass = "w-full rounded-xl border border-zinc-200 bg-white px-4 py-2.5 text-sm text-zinc-900 placeholder:text-zinc-400 outline-none transition focus:border-zinc-900 focus:ring-2 focus:ring-zinc-900/5";
  const cardClass = "rounded-2xl border border-zinc-200/70 bg-white p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04)]";
  const primaryButton = "inline-flex items-center justify-center gap-2 rounded-xl bg-zinc-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-zinc-800 disabled:opacity-60";
  const ghostButton = "inline-flex items-center justify-center gap-2 rounded-xl border border-zinc-200 bg-white px-3.5 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50";

  const renderPublishControls = (mode: PublishMode, scheduledAt: string, setMode: (mode: PublishMode) => void, setScheduled: (value: string) => void) => (
    <div className="grid gap-3 md:grid-cols-[1fr_1fr]">
      <select value={mode} onChange={(e) => setMode(e.target.value as PublishMode)} className={inputClass}>
        <option value="draft">Brouillon</option>
        <option value="published">Publier immédiatement</option>
        <option value="scheduled">Programmer</option>
      </select>
      <input type="datetime-local" value={scheduledAt} onChange={(e) => setScheduled(e.target.value)} disabled={mode !== "scheduled"} className={inputClass} />
    </div>
  );

  return (
    <div className="min-h-screen bg-zinc-50/80">
      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-[240px] border-r border-zinc-200/70 bg-white lg:flex lg:flex-col">
        <div className="flex h-16 items-center gap-2.5 border-b border-zinc-200/70 px-5">
          <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-red-600 to-red-500 text-sm font-bold text-white shadow-sm">E</div>
          <div>
            <p className="text-[15px] font-bold leading-tight text-zinc-900">ECIN Admin</p>
            <p className="text-[11px] text-zinc-500">Tableau de bord</p>
          </div>
        </div>
        <nav className="flex-1 space-y-0.5 p-3">
          {tabs.filter((tab) => !tab.ownerOnly || isOwner).map((tab) => {
            const active = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                  active
                    ? "bg-zinc-900 text-white shadow-sm"
                    : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900"
                }`}
              >
                <tab.icon className={`h-4 w-4 ${active ? "text-white" : "text-zinc-400"}`} />
                {tab.label}
              </button>
            );
          })}
        </nav>
        <div className="border-t border-zinc-200/70 p-3">
          <div className="flex items-center gap-3 rounded-lg px-2 py-2">
            <div className="grid h-9 w-9 place-items-center rounded-full bg-zinc-100 text-sm font-bold text-zinc-700">
              {initials(user?.email || "A")}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-semibold text-zinc-900">{user?.email}</p>
              <p className="text-[10px] uppercase tracking-wide text-zinc-400">{isOwner ? "Owner" : "Admin"}</p>
            </div>
            <button onClick={handleLogout} className="rounded-lg p-1.5 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-700">
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main */}
      <div className="lg:pl-[240px]">
        {/* Top bar */}
        <header className="sticky top-0 z-20 border-b border-zinc-200/70 bg-white/80 backdrop-blur-md">
          <div className="flex h-16 items-center justify-between gap-4 px-5 lg:px-8">
            <div className="flex items-center gap-3">
              <h1 className="text-[17px] font-bold text-zinc-900 capitalize">{tabs.find(t => t.key === activeTab)?.label}</h1>
              <span className="hidden text-xs text-zinc-400 sm:inline">· Mis à jour à l'instant</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="hidden items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-700 ring-1 ring-emerald-200 sm:inline-flex">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> En ligne
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-zinc-100 px-2.5 py-1 text-[11px] font-semibold text-zinc-700">
                <Shield className="h-3 w-3" /> {isOwner ? "Owner" : "Admin"}
              </span>
              <button onClick={handleLogout} className="lg:hidden rounded-lg p-2 text-zinc-500 hover:bg-zinc-100">
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          </div>
          {/* Mobile tabs */}
          <nav className="flex gap-1 overflow-x-auto px-3 pb-2 lg:hidden">
            {tabs.filter((tab) => !tab.ownerOnly || isOwner).map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex shrink-0 items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold ${
                  activeTab === tab.key ? "bg-zinc-900 text-white" : "text-zinc-600 hover:bg-zinc-100"
                }`}
              >
                <tab.icon className="h-3.5 w-3.5" /> {tab.label}
              </button>
            ))}
          </nav>
        </header>

        <main className="p-5 lg:p-8">
          {activeTab === "overview" && (
            <div className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <StatCard label="Leads reçus" value={stats.leads} icon={Inbox} trend="+12%" tone="blue" />
                <StatCard label="À traiter" value={stats.pending} icon={Clock} trend="urgent" tone="amber" />
                <StatCard label="Convertis" value={stats.converted} icon={CheckCircle2} trend="+8%" tone="emerald" />
                <StatCard label="Articles publiés" value={stats.published} icon={TrendingUp} trend="+3" tone="violet" />
              </div>

              <div className={cardClass}>
                <div className="mb-5 flex items-center justify-between">
                  <div>
                    <h2 className="text-base font-bold text-zinc-900">Dernières inscriptions</h2>
                    <p className="text-xs text-zinc-500">Les 8 plus récentes demandes reçues sur le site</p>
                  </div>
                  <button onClick={() => setActiveTab("inscriptions")} className={ghostButton}>
                    Voir tout
                  </button>
                </div>
                <LeadsTable leads={leads} onStatus={updateLeadStatus} />
              </div>
            </div>
          )}

          {activeTab === "inscriptions" && (
            <div className={cardClass}>
              <div className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <h2 className="text-base font-bold text-zinc-900">Toutes les inscriptions</h2>
                  <p className="text-xs text-zinc-500">{filteredLeads.length} sur {leads.length} demandes</p>
                </div>
                <div className="flex flex-col gap-2 sm:flex-row">
                  <div className="relative">
                    <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
                    <input
                      placeholder="Rechercher un lead..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className={`${inputClass} pl-9 sm:w-64`}
                    />
                  </div>
                  <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className={inputClass}>
                    <option value="all">Tous les statuts</option>
                    <option value="nouveau">Nouveau</option>
                    <option value="contacté">Contacté</option>
                    <option value="converti">Converti</option>
                    <option value="archivé">Archivé</option>
                  </select>
                </div>
              </div>
              <LeadsTable leads={filteredLeads} onStatus={updateLeadStatus} canDelete={isOwner} onDelete={(id) => handleDelete("inscription_leads", id)} />
            </div>
          )}

          {activeTab === "articles" && (
            <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_380px]">
              <form onSubmit={handleSaveArticle} className={`${cardClass} space-y-4`}>
                <FormTitle title={editingArticleId ? "Modifier l'article" : "Nouvel article"} onCancel={editingArticleId ? () => { setEditingArticleId(null); setArticleForm(emptyArticle); } : undefined} />
                <input placeholder="Titre" value={articleForm.title} onChange={(e) => setArticleForm({ ...articleForm, title: e.target.value })} required className={inputClass} />
                <input placeholder="Résumé" value={articleForm.excerpt} onChange={(e) => setArticleForm({ ...articleForm, excerpt: e.target.value })} className={inputClass} />
                <textarea placeholder="Contenu" value={articleForm.content} onChange={(e) => setArticleForm({ ...articleForm, content: e.target.value })} rows={6} className={inputClass} />
                <input placeholder="Tag" value={articleForm.tag} onChange={(e) => setArticleForm({ ...articleForm, tag: e.target.value })} className={inputClass} />
                <div className="grid gap-3 md:grid-cols-2">
                  <input placeholder="URL de l'image" value={articleForm.image_url} onChange={(e) => setArticleForm({ ...articleForm, image_url: e.target.value })} className={inputClass} />
                  <label className="flex items-center justify-center gap-2 rounded-xl border-2 border-dashed border-zinc-300 px-4 py-2.5 text-sm font-semibold text-zinc-600 hover:border-primary hover:text-primary cursor-pointer transition-colors">
                    <Image className="h-4 w-4" /> Téléverser
                    <input type="file" accept="image/*" className="hidden" onChange={(e) => handleUploadPhoto(e.target.files?.[0], "article")} />
                  </label>
                </div>
                {renderPublishControls(articleForm.publishMode, articleForm.scheduled_at, (mode) => setArticleForm({ ...articleForm, publishMode: mode }), (value) => setArticleForm({ ...articleForm, scheduled_at: value }))}
                <button disabled={saving} className={primaryButton}>{editingArticleId ? <Save className="h-4 w-4" /> : <Plus className="h-4 w-4" />} {editingArticleId ? "Enregistrer" : "Créer"}</button>
              </form>
              <ListPanel title="Articles" rows={articles} render={(a) => <ContentRow row={a} title={a.title} meta={`${statusLabel(a)} · ${a.tag || "Actualité"}`} onEdit={() => { setEditingArticleId(a.id); setArticleForm({ title: a.title || "", excerpt: a.excerpt || "", content: a.content || "", tag: a.tag || "Actualité", image_url: a.image_url || "", publishMode: a.is_published ? (a.scheduled_at && new Date(a.published_at) > new Date() ? "scheduled" : "published") : "draft", scheduled_at: toLocalDateTime(a.scheduled_at || a.published_at) }); }} onDelete={() => handleDelete("blog_articles", a.id)} />} />
            </div>
          )}

          {activeTab === "events" && (
            <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_380px]">
              <form onSubmit={handleSaveEvent} className={`${cardClass} space-y-4`}>
                <FormTitle title={editingEventId ? "Modifier l'événement" : "Nouvel événement"} onCancel={editingEventId ? () => { setEditingEventId(null); setEventForm(emptyEvent); } : undefined} />
                <input placeholder="Titre" value={eventForm.title} onChange={(e) => setEventForm({ ...eventForm, title: e.target.value })} required className={inputClass} />
                <textarea placeholder="Description" value={eventForm.description} onChange={(e) => setEventForm({ ...eventForm, description: e.target.value })} rows={4} className={inputClass} />
                <div className="grid gap-3 md:grid-cols-2">
                  <input placeholder="Lieu" value={eventForm.location} onChange={(e) => setEventForm({ ...eventForm, location: e.target.value })} className={inputClass} />
                  <input type="datetime-local" value={eventForm.event_date} onChange={(e) => setEventForm({ ...eventForm, event_date: e.target.value })} required className={inputClass} />
                </div>
                <div className="grid gap-3 md:grid-cols-2">
                  <input placeholder="URL de l'image" value={eventForm.image_url} onChange={(e) => setEventForm({ ...eventForm, image_url: e.target.value })} className={inputClass} />
                  <label className="flex items-center justify-center gap-2 rounded-xl border-2 border-dashed border-zinc-300 px-4 py-2.5 text-sm font-semibold text-zinc-600 hover:border-primary hover:text-primary cursor-pointer transition-colors">
                    <Image className="h-4 w-4" /> Téléverser
                    <input type="file" accept="image/*" className="hidden" onChange={(e) => handleUploadPhoto(e.target.files?.[0], "event")} />
                  </label>
                </div>
                {renderPublishControls(eventForm.publishMode, eventForm.scheduled_at, (mode) => setEventForm({ ...eventForm, publishMode: mode }), (value) => setEventForm({ ...eventForm, scheduled_at: value }))}
                <button disabled={saving} className={primaryButton}>{editingEventId ? <Save className="h-4 w-4" /> : <Plus className="h-4 w-4" />} {editingEventId ? "Enregistrer" : "Créer"}</button>
              </form>
              <ListPanel title="Événements" rows={events} render={(ev) => <ContentRow row={ev} title={ev.title} meta={`${statusLabel(ev)} · ${ev.location || "ECIN"}`} onEdit={() => { setEditingEventId(ev.id); setEventForm({ title: ev.title || "", description: ev.description || "", location: ev.location || "", event_date: toLocalDateTime(ev.event_date), image_url: ev.image_url || "", publishMode: ev.is_published ? (ev.scheduled_at && new Date(ev.published_at) > new Date() ? "scheduled" : "published") : "draft", scheduled_at: toLocalDateTime(ev.scheduled_at || ev.published_at) }); }} onDelete={() => handleDelete("events", ev.id)} />} />
            </div>
          )}

          {activeTab === "photos" && (
            <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_380px]">
              <form onSubmit={handleSavePhoto} className={`${cardClass} space-y-4`}>
                <FormTitle title={editingPhotoId ? "Modifier la photo" : "Ajouter une photo"} onCancel={editingPhotoId ? () => { setEditingPhotoId(null); setPhotoForm(emptyPhoto); } : undefined} />
                <input placeholder="Titre" value={photoForm.title} onChange={(e) => setPhotoForm({ ...photoForm, title: e.target.value })} className={inputClass} />
                <input placeholder="URL de l'image (ou téléverse ci-dessous)" value={photoForm.image_url} onChange={(e) => setPhotoForm({ ...photoForm, image_url: e.target.value })} className={inputClass} />
                <label className="flex items-center justify-center gap-2 rounded-xl border-2 border-dashed border-zinc-300 px-4 py-3 text-sm font-semibold text-zinc-600 hover:border-primary hover:text-primary cursor-pointer transition-colors">
                  <Image className="h-4 w-4" />
                  Téléverser une image
                  <input type="file" accept="image/*" className="hidden" onChange={(e) => handleUploadPhoto(e.target.files?.[0], "photo")} />
                </label>
                {photoForm.image_url && <img src={photoForm.image_url} alt="Aperçu" className="h-32 w-full object-cover rounded-lg border" />}
                <input placeholder="Texte alternatif" value={photoForm.alt_text} onChange={(e) => setPhotoForm({ ...photoForm, alt_text: e.target.value })} className={inputClass} />
                {renderPublishControls(photoForm.publishMode, photoForm.scheduled_at, (mode) => setPhotoForm({ ...photoForm, publishMode: mode }), (value) => setPhotoForm({ ...photoForm, scheduled_at: value }))}
                <button disabled={saving} className={primaryButton}>{editingPhotoId ? <Save className="h-4 w-4" /> : <Plus className="h-4 w-4" />} {editingPhotoId ? "Enregistrer" : "Ajouter"}</button>
              </form>
              <ListPanel title="Photos" rows={photos} render={(p) => <ContentRow row={p} title={p.title || p.alt_text || "Photo ECIN"} meta={statusLabel(p)} image={p.image_url} onEdit={() => { setEditingPhotoId(p.id); setPhotoForm({ title: p.title || "", image_url: p.image_url || "", alt_text: p.alt_text || "", span: p.span || "col-span-1 row-span-1", publishMode: p.is_published ? (p.scheduled_at && new Date(p.published_at) > new Date() ? "scheduled" : "published") : "draft", scheduled_at: toLocalDateTime(p.scheduled_at || p.published_at) }); }} onDelete={() => handleDelete("photos", p.id)} />} />
            </div>
          )}

          {activeTab === "team" && isOwner && (
            <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_380px]">
              <form onSubmit={handleCreateTeamMember} className={`${cardClass} space-y-4`}>
                <h2 className="text-lg font-bold text-zinc-900">Ajouter un admin</h2>
                <input placeholder="Nom" value={teamForm.display_name} onChange={(e) => setTeamForm({ ...teamForm, display_name: e.target.value })} className={inputClass} />
                <input type="email" placeholder="Email" value={teamForm.email} onChange={(e) => setTeamForm({ ...teamForm, email: e.target.value })} required className={inputClass} />
                <input type="password" placeholder="Mot de passe (8 caractères min.)" value={teamForm.password} onChange={(e) => setTeamForm({ ...teamForm, password: e.target.value })} required minLength={8} className={inputClass} />
                <button disabled={saving} className={primaryButton}><Users className="h-4 w-4" /> Créer l'admin</button>
              </form>
              <ListPanel title="Équipe" rows={team} render={(member) => (
                <div className="flex items-center gap-3 rounded-xl border border-zinc-200 p-3">
                  <div className="grid h-10 w-10 place-items-center rounded-full text-sm font-bold text-zinc-700" style={{ background: avatarColor(member.email || "") }}>
                    {initials(member.display_name || member.email)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-semibold text-zinc-900">{member.display_name || "Admin ECIN"}</p>
                    <p className="truncate text-xs text-zinc-500">{member.email}</p>
                  </div>
                </div>
              )} />
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

const StatCard = ({ label, value, icon: Icon, trend, tone }: { label: string; value: number; icon: any; trend: string; tone: "blue" | "amber" | "emerald" | "violet" }) => {
  const tones: Record<string, string> = {
    blue: "bg-blue-50 text-blue-600",
    amber: "bg-amber-50 text-amber-600",
    emerald: "bg-emerald-50 text-emerald-600",
    violet: "bg-violet-50 text-violet-600",
  };
  return (
    <div className="rounded-2xl border border-zinc-200/70 bg-white p-5 shadow-[0_1px_2px_rgba(0,0,0,0.04)] transition hover:shadow-md">
      <div className="flex items-start justify-between">
        <div className={`grid h-10 w-10 place-items-center rounded-xl ${tones[tone]}`}>
          <Icon className="h-5 w-5" />
        </div>
        <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-zinc-600">{trend}</span>
      </div>
      <p className="mt-4 text-3xl font-bold tracking-tight text-zinc-900">{value}</p>
      <p className="mt-0.5 text-sm text-zinc-500">{label}</p>
    </div>
  );
};

const LeadsTable = ({ leads, onStatus, canDelete, onDelete }: { leads: any[]; onStatus: (id: string, status: string) => void; canDelete?: boolean; onDelete?: (id: string) => void }) => {
  if (!leads.length) {
    return (
      <div className="grid place-items-center rounded-xl border border-dashed border-zinc-200 bg-zinc-50/50 py-16 text-center">
        <Inbox className="mb-2 h-8 w-8 text-zinc-300" />
        <p className="text-sm font-semibold text-zinc-700">Aucune inscription</p>
        <p className="text-xs text-zinc-500">Les nouvelles demandes apparaîtront ici.</p>
      </div>
    );
  }
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[760px] border-separate border-spacing-0">
        <thead>
          <tr className="text-left text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
            <th className="border-b border-zinc-200/70 px-4 py-3">Candidat</th>
            <th className="border-b border-zinc-200/70 px-4 py-3">Programme</th>
            <th className="border-b border-zinc-200/70 px-4 py-3">Contact</th>
            <th className="border-b border-zinc-200/70 px-4 py-3">Reçu</th>
            <th className="border-b border-zinc-200/70 px-4 py-3">Statut</th>
            <th className="border-b border-zinc-200/70 px-4 py-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {leads.map((lead) => (
            <>
            <tr key={lead.id} className="group transition hover:bg-zinc-50/70 align-top">
              <td className="border-b border-zinc-100 px-4 py-3.5">
                <div className="flex items-start gap-3">
                  <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-xs font-bold text-zinc-700" style={{ background: avatarColor(lead.full_name || "?") }}>
                    {initials(lead.full_name)}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-zinc-900 break-words">{lead.full_name}</p>
                  </div>
                </div>
              </td>
              <td className="border-b border-zinc-100 px-4 py-3.5">
                <span className="inline-flex items-center rounded-md bg-zinc-100 px-2 py-1 text-xs font-semibold text-zinc-700">
                  {lead.programme}
                </span>
              </td>
              <td className="border-b border-zinc-100 px-4 py-3.5">
                <div className="space-y-0.5">
                  <a href={`tel:${lead.phone}`} className="flex items-center gap-1.5 text-xs text-zinc-700 hover:text-zinc-900">
                    <Phone className="h-3 w-3 text-zinc-400" /> {lead.phone}
                  </a>
                  {lead.email && (
                    <a href={`mailto:${lead.email}`} className="flex items-center gap-1.5 text-xs text-zinc-500 hover:text-zinc-900 break-all">
                      <Mail className="h-3 w-3 text-zinc-400" /> {lead.email}
                    </a>
                  )}
                </div>
              </td>
              <td className="border-b border-zinc-100 px-4 py-3.5 text-xs text-zinc-500 whitespace-nowrap">
                {formatDate(lead.created_at)}
              </td>
              <td className="border-b border-zinc-100 px-4 py-3.5">
                <select
                  value={lead.status}
                  onChange={(e) => onStatus(lead.id, e.target.value)}
                  className={`cursor-pointer appearance-none rounded-full border-0 px-3 py-1 text-xs font-semibold outline-none ${leadStatusStyles[lead.status] || leadStatusStyles.nouveau}`}
                >
                  <option value="nouveau">Nouveau</option>
                  <option value="contacté">Contacté</option>
                  <option value="converti">Converti</option>
                  <option value="archivé">Archivé</option>
                </select>
              </td>
              <td className="border-b border-zinc-100 px-4 py-3.5 text-right">
                <div className="flex items-center justify-end gap-1 opacity-60 transition group-hover:opacity-100">
                  <a
                    href={`https://wa.me/${(lead.phone || "").replace(/\D/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-lg border border-zinc-200 px-2.5 py-1 text-[11px] font-semibold text-zinc-700 hover:bg-zinc-50"
                  >
                    WhatsApp
                  </a>
                  {canDelete && onDelete && (
                    <button onClick={() => onDelete(lead.id)} className="rounded-lg p-1.5 text-zinc-400 hover:bg-red-50 hover:text-red-600">
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  )}
                </div>
              </td>
            </tr>
            {lead.message && (
              <tr key={`${lead.id}-details`} className="bg-zinc-50/40">
                <td colSpan={6} className="border-b border-zinc-100 px-4 pb-4 pt-0">
                  <div className="rounded-lg border border-zinc-200 bg-white p-3">
                    <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-zinc-500">Qualification du prospect</p>
                    <pre className="whitespace-pre-wrap break-words font-sans text-xs leading-relaxed text-zinc-700">{lead.message}</pre>
                  </div>
                </td>
              </tr>
            )}
            </>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const FormTitle = ({ title, onCancel }: { title: string; onCancel?: () => void }) => (
  <div className="flex items-center justify-between gap-4">
    <h2 className="text-lg font-bold text-zinc-900">{title}</h2>
    {onCancel && <button type="button" onClick={onCancel} className="rounded-lg p-2 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-700"><X className="h-4 w-4" /></button>}
  </div>
);

const ListPanel = ({ title, rows, render }: { title: string; rows: any[]; render: (row: any) => React.ReactNode }) => (
  <div className="rounded-2xl border border-zinc-200/70 bg-white p-5 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
    <h3 className="mb-4 text-base font-bold text-zinc-900">{title}</h3>
    <div className="max-h-[720px] space-y-2.5 overflow-y-auto pr-1">
      {rows.length ? rows.map((row) => <div key={row.id}>{render(row)}</div>) : <p className="py-8 text-center text-sm text-zinc-400">Aucun élément.</p>}
    </div>
  </div>
);

const ContentRow = ({ title, meta, image, onEdit, onDelete }: { row: any; title: string; meta: string; image?: string; onEdit: () => void; onDelete: () => void }) => (
  <div className="group flex items-center gap-3 rounded-xl border border-zinc-200 p-3 transition hover:border-zinc-300 hover:bg-zinc-50/60">
    {image ? (
      <img src={image} alt={title} className="h-12 w-12 rounded-lg object-cover" />
    ) : (
      <div className="grid h-12 w-12 place-items-center rounded-lg bg-zinc-100 text-zinc-400">
        <FileText className="h-5 w-5" />
      </div>
    )}
    <div className="min-w-0 flex-1">
      <p className="truncate text-sm font-semibold text-zinc-900">{title}</p>
      <p className="text-xs text-zinc-500">{meta}</p>
    </div>
    <button onClick={onEdit} className="rounded-lg p-2 text-zinc-400 opacity-60 transition hover:bg-zinc-100 hover:text-zinc-900 group-hover:opacity-100"><Edit3 className="h-4 w-4" /></button>
    <button onClick={onDelete} className="rounded-lg p-2 text-zinc-400 opacity-60 transition hover:bg-red-50 hover:text-red-600 group-hover:opacity-100"><Trash2 className="h-4 w-4" /></button>
  </div>
);

export default AdminDashboard;
