import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  GraduationCap,
  Languages,
  Loader2,
  Send,
  Sparkles,
  Trophy,
  X,
  Cpu,
  Monitor,
  Globe,
  School,
} from "lucide-react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import type { InscriptionFlow, OpenInscriptionOptions } from "@/lib/inscription";

const db = supabase as any;

type Programme =
  | "DTE"
  | "ITA"
  | "ALC"
  | "Prépa Sport-Études"
  | "Prépa Canada"
  | "Prépa France"
  | "Prépa Angleterre";

const leadSchema = z.object({
  full_name: z.string().trim().min(2, "Nom trop court").max(120),
  phone: z.string().trim().min(6, "Numéro invalide").max(40),
  email: z.string().trim().email("Email invalide").max(255).optional().or(z.literal("")),
});

interface Card {
  id: string;
  label: string;
  desc?: string;
  icon?: React.ReactNode;
  emoji?: string;
}

interface QuestionStep {
  key: string;
  question: string;
  cards: Card[];
  showIf?: (answers: Record<string, string>) => boolean;
}

// ---- Flow definitions ----------------------------------------------------

const generalProgrammeStep: QuestionStep = {
  key: "programme",
  question: "Quel programme vous intéresse ?",
  cards: [
    { id: "Prépa Canada", label: "Prépa Canada", desc: "Universités canadiennes", icon: <School className="h-5 w-5" /> },
    { id: "Prépa France", label: "Prépa France & Europe", desc: "Sciences Po, Campus France", icon: <Globe className="h-5 w-5" /> },
    { id: "Prépa Sport-Études", label: "Sport-Études", desc: "Bourses sportives", icon: <Trophy className="h-5 w-5" /> },
    { id: "ALC", label: "Langues (ALC)", desc: "Anglais, Français, Allemand", icon: <Languages className="h-5 w-5" /> },
    { id: "DTE", label: "Digital (DTE)", desc: "IA, robotique, freelancing", icon: <Sparkles className="h-5 w-5" /> },
    { id: "ITA", label: "Informatique (ITA)", desc: "Certifications IT", icon: <Monitor className="h-5 w-5" /> },
  ],
};

const alcLanguageStep: QuestionStep = {
  key: "langue",
  question: "Quelle langue souhaitez-vous maîtriser ?",
  cards: [
    { id: "Anglais", label: "Anglais", emoji: "🇺🇸" },
    { id: "Français", label: "Français", emoji: "🇫🇷" },
    { id: "Allemand", label: "Allemand", emoji: "🇩🇪" },
  ],
};

// English questions
const enSteps: QuestionStep[] = [
  {
    key: "niveau",
    question: "Comment évaluez-vous votre niveau actuel ?",
    cards: [
      { id: "Débutant", label: "Débutant", desc: "Je pars de zéro" },
      { id: "Intermédiaire", label: "Intermédiaire", desc: "Je peux tenir une conversation" },
      { id: "Avancé", label: "Avancé", desc: "Je veux atteindre l'excellence" },
    ],
  },
  {
    key: "objectif",
    question: "Pourquoi apprenez-vous l'anglais ?",
    cards: [
      { id: "Voyage", label: "Voyage", emoji: "✈️" },
      { id: "Travail", label: "Travail", emoji: "💼" },
      { id: "Études à l'étranger", label: "Études à l'étranger", emoji: "🎓" },
      { id: "Plaisir", label: "Plaisir", emoji: "🎯" },
    ],
  },
  {
    key: "examen",
    question: "Devez-vous passer une certification ?",
    cards: [
      { id: "TOEFL", label: "TOEFL", emoji: "📘" },
      { id: "Duolingo English Test", label: "Duolingo English Test", emoji: "🦉" },
      { id: "IELTS", label: "IELTS", emoji: "🎯" },
      { id: "Aucun pour le moment", label: "Aucun pour le moment", emoji: "—" },
    ],
    showIf: (a) => a.objectif === "Travail" || a.objectif === "Études à l'étranger",
  },
  {
    key: "rythme",
    question: "Quel rythme préférez-vous ?",
    cards: [
      { id: "Coaching intensif", label: "Coaching intensif", desc: "Plusieurs heures / jour" },
      { id: "Cours du soir", label: "Cours du soir", desc: "Après le travail" },
    ],
  },
];

// French questions
const frSteps: QuestionStep[] = [
  {
    key: "immigration",
    question: "Est-ce pour un projet d'immigration (TCF Canada, TEF) ?",
    cards: [
      { id: "Oui", label: "Oui", emoji: "🇨🇦" },
      { id: "Non", label: "Non", emoji: "🌍" },
    ],
  },
  {
    key: "niveau",
    question: "Parlez-vous déjà un peu français ?",
    cards: [
      { id: "Pas du tout", label: "Pas du tout" },
      { id: "Un peu", label: "Un peu" },
      { id: "Couramment, je veux me perfectionner", label: "Couramment" },
    ],
  },
  {
    key: "disponibilite",
    question: "Quand souhaitez-vous commencer ?",
    cards: [
      { id: "Immédiatement", label: "Immédiatement", emoji: "⚡" },
      { id: "Dans 1 mois", label: "Dans 1 mois", emoji: "📅" },
      { id: "Plus tard", label: "Plus tard", emoji: "🗓️" },
    ],
  },
];

// German questions
const deSteps: QuestionStep[] = [
  {
    key: "objectif_visa",
    question: "Avez-vous besoin d'un certificat pour visa ou études ?",
    cards: [
      { id: "A1 — Regroupement familial", label: "A1 — Regroupement familial", emoji: "👨‍👩‍👧" },
      { id: "B1 — Études", label: "B1 — Études", emoji: "📚" },
      { id: "TestDaF — Université", label: "TestDaF — Université", emoji: "🎓" },
      { id: "Pas de certificat", label: "Pas de certificat", emoji: "—" },
    ],
  },
  {
    key: "intensite",
    question: "Combien d'heures par semaine pouvez-vous étudier ?",
    cards: [
      { id: "1-3h", label: "1-3 heures" },
      { id: "4-7h", label: "4-7 heures" },
      { id: "8h+", label: "8h ou plus (intensif)" },
    ],
  },
];

// Other pôles — short qualification
const dteSteps: QuestionStep[] = [
  {
    key: "interet",
    question: "Quel domaine vous attire le plus ?",
    cards: [
      { id: "Intelligence Artificielle", label: "Intelligence Artificielle", emoji: "🤖" },
      { id: "Robotique", label: "Robotique", emoji: "⚙️" },
      { id: "Marketing Digital", label: "Marketing Digital", emoji: "📱" },
      { id: "Création de contenu", label: "Création de contenu", emoji: "🎬" },
    ],
  },
];

const itaSteps: QuestionStep[] = [
  {
    key: "interet",
    question: "Quelle spécialité IT visez-vous ?",
    cards: [
      { id: "Programmation Web", label: "Programmation Web", emoji: "💻" },
      { id: "Réseaux & CCNA", label: "Réseaux & CCNA", emoji: "🌐" },
      { id: "Cybersécurité", label: "Cybersécurité", emoji: "🛡️" },
      { id: "Bureautique avancée", label: "Bureautique avancée", emoji: "📊" },
    ],
  },
];

const sportSteps: QuestionStep[] = [
  {
    key: "discipline",
    question: "Quelle est votre discipline ?",
    cards: [
      { id: "Football", label: "Football", emoji: "⚽" },
      { id: "Basketball", label: "Basketball", emoji: "🏀" },
      { id: "Athlétisme", label: "Athlétisme", emoji: "🏃" },
      { id: "Autre", label: "Autre", emoji: "🏅" },
    ],
  },
];

const canadaSteps: QuestionStep[] = [
  {
    key: "objectif",
    question: "Quel est votre objectif principal au Canada ?",
    cards: [
      { id: "Université publique", label: "Université publique", emoji: "🎓" },
      { id: "Collège technique", label: "Collège technique", emoji: "🛠️" },
      { id: "Bourse d'excellence", label: "Bourse d'excellence", emoji: "🏆" },
    ],
  },
];

const franceSteps: QuestionStep[] = [
  {
    key: "destination",
    question: "Quelle destination visez-vous ?",
    cards: [
      { id: "France", label: "France", emoji: "🇫🇷" },
      { id: "Angleterre", label: "Angleterre", emoji: "🇬🇧" },
      { id: "Autre Europe", label: "Autre Europe", emoji: "🇪🇺" },
    ],
  },
];

const cycleSteps = (cycle: string): QuestionStep[] => [
  {
    key: "classe",
    question: `Quelle classe pour votre enfant (${cycle}) ?`,
    cards: [
      { id: "SIL/CP", label: "SIL / CP" },
      { id: "Primaire", label: "Primaire" },
      { id: "Collège (6e-3e)", label: "Collège (6e-3e)" },
      { id: "Lycée (2nde-Tle)", label: "Lycée (2nde-Tle)" },
    ],
  },
];

// Map flow to programme + qualification steps
const buildSteps = (flow: InscriptionFlow, answers: Record<string, string>): { steps: QuestionStep[]; programme: Programme; flowLabel: string } => {
  switch (flow) {
    case "alc": {
      const lang = answers.langue;
      const langSteps = lang === "Anglais" ? enSteps : lang === "Français" ? frSteps : lang === "Allemand" ? deSteps : [];
      return { steps: [alcLanguageStep, ...langSteps], programme: "ALC", flowLabel: lang ? `ALC ${lang}` : "ALC" };
    }
    case "alc-anglais":
      return { steps: enSteps, programme: "ALC", flowLabel: "ALC Anglais" };
    case "alc-francais":
      return { steps: frSteps, programme: "ALC", flowLabel: "ALC Français" };
    case "alc-allemand":
      return { steps: deSteps, programme: "ALC", flowLabel: "ALC Allemand" };
    case "dte":
      return { steps: dteSteps, programme: "DTE", flowLabel: "DTE — Digital" };
    case "ita":
      return { steps: itaSteps, programme: "ITA", flowLabel: "ITA — Informatique" };
    case "sport":
      return { steps: sportSteps, programme: "Prépa Sport-Études", flowLabel: "Prépa Sport-Études" };
    case "canada":
      return { steps: canadaSteps, programme: "Prépa Canada", flowLabel: "Prépa Canada" };
    case "france":
      return { steps: franceSteps, programme: "Prépa France", flowLabel: "Prépa France & Europe" };
    case "elementaire":
      return { steps: cycleSteps("Élémentaire"), programme: "DTE", flowLabel: "École Élémentaire" };
    case "secondaire":
      return { steps: cycleSteps("Secondaire"), programme: "DTE", flowLabel: "École Secondaire / DÉSO" };
    case "general":
    default: {
      const chosen = answers.programme as Programme | undefined;
      let extra: QuestionStep[] = [];
      let label = answers.programme || "Inscription";
      if (chosen === "ALC") {
        const lang = answers.langue;
        const langSteps = lang === "Anglais" ? enSteps : lang === "Français" ? frSteps : lang === "Allemand" ? deSteps : [];
        extra = [alcLanguageStep, ...langSteps];
        label = lang ? `ALC ${lang}` : "ALC — Langues";
      } else if (chosen === "DTE") {
        extra = dteSteps;
        label = "DTE — Digital";
      } else if (chosen === "ITA") {
        extra = itaSteps;
        label = "ITA — Informatique";
      } else if (chosen === "Prépa Sport-Études") {
        extra = sportSteps;
      } else if (chosen === "Prépa Canada") {
        extra = canadaSteps;
      } else if (chosen === "Prépa France" || chosen === "Prépa Angleterre") {
        extra = franceSteps;
      }
      return { steps: [generalProgrammeStep, ...extra], programme: chosen || "DTE", flowLabel: label };
    }
  }
};

const InscriptionWidget = () => {
  const [open, setOpen] = useState(false);
  const [flow, setFlow] = useState<InscriptionFlow>("general");
  const [context, setContext] = useState<string | undefined>(undefined);
  const [stepIdx, setStepIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [contact, setContact] = useState({ full_name: "", phone: "", email: "" });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const location = useLocation();

  const reset = (newFlow: InscriptionFlow = "general", newContext?: string) => {
    setFlow(newFlow);
    setContext(newContext);
    setStepIdx(0);
    setAnswers({});
    setContact({ full_name: "", phone: "", email: "" });
    setSent(false);
  };

  useEffect(() => {
    const shouldOpen = location.hash === "#inscription" || new URLSearchParams(location.search).get("inscription") === "1";
    if (shouldOpen) {
      reset("general");
      setOpen(true);
    }
  }, [location.hash, location.search]);

  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<OpenInscriptionOptions>).detail || {};
      reset(detail.flow || "general", detail.context);
      setOpen(true);
    };
    window.addEventListener("ecin:open-inscription", handler as EventListener);
    return () => window.removeEventListener("ecin:open-inscription", handler as EventListener);
  }, []);

  const { steps: visibleSteps, programme, flowLabel } = useMemo(() => {
    const { steps, programme, flowLabel } = buildSteps(flow, answers);
    return {
      steps: steps.filter((s) => !s.showIf || s.showIf(answers)),
      programme,
      flowLabel,
    };
  }, [flow, answers]);

  const totalSteps = visibleSteps.length + 1; // + contact step
  const isContactStep = stepIdx >= visibleSteps.length;
  const currentStep = visibleSteps[stepIdx];

  const pickCard = (key: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
    setTimeout(() => setStepIdx((i) => i + 1), 220);
  };

  const goBack = () => setStepIdx((i) => Math.max(0, i - 1));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = leadSchema.safeParse(contact);
    if (!parsed.success) {
      toast({ title: "Vérifiez le formulaire", description: parsed.error.errors[0]?.message, variant: "destructive" });
      return;
    }
    setLoading(true);

    const qualif = Object.entries(answers)
      .map(([k, v]) => `• ${k}: ${v}`)
      .join("\n");
    const message = [
      `Filière: ${flowLabel}`,
      context ? `Contexte: ${context}` : null,
      qualif ? `Qualification:\n${qualif}` : null,
    ]
      .filter(Boolean)
      .join("\n");

    const { error } = await db.from("inscription_leads").insert({
      full_name: parsed.data.full_name,
      phone: parsed.data.phone,
      email: parsed.data.email || null,
      programme,
      message,
      source: `widget_${flow}`,
    });
    setLoading(false);
    if (error) {
      toast({ title: "Erreur", description: error.message, variant: "destructive" });
      return;
    }
    setSent(true);
    toast({ title: "Inscription reçue", description: "L'équipe ECIN vous contactera rapidement." });
  };

  const progress = Math.min(100, ((stepIdx + (isContactStep ? 1 : 0)) / totalSteps) * 100);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-foreground/40 px-4 py-6 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setOpen(false)}
        >
          <motion.div
            initial={{ opacity: 0, y: 28, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 260, damping: 24 }}
            className="relative flex max-h-[90vh] w-full max-w-xl flex-col overflow-hidden rounded-3xl border border-border bg-background shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="border-b border-border bg-gradient-to-br from-primary to-primary/80 px-6 py-5 text-primary-foreground">
              <button
                onClick={() => setOpen(false)}
                className="absolute right-4 top-4 rounded-full p-2 text-primary-foreground/80 transition-colors hover:bg-primary-foreground/10"
                aria-label="Fermer"
              >
                <X className="h-4 w-4" />
              </button>
              <div className="flex items-center gap-3 pr-10">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary-foreground/15">
                  <GraduationCap className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-widest text-primary-foreground/80">
                    École Canadienne Inter-Nations
                  </p>
                  <h2 className="text-lg font-extrabold">{flowLabel}</h2>
                </div>
              </div>
              {!sent && (
                <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-primary-foreground/20">
                  <motion.div
                    className="h-full rounded-full bg-primary-foreground"
                    animate={{ width: `${progress}%` }}
                    transition={{ type: "spring", stiffness: 120, damping: 20 }}
                  />
                </div>
              )}
            </div>

            <div className="flex-1 overflow-y-auto">
              {sent ? (
                <div className="space-y-5 p-8 text-center">
                  <CheckCircle2 className="mx-auto h-16 w-16 text-primary" />
                  <div>
                    <h3 className="text-2xl font-extrabold text-foreground">Demande envoyée</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      L'équipe ECIN vous contactera très bientôt. À très vite !
                    </p>
                  </div>
                  <button
                    onClick={() => setOpen(false)}
                    className="rounded-full bg-primary px-6 py-3 text-sm font-bold text-primary-foreground"
                  >
                    Fermer
                  </button>
                </div>
              ) : isContactStep ? (
                <form onSubmit={handleSubmit} className="space-y-4 p-6">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wide text-primary">Dernière étape</p>
                    <h3 className="mt-1 text-2xl font-extrabold text-foreground">Vos coordonnées</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      L'équipe ECIN vous appelle dans la journée pour finaliser votre inscription.
                    </p>
                  </div>

                  <label className="block space-y-1.5">
                    <span className="text-xs font-bold text-foreground">Nom complet</span>
                    <input
                      value={contact.full_name}
                      onChange={(e) => setContact({ ...contact, full_name: e.target.value })}
                      className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground outline-none transition focus:ring-2 focus:ring-ring"
                      placeholder="Votre nom et prénom"
                      required
                    />
                  </label>
                  <label className="block space-y-1.5">
                    <span className="text-xs font-bold text-foreground">Téléphone / WhatsApp</span>
                    <input
                      value={contact.phone}
                      onChange={(e) => setContact({ ...contact, phone: e.target.value })}
                      className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground outline-none transition focus:ring-2 focus:ring-ring"
                      placeholder="+237 ..."
                      required
                    />
                  </label>
                  <label className="block space-y-1.5">
                    <span className="text-xs font-bold text-foreground">Email <span className="font-normal text-muted-foreground">(optionnel)</span></span>
                    <input
                      type="email"
                      value={contact.email}
                      onChange={(e) => setContact({ ...contact, email: e.target.value })}
                      className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground outline-none transition focus:ring-2 focus:ring-ring"
                      placeholder="email@exemple.com"
                    />
                  </label>

                  <div className="flex gap-3 pt-2">
                    {visibleSteps.length > 0 && (
                      <button
                        type="button"
                        onClick={goBack}
                        className="inline-flex items-center justify-center gap-2 rounded-full border border-border px-4 py-3 text-sm font-bold text-foreground"
                      >
                        <ArrowLeft className="h-4 w-4" /> Retour
                      </button>
                    )}
                    <button
                      type="submit"
                      disabled={loading}
                      className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-extrabold text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
                    >
                      {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                      Envoyer ma demande
                    </button>
                  </div>
                </form>
              ) : (
                <div className="space-y-5 p-6">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wide text-primary">
                      Étape {stepIdx + 1} / {totalSteps}
                    </p>
                    <h3 className="mt-1 text-2xl font-extrabold leading-tight text-foreground">
                      {currentStep.question}
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {currentStep.cards.map((card) => {
                      const selected = answers[currentStep.key] === card.id;
                      return (
                        <motion.button
                          key={card.id}
                          type="button"
                          onClick={() => pickCard(currentStep.key, card.id)}
                          whileTap={{ scale: 0.97 }}
                          className={`group flex items-center gap-3 rounded-2xl border-2 p-4 text-left transition-all ${
                            selected
                              ? "border-primary bg-primary/5"
                              : "border-border bg-card hover:border-primary/50 hover:bg-secondary/40"
                          }`}
                        >
                          {card.emoji ? (
                            <span className="text-2xl leading-none">{card.emoji}</span>
                          ) : card.icon ? (
                            <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                              {card.icon}
                            </span>
                          ) : null}
                          <span className="flex-1">
                            <span className="block text-sm font-bold text-foreground">{card.label}</span>
                            {card.desc && <span className="mt-0.5 block text-xs text-muted-foreground">{card.desc}</span>}
                          </span>
                          <ArrowRight className="h-4 w-4 flex-shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1" />
                        </motion.button>
                      );
                    })}
                  </div>

                  {stepIdx > 0 && (
                    <button
                      type="button"
                      onClick={goBack}
                      className="inline-flex items-center gap-2 text-xs font-bold text-muted-foreground hover:text-foreground"
                    >
                      <ArrowLeft className="h-3.5 w-3.5" /> Étape précédente
                    </button>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default InscriptionWidget;
