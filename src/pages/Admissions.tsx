import PageLayout from "@/components/PageLayout";
import { motion } from "framer-motion";
import { Download } from "lucide-react";
import coverSecondaire from "@/assets/cover-secondaire.png";

const conditions = [
  "Bulletin scolaire des 2 dernières années",
  "Copie de l'acte de naissance",
  "Copie du passeport (si disponible)",
  "Photo d'identité récente",
  "Formulaire d'inscription rempli",
  "Frais de dossier",
];

const Admissions = () => {
  return (
    <PageLayout>
      <section className="relative h-48 md:h-64 overflow-hidden">
        <img src={coverSecondaire} alt="Admissions ECIN" loading="eager" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-foreground/40" />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-3xl md:text-5xl font-extrabold text-background text-center">Admissions</h1>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-background">
        <div className="container max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-block bg-accent text-accent-foreground text-xs font-bold px-4 py-1.5 rounded-full mb-6 uppercase tracking-wide">
              Inscription
            </span>
            <p className="text-xl text-muted-foreground mb-8">Rejoignez l'École Canadienne Inter-Nations</p>
            <p className="text-foreground/80 leading-relaxed text-lg mb-10">
              L'admission à l'ECIN est ouverte toute l'année. Suivez les étapes ci-dessous pour constituer votre dossier et démarrer votre parcours vers le Canada.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
            <h2 className="text-2xl font-bold text-foreground mb-6">Documents requis</h2>
            <div className="space-y-3 mb-12">
              {conditions.map((c, i) => (
                <div key={i} className="flex items-start gap-3 bg-secondary rounded-lg px-5 py-4">
                  <span className="w-2 h-2 rounded-full bg-primary flex-shrink-0 mt-2" />
                  <span className="text-foreground text-sm font-medium">{c}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }} className="flex flex-col sm:flex-row gap-4">
            <a
              href="https://wa.me/237681263743?text=Bonjour%2C%20je%20souhaite%20démarrer%20mon%20inscription."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center bg-primary text-primary-foreground px-7 py-3.5 rounded-full text-sm font-bold hover:opacity-90 transition-opacity"
            >
              Démarrer mon inscription
            </a>
            <a
              href="https://wa.me/237681263743?text=Bonjour%2C%20je%20souhaite%20recevoir%20le%20guide%20d'admission."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 border-2 border-border text-foreground px-7 py-3.5 rounded-full text-sm font-bold hover:bg-secondary transition-colors"
            >
              <Download className="w-4 h-4" />
              Télécharger le Guide
            </a>
          </motion.div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Admissions;
