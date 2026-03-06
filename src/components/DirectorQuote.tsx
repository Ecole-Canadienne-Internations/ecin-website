import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import directorPhoto from "@/assets/director-photo.png";

const DirectorQuote = () => {
  return (
    <section className="py-20 md:py-28">
      <div className="container max-w-3xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}>
          
          <span className="inline-block bg-accent text-accent-foreground text-sm font-semibold px-4 py-1.5 rounded-full mb-8">
            Le mot du Directeur
          </span>

          <Quote className="w-10 h-10 text-primary/30 mx-auto mb-6" />

          <blockquote className="text-lg md:text-xl italic text-foreground/80 leading-relaxed">
            « Chaque parent souhaite ce qu'il y a de mieux pour son enfant... Faciliter
            l'accès de vos élèves aux universités canadiennes, c'est notre raison d'être. »
          </blockquote>

          <div className="mt-8 flex flex-col items-center gap-2">
            <img
              src={directorPhoto}
              alt="Directeur Général ECIN"
              className="w-20 h-20 rounded-full object-cover border-2 border-primary" />
            
            <p className="font-bold text-foreground">Directeur Général</p>
            <p className="text-sm text-muted-foreground">École Canadienne Inter-Nations</p>
          </div>
        </motion.div>
      </div>
    </section>);

};

export default DirectorQuote;