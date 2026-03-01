import { motion } from "framer-motion";
import logoLaCite from "@/assets/logo-lacite.png";
import logoBoreal from "@/assets/logo-boreal.png";
import logoMoncton from "@/assets/logo-moncton.png";

const partners = [
  { name: "La Cité Collégiale", logo: logoLaCite },
  { name: "Collège Boréal", logo: logoBoreal },
  { name: "Université de Moncton", logo: logoMoncton },
];

const PartnersSection = () => {
  return (
    <section className="py-16 md:py-20 bg-background">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-3">
            Nos Universités Partenaires
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Des institutions canadiennes de premier plan qui accueillent nos diplômés.
          </p>
        </motion.div>

        <div className="flex flex-wrap items-center justify-center gap-10 md:gap-16">
          {partners.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group"
            >
              <img
                src={p.logo}
                alt={p.name}
                className="h-16 md:h-20 object-contain grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;
