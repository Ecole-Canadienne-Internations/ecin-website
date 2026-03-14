import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import heroEcin from "@/assets/hero-ecin.png";
import gallery1 from "@/assets/gallery-1.jpeg";
import slideClass1 from "@/assets/slideshow-classroom-1.png";
import slideClass2 from "@/assets/slideshow-classroom-2.png";

const slides = [heroEcin, gallery1, slideClass1, slideClass2];

const HeroSection = () => {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
  }, []);

  useEffect(() => {
    const id = setInterval(next, 5000);
    return () => clearInterval(id);
  }, [next]);

  return (
    <section id="accueil" className="relative pt-[calc(2.25rem+4rem)] md:pt-[calc(2.25rem+5rem)] min-h-[85vh] flex items-center overflow-hidden bg-foreground">
      {/* Slideshow background */}
      <AnimatePresence mode="wait">
        <motion.img
          key={current}
          src={slides[current]}
          alt="Campus ECIN"
          loading={current === 0 ? "eager" : "lazy"}
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2 }}
        />
      </AnimatePresence>
      <div className="absolute inset-0 bg-foreground/60" />

      <div className="container relative z-10 py-16 md:py-24">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-block bg-primary text-primary-foreground text-xs font-bold px-4 py-1.5 rounded-full mb-6 tracking-wide uppercase">
              BSID 882009 — Ontario, Canada
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
                href="https://wa.me/16476926009?text=Bonjour%2C%20je%20souhaite%20en%20savoir%20plus."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center bg-primary text-primary-foreground px-7 py-3.5 rounded-full text-sm font-bold hover:opacity-90 transition-opacity"
              >
                S'inscrire maintenant
              </a>
              <a
                href="https://wa.me/16476926009?text=Bonjour%2C%20je%20souhaite%20en%20savoir%20plus."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center border-2 border-background/40 text-background px-7 py-3.5 rounded-full text-sm font-bold hover:bg-background/10 transition-colors"
              >
                Nous contacter
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-2.5 h-2.5 rounded-full transition-all ${i === current ? "bg-primary w-7" : "bg-background/50"}`}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSection;
