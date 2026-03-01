import { motion } from "framer-motion";

const obligatorySubjects = [
  "Mathématiques",
  "Sciences",
  "Français",
  "Anglais",
  "Histoire du Canada",
  "Géographie",
  "Éducation artistique",
  "Éducation physique",
  "Carrière & civisme",
];

const highlights = [
  { label: "30 crédits", detail: "18 obligatoires + 12 optionnels" },
  { label: "4 ans", detail: "De la 9e à la 12e année" },
  { label: "40 heures", detail: "Service communautaire requis" },
  { label: "TPCL", detail: "Test de compétence linguistique" },
];

const DesoDetailsSection = () => {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-3">
            Le Diplôme DÉSO en détail
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Le programme est structuré sur 4 ans (9<sup>e</sup> à 12<sup>e</sup> année) pour un total de 30 crédits (18 obligatoires et 12 optionnels).
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {highlights.map((h, i) => (
            <motion.div
              key={h.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-background rounded-lg p-5 text-center border border-border"
            >
              <p className="text-2xl font-extrabold text-primary mb-1">{h.label}</p>
              <p className="text-xs text-muted-foreground">{h.detail}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="text-lg font-bold text-foreground mb-4 text-center">
            Matières obligatoires
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-w-2xl mx-auto">
            {obligatorySubjects.map((subject) => (
              <div
                key={subject}
                className="flex items-center gap-2 bg-background rounded-md px-4 py-3 border border-border text-sm font-medium text-foreground"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                {subject}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default DesoDetailsSection;
