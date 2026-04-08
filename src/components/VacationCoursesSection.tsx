import { motion } from "framer-motion";
import { Bot, Monitor, BookOpen } from "lucide-react";

const courses = [
  { icon: <Bot className="w-7 h-7 text-primary" />, title: "Robotique", desc: "Initiation à la robotique et à la programmation pour les jeunes esprits curieux." },
  { icon: <Monitor className="w-7 h-7 text-primary" />, title: "Digital", desc: "Compétences numériques, création de contenu et outils digitaux modernes." },
  { icon: <BookOpen className="w-7 h-7 text-primary" />, title: "Langues", desc: "Cours intensifs d'anglais et de français avec certifications." },
];

const VacationCoursesSection = () => {
  return (
    <section className="py-16 md:py-24 bg-primary/5">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block bg-primary text-primary-foreground text-xs font-bold px-4 py-1.5 rounded-full mb-4 uppercase tracking-wide">
            🎓 Cours de Vacances
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-3">
            Cours de vacances spécialisés
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Profitez des vacances pour développer de nouvelles compétences en robotique, digital et langues.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {courses.map((c, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-background border border-border rounded-xl p-6 text-center hover:shadow-lg transition-shadow"
            >
              <div className="flex justify-center mb-4">{c.icon}</div>
              <h3 className="text-lg font-bold text-foreground mb-2">{c.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{c.desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-10">
          <a
            href="https://wa.me/16476926009?text=Bonjour%2C%20je%20souhaite%20inscrire%20mon%20enfant%20aux%20cours%20de%20vacances."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center bg-primary text-primary-foreground px-7 py-3.5 rounded-full text-sm font-bold hover:opacity-90 transition-opacity"
          >
            Inscrire mon enfant
          </a>
        </div>
      </div>
    </section>
  );
};

export default VacationCoursesSection;
