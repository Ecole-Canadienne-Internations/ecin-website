import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const articles = [
  {
    date: "5 Fév 2026",
    title: "La vie au campus ECIN : immersion totale",
    excerpt: "Découvrez le quotidien de nos étudiants dans un environnement bilingue et multiculturel au cœur de Yaoundé.",
  },
  {
    date: "18 Jan 2026",
    title: "5 conseils pour réussir son expatriation au Canada",
    excerpt: "De la préparation des documents au choc culturel, nos anciens élèves partagent leurs meilleures astuces.",
  },
  {
    date: "2 Jan 2026",
    title: "DESO vs Baccalauréat : quelles différences ?",
    excerpt: "Comprendre les atouts du Diplôme d'Études Secondaires de l'Ontario face au système francophone traditionnel.",
  },
];

const BlogSection = () => {
  return (
    <section id="blog" className="py-16 md:py-24">
      <div className="container">
        <div className="text-center mb-12">
          <span className="inline-block bg-accent text-accent-foreground text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
            Blog
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground">Articles & Actualités</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {articles.map((a, i) => (
            <motion.article
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-card rounded-xl border border-border p-6 hover:shadow-lg transition-shadow"
            >
              <p className="text-primary text-sm font-semibold mb-2">{a.date}</p>
              <h3 className="text-lg font-bold text-foreground mb-2">{a.title}</h3>
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{a.excerpt}</p>
              <a href="#" className="inline-flex items-center gap-1 text-primary text-sm font-semibold hover:gap-2 transition-all">
                Lire la suite <ArrowRight className="w-4 h-4" />
              </a>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
