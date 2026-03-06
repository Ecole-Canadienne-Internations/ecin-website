import PageLayout from "@/components/PageLayout";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import heroEcin from "@/assets/hero-ecin.png";

const prepasData: Record<string, { title: string; subtitle: string; badge: string; description: string; features: string[] }> = {
  canada: {
    title: "Prépa Canada",
    subtitle: "Post-BAC vers les universités canadiennes",
    badge: "Post-BAC",
    description: "Un programme intensif pour les bacheliers camerounais qui souhaitent intégrer directement une université canadienne francophone. Mise à niveau académique + préparation à l'immigration.",
    features: [
      "Programme de crédits DÉSO accéléré",
      "Accompagnement aux démarches d'admission universitaire",
      "Préparation au permis d'études et au visa",
      "Immersion dans les standards académiques canadiens",
      "Suivi personnalisé jusqu'à l'arrivée au Canada",
    ],
  },
  "france-angleterre": {
    title: "Prépa France & Angleterre",
    subtitle: "Accès aux grandes universités européennes",
    badge: "International",
    description: "Préparez votre entrée dans les universités françaises et britanniques avec un accompagnement académique et administratif complet.",
    features: [
      "Préparation aux exigences académiques françaises et britanniques",
      "Aide à la constitution des dossiers (Campus France, UCAS)",
      "Renforcement linguistique (français académique, IELTS/TOEFL)",
      "Simulation d'entretiens et coaching personnalisé",
      "Suivi de la procédure de visa",
    ],
  },
  "sport-etudes": {
    title: "Sport-Études",
    subtitle: "Le sport de haut niveau, le diplôme canadien en plus",
    badge: "Excellence sportive",
    description: "Un programme exclusif qui combine la préparation sportive de haut niveau avec l'obtention du diplôme canadien DÉSO. Pour les athlètes qui ne veulent pas choisir entre sport et études.",
    features: [
      "Emploi du temps adapté aux entraînements intensifs",
      "Coaching sportif par des professionnels certifiés",
      "Cursus DÉSO complet en parallèle",
      "Bourses sportives pour universités canadiennes",
      "Réseau d'universités avec programmes sportifs d'élite",
    ],
  },
};

const Prepas = () => {
  const { prepa } = useParams();
  const data = prepasData[prepa || "canada"] || prepasData.canada;

  return (
    <PageLayout>
      {/* Cover photo */}
      <section className="relative h-48 md:h-64 overflow-hidden">
        <img src={heroEcin} alt="ECIN" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-foreground/40" />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-3xl md:text-5xl font-extrabold text-background text-center">{data.title}</h1>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-background">
        <div className="container max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-block bg-accent text-accent-foreground text-xs font-bold px-4 py-1.5 rounded-full mb-6 uppercase tracking-wide">
              {data.badge}
            </span>
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
              href="https://wa.me/237681263743?text=Bonjour%2C%20je%20souhaite%20en%20savoir%20plus%20sur%20la%20prépa."
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

export default Prepas;
