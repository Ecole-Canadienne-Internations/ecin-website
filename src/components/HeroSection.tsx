import { motion } from "framer-motion";
import heroStudents from "@/assets/hero-students.png";

const HeroSection = () => {
  return (
    <section id="accueil" className="relative pt-20 md:pt-20 min-h-[85vh] flex items-center overflow-hidden bg-foreground">
      {/* Background image — full, unscaled, visible */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroStudents}
          alt="Étudiants ECIN"
          className="w-full h-full object-contain object-center"
          style={{ objectPosition: "center" }}
        />
        <div className="absolute inset-0 bg-foreground/60" />
      </div>

      <div className="container relative z-10 py-16 md:py-24">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-block bg-primary text-primary-foreground text-xs font-bold px-4 py-1.5 rounded-full mb-6 tracking-wide uppercase">
              BDICE 882009 — Ontario, Canada
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-[3.6rem] leading-[1.1] font-extrabold text-background mb-6">
              Obtenez votre Diplôme Canadien{" "}
              <span className="text-primary">(DESO)</span> sans quitter le Cameroun.
            </h1>

            <p className="text-lg md:text-xl text-background/80 max-w-lg mb-8 leading-relaxed">
              Un cursus d'excellence de l'Ontario à Yaoundé pour ouvrir les portes des meilleures universités mondiales.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="https://wa.me/237681263743?text=Bonjour%2C%20je%20souhaite%20en%20savoir%20plus."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center border-2 border-background/30 text-background px-7 py-3.5 rounded-full text-sm font-bold hover:bg-background/10 transition-colors"
              >
                Nous contacter
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
