import PageLayout from "@/components/PageLayout";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";

const programmesData: Record<string, { title: string; subtitle: string; badge: string; description: string; features: string[] }> = {
  alc: {
    title: "ALC — Centre de Langues",
    subtitle: "Anglais, Français & Certifications linguistiques",
    badge: "Langues",
    description: "Perfectionnez vos compétences linguistiques avec nos programmes certifiants en anglais et en français. Préparation aux tests internationaux (IELTS, TOEFL, TCF, TEF).",
    features: [
      "Cours d'anglais tous niveaux (débutant à avancé)",
      "Préparation IELTS & TOEFL avec simulateurs d'examen",
      "Français langue étrangère (FLE) certifié",
      "Préparation TCF / TEF Canada pour l'immigration",
      "Classes en petits groupes ou cours particuliers",
      "Certificats reconnus internationalement",
    ],
  },
  ita: {
    title: "ITA — Institut de Technologie Appliquée",
    subtitle: "Informatique & Certifications Professionnelles",
    badge: "Informatique",
    description: "Formez-vous aux métiers du numérique avec des certifications reconnues internationalement. Programmation, réseaux, cybersécurité et bureautique avancée.",
    features: [
      "Programmation Web (HTML, CSS, JavaScript, Python)",
      "Administration réseaux & systèmes (CCNA)",
      "Cybersécurité et protection des données",
      "Bureautique avancée (Microsoft Office certifié)",
      "Certifications CompTIA, Cisco, Microsoft",
      "Stages et projets pratiques en entreprise",
    ],
  },
};

const Programmes = () => {
  const { programme } = useParams();
  const data = programmesData[programme || "alc"] || programmesData.alc;

  return (
    <PageLayout>
      <section className="py-16 md:py-24 bg-background">
        <div className="container max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-block bg-accent text-accent-foreground text-xs font-bold px-4 py-1.5 rounded-full mb-6 uppercase tracking-wide">
              {data.badge}
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-4">{data.title}</h1>
            <p className="text-xl text-muted-foreground mb-8">{data.subtitle}</p>
            <p className="text-foreground/80 leading-relaxed text-lg mb-10">{data.description}</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="space-y-3">
            {data.features.map((f, i) => (
              <div key={i} className="flex items-start gap-3 bg-secondary rounded-lg px-5 py-4">
                <span className="w-2 h-2 rounded-full bg-primary flex-shrink-0 mt-2" />
                <span className="text-foreground text-sm font-medium">{f}</span>
              </div>
            ))}
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="mt-12">
            <a
              href="https://wa.me/237681263743?text=Bonjour%2C%20je%20souhaite%20en%20savoir%20plus%20sur%20les%20programmes%20professionnels."
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

export default Programmes;
