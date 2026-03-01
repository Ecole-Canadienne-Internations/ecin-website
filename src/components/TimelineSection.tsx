import { motion } from "framer-motion";
import timelineDeso from "@/assets/timeline-deso.png";
import timelineUniversity from "@/assets/timeline-university.png";
import timelineVisa from "@/assets/timeline-visa.png";

const steps = [
  {
    image: timelineDeso,
    title: "Réussite du DÉSO",
    description: "Obtenez votre Diplôme d'Études Secondaires de l'Ontario, reconnu internationalement.",
    step: "01",
  },
  {
    image: timelineUniversity,
    title: "Admission Universitaire",
    description: "Accédez directement à nos universités partenaires : La Cité, Université de Moncton, Collège Boréal.",
    step: "02",
  },
  {
    image: timelineVisa,
    title: "Permis d'Études & Visa",
    description: "Bénéficiez d'un accompagnement complet pour votre permis d'études et votre visa canadien.",
    step: "03",
  },
];

const TimelineSection = () => {
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
            Votre Parcours vers le Canada
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Un chemin clair en trois étapes pour réaliser votre rêve canadien.
          </p>
        </motion.div>

        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6">
          {/* Connecting line (desktop) */}
          <div className="hidden md:block absolute top-[6rem] left-[16.6%] right-[16.6%] h-0.5 bg-border" />

          {steps.map((s, i) => (
            <motion.div
              key={s.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="relative flex flex-col items-center text-center"
            >
              <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-background shadow-lg relative z-10 bg-secondary">
                <img
                  src={s.image}
                  alt={s.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="mt-4 text-xs font-bold text-primary tracking-widest uppercase">
                Étape {s.step}
              </span>
              <h3 className="mt-2 text-lg font-bold text-foreground">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed max-w-xs">
                {s.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TimelineSection;
