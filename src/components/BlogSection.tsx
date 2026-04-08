import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import coverPrimaire from "@/assets/cover-primaire.png";
import coverPrepaCanada from "@/assets/cover-prepa-canada.png";
import coverIta from "@/assets/cover-ita.png";

const fallbackFeatured = {
  date: "5 Fév 2026",
  title: "La vie au campus ECIN : immersion totale",
  excerpt: "Découvrez le quotidien de nos étudiants dans un environnement bilingue et multiculturel au cœur de Yaoundé.",
  tag: "Campus",
  image: coverPrimaire,
};

const fallbackArticles = [
  {
    date: "18 Jan 2026",
    title: "Rencontre avec la Haute Commissaire du Canada au Cameroun",
    excerpt: "Un moment historique pour l'ECIN, symbole de la reconnaissance de notre engagement éducatif.",
    tag: "Événement",
    image: coverPrepaCanada,
  },
  {
    date: "2 Jan 2026",
    title: "Programme ITA : la demande croissante en compétences numériques",
    excerpt: "Importance stratégique des certifications informatiques et opportunités professionnelles.",
    tag: "Académique",
    image: coverIta,
  },
];

const BlogSection = () => {
  const { data: dbArticles } = useQuery({
    queryKey: ["blog-landing"],
    queryFn: async () => {
      const { data } = await supabase
        .from("blog_articles")
        .select("*")
        .eq("is_published", true)
        .order("created_at", { ascending: false })
        .limit(3);
      return data || [];
    },
  });

  const hasDbArticles = dbArticles && dbArticles.length > 0;

  const featured = hasDbArticles
    ? {
        date: new Date(dbArticles[0].published_at || dbArticles[0].created_at || "").toLocaleDateString("fr-FR", { day: "numeric", month: "short", year: "numeric" }),
        title: dbArticles[0].title,
        excerpt: dbArticles[0].excerpt || "",
        tag: dbArticles[0].tag || "Actualité",
        image: dbArticles[0].image_url || coverPrimaire,
      }
    : fallbackFeatured;

  const articles = hasDbArticles
    ? dbArticles.slice(1, 3).map((a) => ({
        date: new Date(a.published_at || a.created_at || "").toLocaleDateString("fr-FR", { day: "numeric", month: "short", year: "numeric" }),
        title: a.title,
        excerpt: a.excerpt || "",
        tag: a.tag || "Actualité",
        image: a.image_url || coverPrepaCanada,
      }))
    : fallbackArticles;

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
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-3 group bg-card rounded-xl border border-border overflow-hidden hover:shadow-lg transition-shadow flex flex-col"
          >
            <img src={featured.image} alt={featured.title} loading="lazy" className="w-full h-56 md:h-72 object-cover" />
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
                <img src={a.image} alt={a.title} loading="lazy" className="w-full h-36 object-cover" />
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

        <div className="text-center mt-10">
          <Link
            to="/blog"
            className="inline-flex items-center justify-center border-2 border-primary text-primary px-7 py-3 rounded-full text-sm font-bold hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            Tout voir →
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
