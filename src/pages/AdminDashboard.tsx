import { useEffect, useMemo, useState } from "react";
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
  Plus,
  Save,
  Shield,
  Trash2,
  Users,
  X,
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

const AdminDashboard = () => {
  const [user, setUser] = useState<any>(null);
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const [saving, setSaving] = useState(false);
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
    published: articles.filter((article) => article.is_published).length,
    scheduled: articles.filter((article) => article.scheduled_at && article.published_at && new Date(article.published_at) > new Date()).length,
  }), [leads, articles]);

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
    const { error } = await supabase.functions.invoke("create-team-member", { body: teamForm });
    setSaving(false);
    if (error) return toast({ title: "Erreur", description: error.message, variant: "destructive" });
    toast({ title: "Admin créé", description: teamForm.email });
    setTeamForm(emptyTeam); loadData();
  };

  const handleLogout = async () => { await supabase.auth.signOut(); navigate("/login"); };

  if (loading) return <div className="min-h-screen bg-background flex items-center justify-center text-muted-foreground">Chargement...</div>;

  const tabs: { key: Tab; label: string; icon: any; ownerOnly?: boolean }[] = [
    { key: "overview", label: "Vue générale", icon: LayoutDashboard },
    { key: "inscriptions", label: "Inscriptions", icon: Inbox },
    { key: "articles", label: "Articles", icon: FileText },
    { key: "events", label: "Événements", icon: Calendar },
    { key: "photos", label: "Photos", icon: Image },
    { key: "team", label: "Équipe", icon: Users, ownerOnly: true },
  ];

  const inputClass = "w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground outline-none transition focus:ring-2 focus:ring-ring";
  const cardClass = "rounded-2xl border border-border bg-background p-6 shadow-sm";
  const primaryButton = "inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-bold text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-60";
  const ghostButton = "inline-flex items-center justify-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-semibold text-foreground hover:bg-secondary";

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
    <div className="min-h-screen bg-secondary/40">
      <header className="border-b border-border bg-background">
        <div className="container flex h-20 items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-primary">ECIN Admin</p>
            <h1 className="text-xl font-extrabold text-foreground">Dashboard</h1>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden rounded-full bg-accent px-3 py-1 text-xs font-bold text-accent-foreground sm:inline-flex">
              <Shield className="mr-1 h-3 w-3" /> {isOwner ? "Owner" : "Admin"}
            </span>
            <button onClick={handleLogout} className={ghostButton}><LogOut className="h-4 w-4" /> Déconnexion</button>
          </div>
        </div>
      </header>

      <main className="container grid gap-8 py-8 lg:grid-cols-[250px_1fr]">
        <aside className="h-fit rounded-2xl border border-border bg-background p-3 shadow-sm lg:sticky lg:top-6">
          <nav className="flex gap-2 overflow-x-auto lg:flex-col lg:overflow-visible">
            {tabs.filter((tab) => !tab.ownerOnly || isOwner).map((tab) => (
              <button key={tab.key} onClick={() => setActiveTab(tab.key)} className={`flex min-w-fit items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold transition-colors ${activeTab === tab.key ? "bg-primary text-primary-foreground" : "text-foreground/75 hover:bg-secondary hover:text-foreground"}`}>
                <tab.icon className="h-4 w-4" /> {tab.label}
              </button>
            ))}
          </nav>
        </aside>

        <section className="space-y-6">
          {activeTab === "overview" && (
            <div className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {[{ label: "Leads reçus", value: stats.leads, icon: Inbox }, { label: "À traiter", value: stats.pending, icon: Clock }, { label: "Articles publiés", value: stats.published, icon: CheckCircle2 }, { label: "Articles programmés", value: stats.scheduled, icon: Calendar }].map((item) => (
                  <div key={item.label} className={cardClass}>
                    <item.icon className="mb-4 h-5 w-5 text-primary" />
                    <p className="text-3xl font-extrabold text-foreground">{item.value}</p>
                    <p className="text-sm font-medium text-muted-foreground">{item.label}</p>
                  </div>
                ))}
              </div>
              <div className={cardClass}>
                <h2 className="mb-4 text-lg font-extrabold text-foreground">Dernières inscriptions</h2>
                <div className="space-y-3">
                  {leads.map((lead) => <LeadRow key={lead.id} lead={lead} onStatus={updateLeadStatus} />)}
                </div>
              </div>
            </div>
          )}

          {activeTab === "inscriptions" && (
            <div className={cardClass}>
              <h2 className="mb-5 text-2xl font-extrabold text-foreground">Inscriptions</h2>
              <div className="space-y-3">{leads.map((lead) => <LeadRow key={lead.id} lead={lead} onStatus={updateLeadStatus} canDelete={isOwner} onDelete={() => handleDelete("inscription_leads", lead.id)} />)}</div>
            </div>
          )}

          {activeTab === "articles" && (
            <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_380px]">
              <form onSubmit={handleSaveArticle} className={`${cardClass} space-y-4`}>
                <FormTitle title={editingArticleId ? "Modifier l'article" : "Nouvel article"} onCancel={editingArticleId ? () => { setEditingArticleId(null); setArticleForm(emptyArticle); } : undefined} />
                <input placeholder="Titre" value={articleForm.title} onChange={(e) => setArticleForm({ ...articleForm, title: e.target.value })} required className={inputClass} />
                <input placeholder="Résumé" value={articleForm.excerpt} onChange={(e) => setArticleForm({ ...articleForm, excerpt: e.target.value })} className={inputClass} />
                <textarea placeholder="Contenu" value={articleForm.content} onChange={(e) => setArticleForm({ ...articleForm, content: e.target.value })} rows={6} className={inputClass} />
                <div className="grid gap-3 md:grid-cols-2"><input placeholder="Tag" value={articleForm.tag} onChange={(e) => setArticleForm({ ...articleForm, tag: e.target.value })} className={inputClass} /><input placeholder="URL de l'image" value={articleForm.image_url} onChange={(e) => setArticleForm({ ...articleForm, image_url: e.target.value })} className={inputClass} /></div>
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
                <div className="grid gap-3 md:grid-cols-2"><input placeholder="Lieu" value={eventForm.location} onChange={(e) => setEventForm({ ...eventForm, location: e.target.value })} className={inputClass} /><input type="datetime-local" value={eventForm.event_date} onChange={(e) => setEventForm({ ...eventForm, event_date: e.target.value })} required className={inputClass} /></div>
                <input placeholder="URL de l'image" value={eventForm.image_url} onChange={(e) => setEventForm({ ...eventForm, image_url: e.target.value })} className={inputClass} />
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
                <input placeholder="URL de l'image" value={photoForm.image_url} onChange={(e) => setPhotoForm({ ...photoForm, image_url: e.target.value })} required className={inputClass} />
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
                <h2 className="text-2xl font-extrabold text-foreground">Ajouter un admin</h2>
                <input placeholder="Nom" value={teamForm.display_name} onChange={(e) => setTeamForm({ ...teamForm, display_name: e.target.value })} className={inputClass} />
                <input type="email" placeholder="Email" value={teamForm.email} onChange={(e) => setTeamForm({ ...teamForm, email: e.target.value })} required className={inputClass} />
                <input type="password" placeholder="Mot de passe" value={teamForm.password} onChange={(e) => setTeamForm({ ...teamForm, password: e.target.value })} required minLength={8} className={inputClass} />
                <button disabled={saving} className={primaryButton}><Users className="h-4 w-4" /> Créer l'admin</button>
              </form>
              <ListPanel title="Équipe" rows={team} render={(member) => <div className="rounded-xl border border-border p-4"><p className="font-bold text-foreground">{member.display_name || "Admin ECIN"}</p><p className="text-sm text-muted-foreground">{member.email}</p></div>} />
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

const FormTitle = ({ title, onCancel }: { title: string; onCancel?: () => void }) => (
  <div className="flex items-center justify-between gap-4">
    <h2 className="text-2xl font-extrabold text-foreground">{title}</h2>
    {onCancel && <button type="button" onClick={onCancel} className="rounded-full p-2 text-muted-foreground hover:bg-secondary hover:text-foreground"><X className="h-4 w-4" /></button>}
  </div>
);

const LeadRow = ({ lead, onStatus, canDelete, onDelete }: { lead: any; onStatus: (id: string, status: string) => void; canDelete?: boolean; onDelete?: () => void }) => (
  <div className="grid gap-4 rounded-xl border border-border p-4 md:grid-cols-[1fr_auto] md:items-center">
    <div>
      <div className="flex flex-wrap items-center gap-2"><p className="font-extrabold text-foreground">{lead.full_name}</p><span className="rounded-full bg-accent px-2.5 py-1 text-xs font-bold text-accent-foreground">{lead.programme}</span></div>
      <p className="mt-1 text-sm text-muted-foreground">{lead.phone}{lead.email ? ` · ${lead.email}` : ""}</p>
      {lead.message && <p className="mt-2 text-sm text-foreground/75">{lead.message}</p>}
    </div>
    <div className="flex items-center gap-2">
      <select value={lead.status} onChange={(e) => onStatus(lead.id, e.target.value)} className="rounded-full border border-input bg-background px-3 py-2 text-xs font-bold text-foreground">
        <option value="nouveau">Nouveau</option><option value="contacté">Contacté</option><option value="converti">Converti</option><option value="archivé">Archivé</option>
      </select>
      {canDelete && <button onClick={onDelete} className="rounded-full p-2 text-destructive hover:bg-secondary"><Trash2 className="h-4 w-4" /></button>}
    </div>
  </div>
);

const ListPanel = ({ title, rows, render }: { title: string; rows: any[]; render: (row: any) => React.ReactNode }) => (
  <div className="rounded-2xl border border-border bg-background p-4 shadow-sm">
    <h3 className="mb-4 text-lg font-extrabold text-foreground">{title}</h3>
    <div className="max-h-[720px] space-y-3 overflow-y-auto pr-1">{rows.length ? rows.map((row) => <div key={row.id}>{render(row)}</div>) : <p className="py-8 text-center text-sm text-muted-foreground">Aucun élément.</p>}</div>
  </div>
);

const ContentRow = ({ title, meta, image, onEdit, onDelete }: { row: any; title: string; meta: string; image?: string; onEdit: () => void; onDelete: () => void }) => (
  <div className="flex items-center gap-3 rounded-xl border border-border p-3">
    {image && <img src={image} alt={title} className="h-14 w-14 rounded-lg object-cover" />}
    <div className="min-w-0 flex-1"><p className="truncate font-bold text-foreground">{title}</p><p className="text-xs text-muted-foreground">{meta}</p></div>
    <button onClick={onEdit} className="rounded-full p-2 text-muted-foreground hover:bg-secondary hover:text-primary"><Edit3 className="h-4 w-4" /></button>
    <button onClick={onDelete} className="rounded-full p-2 text-destructive hover:bg-secondary"><Trash2 className="h-4 w-4" /></button>
  </div>
);

export default AdminDashboard;
