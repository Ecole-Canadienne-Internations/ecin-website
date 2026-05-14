import PageLayout from "@/components/PageLayout";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { openInscription, type InscriptionFlow } from "@/lib/inscription";
import coverAlc from "@/assets/affiche-alc-anglais.jpg";
import coverIta from "@/assets/cover-ita.png";
import coverDte from "@/assets/affiche-dtc-formation.jpg";
import afficheAnglais from "@/assets/affiche-alc-anglais.jpg";
import afficheAllemand from "@/assets/affiche-alc-allemand.jpg";

interface ProgrammeData {
  title: string;
  subtitle: string;
  badge: string;
  description: string;
  features?: string[];
  cover: string;
  flow: InscriptionFlow;
}

const programmesData: Record<string, ProgrammeData> = {
  alc: {
    title: "ALC — Centre de Langues",
    subtitle: "Anglais, Français & Allemand — Préparation aux examens internationaux",
    badge: "Langues",
    description: "Choisissez votre langue. Notre tunnel de qualification vous orientera vers le programme adapté à votre objectif (général ou examen certifiant).",
    cover: coverAlc,
    flow: "alc",
  },
  ita: {
    title: "ITA — Institut de Technologie Appliquée",
    subtitle: "Informatique & Certifications Professionnelles",
    badge: "Informatique",
    description: "Formez-vous aux métiers du numérique avec des certifications reconnues internationalement. Programmation, réseaux, cybersécurité et bureautique avancée.",
    features: [
      "Programmation Web (HTML, CSS, JavaScript, Python)",
      "Administration réseaux & systèmes (CCNA)",
      "Cybersécurité et protection des données",
      "Bureautique avancée (Microsoft Office certifié)",
      "Certifications CompTIA, Cisco, Microsoft",
      "Stages et projets pratiques en entreprise",
    ],
    cover: coverIta,
    flow: "ita",
  },
  dte: {
    title: "DTE — Digital Technologie Émergente",
    subtitle: "Compétences numériques & Technologies émergentes",
    badge: "Digital",
    description: "Découvrez les technologies émergentes et développez des compétences digitales de pointe pour les métiers de demain.",
    features: [
      "Intelligence artificielle et Machine Learning",
      "Développement d'applications mobiles",
      "Design UX/UI et prototypage",
      "Marketing digital et e-commerce",
      "Cloud Computing et DevOps",
      "Blockchain et technologies décentralisées",
    ],
    cover: coverDte,
    flow: "dte",
  },
};

const alcLanguages: {
  flag: string;
  language: string;
  flow: InscriptionFlow;
  general: string;
  exams: string[];
  image: string;
  desc: string;
}[] = [
  {
    flag: "🇺🇸",
    language: "Anglais",
    flow: "alc-anglais",
    general: "Cours généraux, tous niveaux (A1 → C2)",
    exams: ["TOEFL", "Duolingo English Test (DET)", "IELTS"],
    image: afficheAnglais,
    desc: "Voyage, travail, études à l'étranger : un programme adapté à votre objectif.",
  },
  {
    flag: "🇫🇷",
    language: "Français",
    flow: "alc-francais",
    general: "FLE — Français Langue Étrangère",
    exams: ["TCF Canada", "TEF Canada", "DELF / DALF"],
    image: coverDte, // placeholder
    desc: "Cible immigration & certification. Préparation aux tests francophones.",
  },
  {
    flag: "🇩🇪",
    language: "Allemand",
    flow: "alc-allemand",
    general: "Cours d'allemand, A1 à C2",
    exams: ["Goethe-Zertifikat (A1-C2)", "TestDaF", "ÖSD"],
    image: afficheAllemand,
    desc: "Cible académique & visa : regroupement familial, études en Allemagne.",
  },
];

const Programmes = () => {
  const { programme } = useParams();
  const data = programmesData[programme || "alc"] || programmesData.alc;
  const isAlc = (programme || "alc") === "alc";

  return (
    <PageLayout>
      <section className="relative h-48 md:h-64 overflow-hidden bg-secondary">
        <img src={data.cover} alt={data.title} loading="eager" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-foreground/40" />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-3xl md:text-5xl font-extrabold text-background text-center px-4">{data.title}</h1>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-background">
        <div className="container max-w-5xl">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-block bg-accent text-accent-foreground text-xs font-bold px-4 py-1.5 rounded-full mb-6 uppercase tracking-wide">
              {data.badge}
            </span>
            <p className="text-xl text-muted-foreground mb-6">{data.subtitle}</p>
            <p className="text-foreground/80 leading-relaxed text-lg mb-10 max-w-3xl">{data.description}</p>
          </motion.div>

          {isAlc ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {alcLanguages.map((lang, i) => (
                <motion.article
                  key={lang.language}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="group flex flex-col rounded-2xl border border-border bg-card overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all"
                >
                  <div className="aspect-[4/3] w-full bg-background overflow-hidden">
                    <img
                      src={lang.image}
                      alt={`Affiche ALC ${lang.language}`}
                      loading="lazy"
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-3xl leading-none">{lang.flag}</span>
                      <h3 className="text-xl font-extrabold text-foreground">{lang.language}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">{lang.desc}</p>

                    <div className="space-y-3 mb-5">
                      <div>
                        <p className="text-[11px] font-bold uppercase tracking-wide text-primary">Général</p>
                        <p className="text-sm text-foreground/80">{lang.general}</p>
                      </div>
                      <div>
                        <p className="text-[11px] font-bold uppercase tracking-wide text-primary">Examens</p>
                        <div className="flex flex-wrap gap-1.5 mt-1.5">
                          {lang.exams.map((e) => (
                            <span key={e} className="text-xs font-semibold bg-secondary text-foreground px-2 py-1 rounded-md">
                              {e}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => openInscription({ flow: lang.flow })}
                      className="mt-auto inline-flex items-center justify-center gap-2 rounded-full bg-primary text-primary-foreground px-5 py-3 text-sm font-bold hover:opacity-90 transition-opacity"
                    >
                      S'inscrire <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </motion.article>
              ))}
            </div>
          ) : (
            <>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="space-y-3 max-w-3xl">
                {(data.features || []).map((f, i) => (
                  <div key={i} className="flex items-start gap-3 bg-secondary rounded-lg px-5 py-4">
                    <span className="w-2 h-2 rounded-full bg-primary flex-shrink-0 mt-2" />
                    <span className="text-foreground text-sm font-medium">{f}</span>
                  </div>
                ))}
              </motion.div>

              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="mt-12">
                <button
                  type="button"
                  onClick={() => openInscription({ flow: data.flow })}
                  className="inline-flex items-center justify-center bg-primary text-primary-foreground px-7 py-3.5 rounded-full text-sm font-bold hover:opacity-90 transition-opacity"
                >
                  Démarrer mon inscription
                </button>
              </motion.div>
            </>
          )}
        </div>
      </section>
    </PageLayout>
  );
};

export default Programmes;
