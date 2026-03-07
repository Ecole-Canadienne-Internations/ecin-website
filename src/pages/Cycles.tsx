import PageLayout from "@/components/PageLayout";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import coverPrimaire from "@/assets/cover-primaire.png";
import coverElementaire from "@/assets/cover-elementaire.png";
import coverSecondaire from "@/assets/cover-secondaire.png";

const cyclesData: Record<string, { title: string; subtitle: string; badge: string; description: string; features: string[]; cover: string }> = {
  primaire: {
    title: "Cycle Primaire",
    subtitle: "De la maternelle au CM2",
    badge: "Maternelle — CM2",
    description: "Un programme bilingue (français-anglais) fondé sur les standards canadiens, qui développe la curiosité, l'autonomie et les bases académiques solides dès le plus jeune âge.",
    features: [
      "Immersion bilingue français-anglais dès la maternelle",
      "Pédagogie centrée sur l'élève et l'apprentissage par projets",
      "Développement des compétences socio-émotionnelles",
      "Classes à effectifs réduits pour un suivi personnalisé",
      "Activités parascolaires : arts, sport, sciences",
    ],
    cover: coverPrimaire,
  },
  elementaire: {
    title: "Cycle Élémentaire",
    subtitle: "De la 6ème à la 4ème",
    badge: "6ème — 4ème",
    description: "Le cycle intermédiaire prépare les élèves à intégrer le programme DÉSO en renforçant les fondamentaux académiques dans un environnement bilingue stimulant.",
    features: [
      "Transition douce vers le curriculum ontarien",
      "Renforcement en mathématiques et sciences",
      "Perfectionnement linguistique bilingue",
      "Initiation aux méthodes de travail canadiennes",
      "Orientation et conseil pédagogique personnalisé",
    ],
    cover: coverElementaire,
  },
  secondaire: {
    title: "Secondaire / DÉSO",
    subtitle: "Le Diplôme d'Études Secondaires de l'Ontario",
    badge: "9e — 12e année",
    description: "Le programme phare de l'ECIN : obtenez le diplôme officiel de l'Ontario (DÉSO), reconnu par toutes les universités canadiennes, sans quitter le Cameroun.",
    features: [
      "30 crédits : 18 obligatoires + 12 optionnels",
      "Plateforme virtuelle inspectée par le ministère de l'Ontario",
      "Même diplôme qu'un élève scolarisé à Toronto",
      "40 heures de service communautaire",
      "Réussite du TPCL (test de compétence linguistique)",
      "Admission directe dans les universités partenaires",
    ],
    cover: coverSecondaire,
  },
};

const Cycles = () => {
  const { cycle } = useParams();
  const data = cyclesData[cycle || "primaire"] || cyclesData.primaire;

  return (
    <PageLayout>
      <section className="relative h-48 md:h-64 overflow-hidden">
        <img src={data.cover} alt={data.title} loading="eager" className="w-full h-full object-cover" />
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
              href={`https://wa.me/16476926009?text=Bonjour%2C%20je%20souhaite%20en%20savoir%20plus%20sur%20le%20cycle%20${cycle}.`}
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

export default Cycles;
