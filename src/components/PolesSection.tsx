import { motion } from "framer-motion";
import { Trophy, Monitor, BookOpen } from "lucide-react";
import logoAlc from "@/assets/logo-alc.jpeg";
import logoDti from "@/assets/logo-dti.jpeg";

const poles = [
  {
    icon: <Trophy className="w-8 h-8 text-primary" />,
    title: "Prépa Sport-études",
    desc: "Excellence académique, sport de haut niveau et accès aux bourses internationales pour les athlètes ambitieux.",
    logo: null,
  },
  {
    icon: <Monitor className="w-8 h-8 text-primary" />,
    title: "DTE — Digital Technologie Émergente",
    desc: "Certifications en technologies numériques et compétences digitales reconnues à l'international.",
    logo: logoDti,
  },
  {
    icon: <BookOpen className="w-8 h-8 text-primary" />,
    title: "ALC — Academic Language Center",
    desc: "Formation en langues (Français/Anglais), préparation aux tests de niveau et certifications linguistiques.",
    logo: logoAlc,
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
            Sport, Digital & Langues
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Des programmes spécialisés pour développer chaque talent.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {poles.map((pole, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-card border border-border rounded-xl p-8 hover:shadow-lg transition-shadow text-center"
            >
              {pole.logo ? (
                <img src={pole.logo} alt={pole.title} className="h-16 mx-auto mb-4 object-contain" loading="lazy" />
              ) : (
                <div className="flex justify-center mb-4">{pole.icon}</div>
              )}
              <h3 className="text-lg font-bold text-foreground mb-3">{pole.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{pole.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PolesSection;
