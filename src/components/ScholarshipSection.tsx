import { motion } from "framer-motion";
import { Award } from "lucide-react";

const ScholarshipSection = () => {
  return (
    <section className="py-16 md:py-24 bg-secondary">
      <div className="container max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
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
          <p className="text-muted-foreground max-w-xl mx-auto mb-8 leading-relaxed">
            L'ECIN offre des bourses d'excellence aux élèves les plus méritants. Participez à notre concours annuel de bourses et bénéficiez d'une réduction significative sur vos frais de scolarité.
          </p>
          <a
            href="https://wa.me/16476926009?text=Bonjour%2C%20je%20souhaite%20avoir%20des%20informations%20sur%20le%20concours%20de%20bourse%20ECIN."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center bg-primary text-primary-foreground px-7 py-3.5 rounded-full text-sm font-bold hover:opacity-90 transition-opacity"
          >
            En savoir plus sur les bourses
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default ScholarshipSection;
