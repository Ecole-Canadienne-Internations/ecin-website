import PageLayout from "@/components/PageLayout";
import { motion } from "framer-motion";
import directorFull from "@/assets/director-full.png";

const EcinEnBref = () => {
  return (
    <PageLayout>
      <section className="py-16 md:py-24 bg-background">
        <div className="container max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-block bg-accent text-accent-foreground text-xs font-bold px-4 py-1.5 rounded-full mb-6 uppercase tracking-wide">
              ECIN en bref
            </span>
            <h1 className="text-3xl md:text-5xl font-extrabold text-foreground mb-8">
              L'École Canadienne Inter-Nations
            </h1>

            <div className="prose prose-lg max-w-none text-foreground/80 leading-relaxed space-y-6 mb-16">
              <p>
                L'École Canadienne Inter-Nations (ECIN) est un établissement du système éducatif de la province de l'Ontario, Canada. 
                Nous sommes une école privée disposant d'une autorisation (Numéro d'identification: <strong className="text-primary">BSID #882009</strong>) du ministère de l'éducation de la province de l'Ontario.
              </p>
              <p>
                L'école a l'autorité d'octroyer des crédits pour la délivrance du Diplôme d'Études Secondaires de l'Ontario (DESO). 
                Grâce à la flexibilité de notre programme virtuel et présentiel, nous offrons aux élèves camerounais un accès direct au système éducatif canadien sans quitter le Cameroun.
              </p>
              <p>
                Notre mission est de fournir une éducation de qualité internationale, en combinant l'excellence académique ontarienne avec une compréhension profonde des réalités locales. Chaque élève bénéficie d'un accompagnement personnalisé pour réaliser son plein potentiel.
              </p>
            </div>
          </motion.div>

          {/* Director Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-2xl md:text-3xl font-extrabold text-foreground mb-8">Mot du Directeur Général</h2>

            <div className="flex flex-col md:flex-row gap-8 items-start">
              <img
                src={directorFull}
                alt="Directeur Général ECIN"
                className="w-full md:w-72 rounded-xl object-cover shadow-lg"
              />
              <div className="flex-1 space-y-5 text-foreground/80 leading-relaxed">
                <p>
                  « Chaque parent souhaite ce qu'il y a de mieux pour son enfant. C'est cette conviction profonde qui a inspiré la création de l'École Canadienne Inter-Nations.
                </p>
                <p>
                  C'est avec un grand plaisir que je vous souhaite la bienvenue au sein de notre institution. Notre école offre un cadre d'apprentissage unique qui allie la rigueur du système éducatif ontarien à l'ouverture sur le monde.
                </p>
                <p>
                  Nous croyons fermement que chaque élève possède un potentiel exceptionnel. Notre rôle est de créer l'environnement propice à l'épanouissement de ce potentiel, à travers un enseignement de qualité, un encadrement personnalisé et des opportunités concrètes d'accès aux meilleures universités du Canada et du monde.
                </p>
                <p>
                  Faciliter l'accès de vos enfants aux universités canadiennes, c'est notre raison d'être. Ensemble, aidons chaque élève à réaliser son plein potentiel. »
                </p>
                <p className="font-bold text-foreground pt-2">
                  — Directeur Général, École Canadienne Inter-Nations
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </PageLayout>
  );
};

export default EcinEnBref;
