import { motion } from "framer-motion";
import logoLaCite from "@/assets/logo-lacite.png";
import logoBoreal from "@/assets/logo-boreal.png";
import logoMoncton from "@/assets/logo-moncton.png";
import logoToronto from "@/assets/logo-toronto.png";
import logoGlendon from "@/assets/logo-glendon.png";
import logoSudbury from "@/assets/logo-sudbury.png";
import logoHearst from "@/assets/logo-hearst.png";
import logoSaintPaul from "@/assets/logo-saintpaul.png";
import logoLaurentian from "@/assets/logo-laurentian.png";
import logoUof from "@/assets/logo-uof.png";
import logoAvantageOntario from "@/assets/avantage-ontario.png";

const allPartners = [
  { name: "La Cité Collégiale", logo: logoLaCite },
  { name: "Collège Boréal", logo: logoBoreal },
  { name: "Université de Moncton", logo: logoMoncton },
  { name: "University of Toronto (OISE)", logo: logoToronto },
  { name: "Glendon — York University", logo: logoGlendon },
  { name: "Université de Sudbury", logo: logoSudbury },
  { name: "Université de Hearst", logo: logoHearst },
  { name: "Université Saint-Paul", logo: logoSaintPaul },
  { name: "Université Laurentienne", logo: logoLaurentian },
  { name: "Université de l'Ontario français", logo: logoUof },
];

const PartnersSection = () => {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-3">
            Réseau Universitaire
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Des institutions canadiennes de premier plan qui accueillent nos diplômés.
          </p>
        </motion.div>

        {/* Avantage Ontario — Premium Position */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-center mb-10"
        >
          <img
            src={logoAvantageOntario}
            alt="Avantage Ontario — Naturellement bilingue"
            className="h-20 md:h-28 object-contain"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-wrap items-center justify-center gap-10 md:gap-14">
            {allPartners.map((p) => (
              <img
                key={p.name}
                src={p.logo}
                alt={p.name}
                className="h-16 md:h-24 object-contain transition-transform duration-300 hover:scale-105"
              />
            ))}
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-sm text-muted-foreground mt-10 bg-secondary border border-border rounded-lg px-6 py-4 max-w-2xl mx-auto"
        >
          Tous ces établissements sont nos partenaires officiels et reconnaissent le diplôme DÉSO.
        </motion.p>
      </div>
    </section>
  );
};

export default PartnersSection;
