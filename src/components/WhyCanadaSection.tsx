import { TrendingUp, Briefcase, Globe, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

const points = [
  { icon: TrendingUp, text: "6e économie mondiale avec un PIB de plus de 2 000 milliards $CAD." },
  { icon: Briefcase, text: "Plus d'un million de postes vacants pour les travailleurs qualifiés chaque année." },
  { icon: Globe, text: "Un des pays les plus accueillants au monde pour les étudiants internationaux." },
  { icon: ShieldCheck, text: "Un système d'immigration transparent avec des voies d'accès à la résidence permanente." },
];

const WhyCanadaSection = () => {
  return (
    <section className="py-16 md:py-24 bg-secondary">
      <div className="container max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-3">
            Pourquoi le Canada ?
          </h2>
          <p className="text-muted-foreground">
            Le Canada offre des opportunités exceptionnelles pour les jeunes diplômés africains.
          </p>
        </motion.div>

        <div className="flex flex-col gap-4">
          {points.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex items-start gap-4 bg-background rounded-lg p-5 border border-border"
            >
              <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
                <p.icon className="w-5 h-5 text-primary" />
              </div>
              <p className="text-foreground text-sm md:text-base leading-relaxed">{p.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyCanadaSection;
