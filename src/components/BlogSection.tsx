import { motion } from "framer-motion";
import blogIta from "@/assets/blog-ita.png";
import blogHautCommissaire from "@/assets/blog-haut-commissaire.png";
import alumniCatalyst from "@/assets/alumni-catalyst.png";

const featured = {
  date: "5 Fév 2026",
  title: "La vie au campus ECIN : immersion totale",
  excerpt: "Découvrez le quotidien de nos étudiants dans un environnement bilingue et multiculturel au cœur de Yaoundé. Un cadre d'apprentissage unique qui prépare aux standards internationaux.",
  tag: "Campus",
  image: alumniCatalyst,
};

const articles = [
  {
    date: "18 Jan 2026",
    title: "Rencontre avec la Haute Commissaire du Canada au Cameroun",
    excerpt: "Un moment historique pour l'ECIN, symbole de la reconnaissance de notre engagement éducatif.",
    tag: "Événement",
    image: blogHautCommissaire,
  },
  {
    date: "2 Jan 2026",
    title: "Programme ITA : la demande croissante en compétences numériques",
    excerpt: "Importance stratégique des certifications informatiques et opportunités professionnelles pour nos étudiants.",
    tag: "Académique",
    image: blogIta,
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
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Featured article */}
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-3 group bg-card rounded-xl border border-border overflow-hidden hover:shadow-lg transition-shadow flex flex-col"
          >
            <img src={featured.image} alt={featured.title} className="w-full h-56 md:h-72 object-cover" />
            <div className="p-8 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-xs font-bold text-primary bg-accent px-2.5 py-1 rounded">{featured.tag}</span>
                  <span className="text-xs text-muted-foreground">{featured.date}</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors leading-tight">
                  {featured.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed text-base">{featured.excerpt}</p>
              </div>
              <span className="text-primary text-sm font-semibold mt-6 cursor-pointer hover:underline inline-block">Lire l'article →</span>
            </div>
          </motion.article>

          {/* Sidebar articles */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            {articles.map((a, i) => (
              <motion.article
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group bg-card rounded-xl border border-border overflow-hidden hover:shadow-lg transition-shadow flex-1"
              >
                <img src={a.image} alt={a.title} className="w-full h-36 object-cover" />
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
      </div>
    </section>
  );
};

export default BlogSection;
