import { motion } from "framer-motion";

const articles = [
  {
    date: "5 Fév 2026",
    title: "La vie au campus ECIN : immersion totale",
    excerpt: "Découvrez le quotidien de nos étudiants dans un environnement bilingue et multiculturel au cœur de Yaoundé.",
    tag: "Campus",
  },
  {
    date: "18 Jan 2026",
    title: "5 conseils pour réussir son expatriation au Canada",
    excerpt: "De la préparation des documents au choc culturel, nos anciens élèves partagent leurs meilleures astuces.",
    tag: "Conseils",
  },
  {
    date: "2 Jan 2026",
    title: "DESO vs Baccalauréat : quelles différences ?",
    excerpt: "Comprendre les atouts du Diplôme d'Études Secondaires de l'Ontario face au système francophone traditionnel.",
    tag: "Académique",
  },
];

const BlogSection = () => {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 gap-4">
          <div>
            <span className="inline-block bg-accent text-accent-foreground text-xs font-bold px-3 py-1 rounded-full mb-3 uppercase tracking-wide">
              Blog
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground">Articles & Actualités</h2>
          </div>
          <span className="text-primary text-sm font-semibold cursor-pointer hover:underline">Voir tous les articles →</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {articles.map((a, i) => (
            <motion.article
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group bg-card rounded-xl border border-border overflow-hidden hover:shadow-lg transition-shadow"
            >
              {/* Color accent bar */}
              <div className="h-1.5 bg-primary w-full" />
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xs font-bold text-primary bg-accent px-2 py-0.5 rounded">{a.tag}</span>
                  <span className="text-xs text-muted-foreground">{a.date}</span>
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">{a.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{a.excerpt}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
