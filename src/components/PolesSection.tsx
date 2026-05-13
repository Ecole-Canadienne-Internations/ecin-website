import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Trophy, Monitor, BookOpen, Cpu, ArrowRight } from "lucide-react";
import logoAlc from "@/assets/logo-alc.jpeg";
import logoDti from "@/assets/logo-dti.jpeg";

const poles = [
  {
    icon: <Cpu className="w-8 h-8 text-primary" />,
    title: "DTE — Digital & Technologie Émergente",
    desc: "Certifications en technologies numériques et compétences digitales reconnues à l'international.",
    logo: logoDti,
    href: "/programmes/dte",
  },
  {
    icon: <BookOpen className="w-8 h-8 text-primary" />,
    title: "ALC — Academic Language Center",
    desc: "Anglais, Français, Allemand. Préparation aux tests internationaux (TOEFL, IELTS, TCF, Goethe…).",
    logo: logoAlc,
    href: "/programmes/alc",
  },
  {
    icon: <Monitor className="w-8 h-8 text-primary" />,
    title: "ITA — Information Technology Academy",
    desc: "Certifications IT internationales, développement logiciel et compétences numériques avancées.",
    logo: null,
    href: "/programmes/ita",
  },
  {
    icon: <Trophy className="w-8 h-8 text-primary" />,
    title: "Prépa Sport-Études",
    desc: "Excellence académique, sport de haut niveau et accès aux bourses internationales.",
    logo: null,
    href: "/prepas/sport-etudes",
  },
];

const PolesSection = () => {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block bg-accent text-accent-foreground text-xs font-bold px-3 py-1 rounded-full mb-3 uppercase tracking-wide">
            Nos Pôles
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-3">
            Digital, Langues, IT & Sport
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Des programmes spécialisés pour développer chaque talent.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {poles.map((pole, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Link
                to={pole.href}
                className="group relative flex h-full flex-col items-center rounded-xl border border-border bg-card p-8 text-center transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl"
              >
                {pole.logo ? (
                  <img src={pole.logo} alt={pole.title} className="h-16 mx-auto mb-4 object-contain" loading="lazy" />
                ) : (
                  <div className="flex justify-center mb-4">{pole.icon}</div>
                )}
                <h3 className="text-lg font-bold text-foreground mb-3 group-hover:text-primary transition-colors">{pole.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{pole.desc}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-primary opacity-0 transition-opacity group-hover:opacity-100">
                  Découvrir <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PolesSection;
