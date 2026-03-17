import { motion } from "framer-motion";

const equivalences = [
  { ontario: "Études Primaires (1ère – 3ème année)", cameroun: "CP → CE2", color: "bg-primary/10 border-primary/20" },
  { ontario: "Études Élémentaires (4ème – 5ème année)", cameroun: "CM1 → CM2", color: "bg-accent border-accent-foreground/20" },
  { ontario: "Études Intermédiaires (6ème – 8ème année)", cameroun: "6ème → 4ème", color: "bg-primary/10 border-primary/20" },
  { ontario: "Études Secondaires (9ème – 12ème année)", cameroun: "3ème → Terminale", color: "bg-accent border-accent-foreground/20" },
];

const EquivalencesSection = () => {
  return (
    <section className="py-16 md:py-24 bg-secondary">
      <div className="container max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block bg-accent text-accent-foreground text-xs font-bold px-3 py-1 rounded-full mb-3 uppercase tracking-wide">
            Équivalences
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-3">
            Comprendre le parcours de votre enfant
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Correspondance entre le système ontarien et le système camerounais.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          {equivalences.map((eq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`${eq.color} border rounded-xl p-6 text-center`}
            >
              <p className="text-sm font-bold text-foreground mb-1">{eq.ontario}</p>
              <p className="text-xs text-muted-foreground">Équivalent : <span className="font-semibold text-primary">{eq.cameroun}</span></p>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-sm text-muted-foreground bg-primary/5 border border-primary/10 rounded-lg px-6 py-4"
        >
          <strong className="text-primary">Note :</strong> Le programme DÉSO est structuré sur 1 an pour les élèves entrant en 12ème année (Terminale au Cameroun).
        </motion.p>
      </div>
    </section>
  );
};

export default EquivalencesSection;
