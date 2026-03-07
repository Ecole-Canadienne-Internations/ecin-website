import PageLayout from "@/components/PageLayout";
import { motion } from "framer-motion";
import alumniCatalyst from "@/assets/alumni-catalyst.png";

const Alumni = () => {
  return (
    <PageLayout>
      {/* Cover */}
      <section className="relative h-64 md:h-80 overflow-hidden">
        <img src={alumniCatalyst} alt="Promotion Catalyst 2024-2025" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-foreground/50" />
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-5xl font-extrabold text-background text-center"
          >
            Nos Alumni
          </motion.h1>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-background">
        <div className="container max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-block bg-accent text-accent-foreground text-xs font-bold px-4 py-1.5 rounded-full mb-6 uppercase tracking-wide">
              Promotion Catalyst
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-4">Promotion Catalyst 2024–2025</h2>
            <p className="text-xl text-muted-foreground mb-4">
              « Vous ne devez pas attendre l'avenir, vous devez le provoquer »
            </p>
            <p className="text-foreground/80 leading-relaxed text-lg mb-10">
              La promotion Catalyst est la fierté de l'ECIN. Nos diplômés ont décroché leur Diplôme d'Études Secondaires de l'Ontario (DESO) et sont désormais admissibles dans les meilleures universités canadiennes. Avec détermination et excellence, ils tracent la voie pour les générations futures.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="rounded-xl overflow-hidden border border-border mb-10"
          >
            <img src={alumniCatalyst} alt="Promotion Catalyst — diplômés ECIN" className="w-full object-contain" />
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="space-y-3 mb-12">
            {[
              "Prochaines rentrées : HIVER (janvier) & AUTOMNE (septembre)",
              "Diplôme identique à celui délivré en Ontario, Canada",
              "Accès direct aux universités partenaires francophones et anglophones",
              "Accompagnement personnalisé jusqu'à l'admission universitaire",
            ].map((f, i) => (
              <div key={i} className="flex items-start gap-3 bg-secondary rounded-lg px-5 py-4">
                <span className="w-2 h-2 rounded-full bg-primary flex-shrink-0 mt-2" />
                <span className="text-foreground text-sm font-medium">{f}</span>
              </div>
            ))}
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
            <a
              href="https://wa.me/16476926009?text=Bonjour%2C%20je%20souhaite%20rejoindre%20la%20prochaine%20promotion."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center bg-primary text-primary-foreground px-7 py-3.5 rounded-full text-sm font-bold hover:opacity-90 transition-opacity"
            >
              Démarrer mon inscription
            </a>
          </motion.div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Alumni;
