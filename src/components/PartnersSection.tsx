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

const directPartners = [
  { name: "La Cité Collégiale", logo: logoLaCite },
  { name: "Collège Boréal", logo: logoBoreal },
  { name: "Université de Moncton", logo: logoMoncton },
];

const networkPartners = [
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
        {/* Direct Partners */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-3">
            Réseau Universitaire
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Des institutions canadiennes de premier plan qui accueillent nos diplômés.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-14"
        >
          <p className="text-center text-xs font-bold text-primary tracking-widest uppercase mb-6">
            Partenaires Directs — Admission Facilitée
          </p>
          <div className="flex flex-wrap items-center justify-center gap-10 md:gap-16">
            {directPartners.map((p) => (
              <img
                key={p.name}
                src={p.logo}
                alt={p.name}
                className="h-14 md:h-20 object-contain transition-transform duration-300 hover:scale-105"
              />
            ))}
          </div>
        </motion.div>

        {/* Network Partners */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-center text-xs font-bold text-muted-foreground tracking-widest uppercase mb-6">
            Réseau d'Excellence — Diplômés Admissibles
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
            {networkPartners.map((p) => (
              <img
                key={p.name}
                src={p.logo}
                alt={p.name}
                className="h-10 md:h-14 object-contain transition-transform duration-300 hover:scale-105"
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PartnersSection;
