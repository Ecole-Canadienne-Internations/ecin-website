import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

// Cast to bypass generated types until they're regenerated
const db = supabase as any;
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { LogOut, Plus, Trash2, Users, Image, FileText, Calendar } from "lucide-react";

type Tab = "articles" | "events" | "photos" | "admins";

const AdminDashboard = () => {
  const [user, setUser] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<Tab>("articles");
  const navigate = useNavigate();

  // Articles state
  const [articles, setArticles] = useState<any[]>([]);
  const [articleForm, setArticleForm] = useState({ title: "", excerpt: "", content: "", tag: "Actualité", image_url: "", is_published: false });
  
  // Events state
  const [events, setEvents] = useState<any[]>([]);
  const [eventForm, setEventForm] = useState({ title: "", description: "", location: "", event_date: "", image_url: "", is_published: false });
  
  // Photos state
  const [photos, setPhotos] = useState<any[]>([]);
  const [photoForm, setPhotoForm] = useState({ image_url: "", alt_text: "" });

  // Admin invite state
  const [inviteEmail, setInviteEmail] = useState("");

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) { navigate("/login"); return; }
      setUser(session.user);

      const { data: roles } = await supabase.from("user_roles").select("role").eq("user_id", session.user.id);
      if (roles && roles.length > 0) {
        setIsAdmin(true);
      } else {
        navigate("/");
        toast({ title: "Accès refusé", description: "Vous n'êtes pas administrateur.", variant: "destructive" });
        return;
      }
      setLoading(false);
    };
    checkAuth();
  }, [navigate]);

  useEffect(() => {
    if (!isAdmin) return;
    loadData();
  }, [isAdmin, activeTab]);

  const loadData = async () => {
    if (activeTab === "articles") {
      const { data } = await supabase.from("blog_articles").select("*").order("created_at", { ascending: false });
      setArticles(data || []);
    } else if (activeTab === "events") {
      const { data } = await supabase.from("events").select("*").order("event_date", { ascending: true });
      setEvents(data || []);
    } else if (activeTab === "photos") {
      const { data } = await supabase.from("photos").select("*").order("created_at", { ascending: false });
      setPhotos(data || []);
    }
  };

  const handleAddArticle = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.from("blog_articles").insert({
      ...articleForm,
      author_id: user.id,
      published_at: articleForm.is_published ? new Date().toISOString() : null,
    });
    if (error) { toast({ title: "Erreur", description: error.message, variant: "destructive" }); return; }
    toast({ title: "Article créé !" });
    setArticleForm({ title: "", excerpt: "", content: "", tag: "Actualité", image_url: "", is_published: false });
    loadData();
  };

  const handleAddEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.from("events").insert(eventForm);
    if (error) { toast({ title: "Erreur", description: error.message, variant: "destructive" }); return; }
    toast({ title: "Événement créé !" });
    setEventForm({ title: "", description: "", location: "", event_date: "", image_url: "", is_published: false });
    loadData();
  };

  const handleAddPhoto = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.from("photos").insert({ ...photoForm, is_published: true });
    if (error) { toast({ title: "Erreur", description: error.message, variant: "destructive" }); return; }
    toast({ title: "Photo ajoutée !" });
    setPhotoForm({ image_url: "", alt_text: "" });
    loadData();
  };

  const handleDelete = async (table: string, id: string) => {
    const { error } = await supabase.from(table).delete().eq("id", id);
    if (error) { toast({ title: "Erreur", description: error.message, variant: "destructive" }); return; }
    toast({ title: "Supprimé !" });
    loadData();
  };

  const handleInviteAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    // Create user via signup, then add admin role
    const { data, error } = await supabase.auth.signUp({ email: inviteEmail, password: crypto.randomUUID() });
    if (error) { toast({ title: "Erreur", description: error.message, variant: "destructive" }); return; }
    if (data.user) {
      await (supabase as any).from("user_roles").insert({ user_id: data.user.id, role: "admin" });
      toast({ title: "Admin invité", description: `Un email a été envoyé à ${inviteEmail}` });
    }
    setInviteEmail("");
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  if (loading) return <div className="min-h-screen bg-background flex items-center justify-center text-muted-foreground">Chargement...</div>;

  const tabs: { key: Tab; label: string; icon: any }[] = [
    { key: "articles", label: "Articles", icon: FileText },
    { key: "events", label: "Événements", icon: Calendar },
    { key: "photos", label: "Photos", icon: Image },
    { key: "admins", label: "Admins", icon: Users },
  ];

  const inputClass = "w-full px-4 py-3 border border-border rounded-lg text-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary";

  return (
    <div className="min-h-screen bg-secondary">
      <header className="bg-background border-b border-border">
        <div className="container flex items-center justify-between h-16">
          <h1 className="text-lg font-bold text-foreground">Dashboard Admin ECIN</h1>
          <button onClick={handleLogout} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary">
            <LogOut className="w-4 h-4" /> Déconnexion
          </button>
        </div>
      </header>

      <div className="container py-8">
        {/* Tabs */}
        <div className="flex gap-2 mb-8 flex-wrap">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setActiveTab(t.key)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === t.key ? "bg-primary text-primary-foreground" : "bg-background text-foreground/70 hover:bg-background/80"
              }`}
            >
              <t.icon className="w-4 h-4" />
              {t.label}
            </button>
          ))}
        </div>

        {/* Articles Tab */}
        {activeTab === "articles" && (
          <div className="space-y-6">
            <form onSubmit={handleAddArticle} className="bg-background rounded-xl border border-border p-6 space-y-4">
              <h2 className="text-lg font-bold text-foreground">Nouvel article</h2>
              <input placeholder="Titre" value={articleForm.title} onChange={(e) => setArticleForm({ ...articleForm, title: e.target.value })} required className={inputClass} />
              <input placeholder="Résumé" value={articleForm.excerpt} onChange={(e) => setArticleForm({ ...articleForm, excerpt: e.target.value })} className={inputClass} />
              <textarea placeholder="Contenu" value={articleForm.content} onChange={(e) => setArticleForm({ ...articleForm, content: e.target.value })} rows={5} className={inputClass} />
              <input placeholder="Tag (ex: Campus, Événement)" value={articleForm.tag} onChange={(e) => setArticleForm({ ...articleForm, tag: e.target.value })} className={inputClass} />
              <input placeholder="URL de l'image" value={articleForm.image_url} onChange={(e) => setArticleForm({ ...articleForm, image_url: e.target.value })} className={inputClass} />
              <label className="flex items-center gap-2 text-sm text-foreground">
                <input type="checkbox" checked={articleForm.is_published} onChange={(e) => setArticleForm({ ...articleForm, is_published: e.target.checked })} />
                Publier immédiatement
              </label>
              <button type="submit" className="bg-primary text-primary-foreground px-6 py-2.5 rounded-lg text-sm font-semibold hover:opacity-90">
                <Plus className="w-4 h-4 inline mr-1" /> Créer
              </button>
            </form>
            <div className="space-y-3">
              {articles.map((a) => (
                <div key={a.id} className="bg-background rounded-lg border border-border p-4 flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-foreground">{a.title}</p>
                    <p className="text-xs text-muted-foreground">{a.is_published ? "Publié" : "Brouillon"} · {a.tag}</p>
                  </div>
                  <button onClick={() => handleDelete("blog_articles", a.id)} className="text-destructive hover:opacity-70"><Trash2 className="w-4 h-4" /></button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Events Tab */}
        {activeTab === "events" && (
          <div className="space-y-6">
            <form onSubmit={handleAddEvent} className="bg-background rounded-xl border border-border p-6 space-y-4">
              <h2 className="text-lg font-bold text-foreground">Nouvel événement</h2>
              <input placeholder="Titre" value={eventForm.title} onChange={(e) => setEventForm({ ...eventForm, title: e.target.value })} required className={inputClass} />
              <textarea placeholder="Description" value={eventForm.description} onChange={(e) => setEventForm({ ...eventForm, description: e.target.value })} rows={3} className={inputClass} />
              <input placeholder="Lieu" value={eventForm.location} onChange={(e) => setEventForm({ ...eventForm, location: e.target.value })} className={inputClass} />
              <input type="datetime-local" value={eventForm.event_date} onChange={(e) => setEventForm({ ...eventForm, event_date: e.target.value })} required className={inputClass} />
              <input placeholder="URL de l'image" value={eventForm.image_url} onChange={(e) => setEventForm({ ...eventForm, image_url: e.target.value })} className={inputClass} />
              <label className="flex items-center gap-2 text-sm text-foreground">
                <input type="checkbox" checked={eventForm.is_published} onChange={(e) => setEventForm({ ...eventForm, is_published: e.target.checked })} />
                Publier
              </label>
              <button type="submit" className="bg-primary text-primary-foreground px-6 py-2.5 rounded-lg text-sm font-semibold hover:opacity-90">
                <Plus className="w-4 h-4 inline mr-1" /> Créer
              </button>
            </form>
            <div className="space-y-3">
              {events.map((ev) => (
                <div key={ev.id} className="bg-background rounded-lg border border-border p-4 flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-foreground">{ev.title}</p>
                    <p className="text-xs text-muted-foreground">{ev.location} · {new Date(ev.event_date).toLocaleDateString("fr-FR")}</p>
                  </div>
                  <button onClick={() => handleDelete("events", ev.id)} className="text-destructive hover:opacity-70"><Trash2 className="w-4 h-4" /></button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Photos Tab */}
        {activeTab === "photos" && (
          <div className="space-y-6">
            <form onSubmit={handleAddPhoto} className="bg-background rounded-xl border border-border p-6 space-y-4">
              <h2 className="text-lg font-bold text-foreground">Ajouter une photo</h2>
              <input placeholder="URL de l'image" value={photoForm.image_url} onChange={(e) => setPhotoForm({ ...photoForm, image_url: e.target.value })} required className={inputClass} />
              <input placeholder="Description (alt text)" value={photoForm.alt_text} onChange={(e) => setPhotoForm({ ...photoForm, alt_text: e.target.value })} className={inputClass} />
              <button type="submit" className="bg-primary text-primary-foreground px-6 py-2.5 rounded-lg text-sm font-semibold hover:opacity-90">
                <Plus className="w-4 h-4 inline mr-1" /> Ajouter
              </button>
            </form>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {photos.map((p) => (
                <div key={p.id} className="relative rounded-lg overflow-hidden group">
                  <img src={p.image_url} alt={p.alt_text} className="w-full h-40 object-cover" />
                  <button
                    onClick={() => handleDelete("photos", p.id)}
                    className="absolute top-2 right-2 bg-destructive text-destructive-foreground p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Admins Tab */}
        {activeTab === "admins" && (
          <div className="space-y-6">
            <form onSubmit={handleInviteAdmin} className="bg-background rounded-xl border border-border p-6 space-y-4">
              <h2 className="text-lg font-bold text-foreground">Inviter un nouvel admin</h2>
              <input type="email" placeholder="Email du nouvel admin" value={inviteEmail} onChange={(e) => setInviteEmail(e.target.value)} required className={inputClass} />
              <button type="submit" className="bg-primary text-primary-foreground px-6 py-2.5 rounded-lg text-sm font-semibold hover:opacity-90">
                <Users className="w-4 h-4 inline mr-1" /> Inviter
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
