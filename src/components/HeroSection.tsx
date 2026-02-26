import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import heroImg from "@/assets/hero-students.png";

const HeroSection = () => {
  return (
    <section id="accueil" className="pt-24 md:pt-32 pb-16 md:pb-24">
      <div className="container grid md:grid-cols-2 gap-10 items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h1 className="text-4xl md:text-5xl lg:text-[3.4rem] leading-tight font-extrabold text-foreground">
            Obtenez votre Diplôme Canadien{" "}
            <span className="text-primary">(DESO)</span> sans quitter le Cameroun.
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-lg">
            Un cursus d'excellence de l'Ontario à Yaoundé pour ouvrir les portes des meilleures universités mondiales.
          </p>
          <a
            href="#inscription"
            className="mt-8 inline-flex items-center gap-2 bg-primary text-primary-foreground px-7 py-3.5 rounded-lg text-base font-semibold hover:opacity-90 transition-opacity"
          >
            Démarrer mon inscription
            <ArrowRight className="w-5 h-5" />
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="flex justify-center"
        >
          <img
            src={heroImg}
            alt="Étudiants tenant une affiche Study in Canada"
            className="w-full max-w-md md:max-w-lg object-contain"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
