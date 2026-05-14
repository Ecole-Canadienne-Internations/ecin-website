import { motion } from "framer-motion";
import { Award } from "lucide-react";
import affichePrepaCanada from "@/assets/affiche-prepa-canada.jpg";
import affichePrepaFrance from "@/assets/affiche-prepa-france.jpg";

const ScholarshipSection = () => {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
              <Award className="w-8 h-8 text-primary" />
            </div>
          </div>
          <span className="inline-block bg-primary text-primary-foreground text-xs font-bold px-4 py-1.5 rounded-full mb-4 uppercase tracking-wide">
            🏆 Bourses d'excellence
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-4">
            Concours de Bourse ECIN
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            L'ECIN offre des bourses d'excellence aux élèves les plus méritants. Participez à notre concours annuel de bourses et bénéficiez d'une réduction significative sur vos frais de scolarité.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-10">
          {[affichePrepaCanada, affichePrepaFrance].map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group rounded-2xl overflow-hidden border border-border bg-card hover:shadow-xl hover:-translate-y-1 transition-all"
            >
              <div className="aspect-[3/4] overflow-hidden bg-background">
                <img
                  src={img}
                  alt={`Affiche concours de bourse ECIN ${i + 1}`}
                  loading="lazy"
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <button
            type="button"
            onClick={() => window.dispatchEvent(new CustomEvent("ecin:open-inscription", { detail: { flow: "general", context: "Concours de Bourse ECIN" } }))}
            className="inline-flex items-center justify-center bg-primary text-primary-foreground px-7 py-3.5 rounded-full text-sm font-bold hover:opacity-90 transition-opacity"
          >
            En savoir plus sur les bourses
          </button>
        </div>
      </div>
    </section>
  );
};

export default ScholarshipSection;
