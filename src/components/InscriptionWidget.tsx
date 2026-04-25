import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, GraduationCap, Loader2, Phone, Send, Sparkles, X } from "lucide-react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

const db = supabase as any;

const programmes = [
  "DTI",
  "ALC",
  "Prépa Sport-Études",
  "Prépa Canada",
  "Prépa France",
  "Prépa Angleterre",
];

const leadSchema = z.object({
  full_name: z.string().trim().min(2, "Nom trop court").max(120),
  phone: z.string().trim().min(6, "Numéro invalide").max(40),
  email: z.string().trim().email("Email invalide").max(255).optional().or(z.literal("")),
  programme: z.enum(["DTI", "ALC", "Prépa Sport-Études", "Prépa Canada", "Prépa France", "Prépa Angleterre"]),
  message: z.string().trim().max(800).optional(),
});

const InscriptionWidget = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({
    full_name: "",
    phone: "",
    email: "",
    programme: "DTI",
    message: "",
  });

  const whatsappText = useMemo(
    () => encodeURIComponent(`Bonjour, je souhaite m'inscrire à ECIN. Filière: ${form.programme}.`),
    [form.programme],
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = leadSchema.safeParse(form);
    if (!parsed.success) {
      toast({ title: "Vérifie le formulaire", description: parsed.error.errors[0]?.message, variant: "destructive" });
      return;
    }

    setLoading(true);
    const payload = {
      ...parsed.data,
      email: parsed.data.email || null,
      message: parsed.data.message || null,
      source: "widget_landing",
    };
    const { error } = await db.from("inscription_leads").insert(payload);
    setLoading(false);

    if (error) {
      toast({ title: "Erreur", description: error.message, variant: "destructive" });
      return;
    }

    setSent(true);
    toast({ title: "Inscription reçue", description: "L'équipe ECIN vous contactera rapidement." });
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-bold text-primary-foreground shadow-xl shadow-primary/25 transition-transform hover:scale-105 md:bottom-8"
      >
        <Sparkles className="h-4 w-4" /> Inscription rapide
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[80] flex items-center justify-center bg-foreground/35 px-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 28, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.96 }}
              transition={{ type: "spring", stiffness: 260, damping: 24 }}
              className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-border bg-background shadow-2xl"
            >
              <div className="border-b border-border bg-secondary/40 px-6 py-5">
                <button
                  onClick={() => setOpen(false)}
                  className="absolute right-4 top-4 rounded-full p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                  aria-label="Fermer"
                >
                  <X className="h-4 w-4" />
                </button>
                <div className="flex items-center gap-3 pr-10">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <GraduationCap className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wide text-primary">École Canadienne Inter-Nations</p>
                    <h2 className="text-xl font-extrabold text-foreground">Démarrer mon inscription</h2>
                  </div>
                </div>
              </div>

              {sent ? (
                <div className="space-y-5 p-6 text-center">
                  <CheckCircle2 className="mx-auto h-14 w-14 text-primary" />
                  <div>
                    <h3 className="text-2xl font-extrabold text-foreground">Demande envoyée</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      Votre demande est enregistrée. Vous pouvez aussi continuer directement sur WhatsApp.
                    </p>
                  </div>
                  <div className="flex flex-col gap-3 sm:flex-row">
                    <a
                      href={`https://wa.me/16476926009?text=${whatsappText}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-bold text-primary-foreground"
                    >
                      <Phone className="h-4 w-4" /> WhatsApp
                    </a>
                    <button onClick={() => setOpen(false)} className="rounded-full border border-border px-5 py-3 text-sm font-bold text-foreground">
                      Fermer
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 p-6">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="space-y-1.5 sm:col-span-2">
                      <span className="text-xs font-bold text-foreground">Nom complet</span>
                      <input
                        value={form.full_name}
                        onChange={(e) => setForm({ ...form, full_name: e.target.value })}
                        className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground outline-none transition focus:ring-2 focus:ring-ring"
                        placeholder="Votre nom"
                        required
                      />
                    </label>
                    <label className="space-y-1.5">
                      <span className="text-xs font-bold text-foreground">Téléphone</span>
                      <input
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground outline-none transition focus:ring-2 focus:ring-ring"
                        placeholder="+237..."
                        required
                      />
                    </label>
                    <label className="space-y-1.5">
                      <span className="text-xs font-bold text-foreground">Email</span>
                      <input
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground outline-none transition focus:ring-2 focus:ring-ring"
                        placeholder="optionnel"
                      />
                    </label>
                  </div>

                  <label className="space-y-1.5 block">
                    <span className="text-xs font-bold text-foreground">Filière souhaitée</span>
                    <select
                      value={form.programme}
                      onChange={(e) => setForm({ ...form, programme: e.target.value })}
                      className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm font-semibold text-foreground outline-none transition focus:ring-2 focus:ring-ring"
                    >
                      {programmes.map((programme) => (
                        <option key={programme} value={programme}>{programme}</option>
                      ))}
                    </select>
                  </label>

                  <label className="space-y-1.5 block">
                    <span className="text-xs font-bold text-foreground">Message</span>
                    <textarea
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      rows={3}
                      className="w-full resize-none rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground outline-none transition focus:ring-2 focus:ring-ring"
                      placeholder="Classe actuelle, ville, besoin spécifique..."
                    />
                  </label>

                  <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-extrabold text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
                  >
                    {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                    Envoyer ma demande
                  </button>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default InscriptionWidget;
