import { motion } from "framer-motion";
import { Bot, Monitor, BookOpen, Sparkles, GraduationCap } from "lucide-react";
import afficheRobotique from "@/assets/affiche-dtc-robotique.jpg";
import afficheIA from "@/assets/affiche-dtc-ia.jpg";
import afficheFormation from "@/assets/affiche-dtc-formation.jpg";
import afficheAnglais from "@/assets/affiche-alc-anglais.jpg";
import afficheAllemand from "@/assets/affiche-alc-allemand.jpg";
import affichePrepaCanada from "@/assets/affiche-prepa-canada.jpg";

const highlights = [
  {
    icon: <Bot className="w-6 h-6 text-primary" />,
    title: "Atelier Robotique",
    desc: "Montage, manipulation et initiation au coding pour les jeunes esprits curieux.",
    image: afficheRobotique,
    tag: "DTE",
  },
  {
    icon: <Sparkles className="w-6 h-6 text-primary" />,
    title: "IA & Freelancing",
    desc: "Maîtrisez ChatGPT, Midjourney et lancez votre activité freelance.",
    image: afficheFormation,
    tag: "DTE",
  },
  {
    icon: <Monitor className="w-6 h-6 text-primary" />,
    title: "Compétences d'avenir",
    desc: "IA, IoT, Blockchain, AR/VR et création de contenu digital.",
    image: afficheIA,
    tag: "DTE",
  },
  {
    icon: <BookOpen className="w-6 h-6 text-primary" />,
    title: "Cours d'Anglais",
    desc: "Du niveau A1 à C2. Préparation IELTS, TOEFL, TOEIC, Duolingo.",
    image: afficheAnglais,
    tag: "ALC",
  },
  {
    icon: <BookOpen className="w-6 h-6 text-primary" />,
    title: "Cours d'Allemand",
    desc: "Du niveau A1 à C2. Préparation à l'examen Goethe.",
    image: afficheAllemand,
    tag: "ALC",
  },
  {
    icon: <GraduationCap className="w-6 h-6 text-primary" />,
    title: "Prépa Canada",
    desc: "Obtenez un diplôme canadien (DESO) et accédez aux universités et collèges canadiens.",
    image: affichePrepaCanada,
    tag: "Prépa",
  },
];

const VacationCoursesSection = () => {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block bg-primary text-primary-foreground text-xs font-bold px-4 py-1.5 rounded-full mb-4 uppercase tracking-wide">
            🎓 Rentrée — 20 Avril 2026
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-3">
            Cours de Vacances Spécialisés
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Profitez des vacances pour développer de nouvelles compétences avec nos pôles{" "}
            <span className="text-primary font-semibold">DTE (Digital & Technologie Émergente)</span> et{" "}
            <span className="text-primary font-semibold">ALC (Academic Language Center)</span>.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {highlights.map((c, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="group bg-card border border-border rounded-2xl overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all"
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-secondary">
                <img
                  src={c.image}
                  alt={c.title}
                  loading="lazy"
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3 bg-primary text-primary-foreground text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wide">
                  {c.tag}
                </div>
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2 mb-2">
                  {c.icon}
                  <h3 className="text-base font-bold text-foreground">{c.title}</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{c.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <button
            type="button"
            onClick={() => window.dispatchEvent(new CustomEvent("ecin:open-inscription", { detail: { flow: "general", context: "Cours de vacances" } }))}
            className="inline-flex items-center justify-center bg-primary text-primary-foreground px-7 py-3.5 rounded-full text-sm font-bold hover:opacity-90 transition-opacity"
          >
            Inscrire mon enfant
          </button>
        </div>
      </div>
    </section>
  );
};

export default VacationCoursesSection;
