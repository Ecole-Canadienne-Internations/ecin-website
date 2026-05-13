import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { openInscription } from "@/lib/inscription";
import ArticleModal, { type Article } from "@/components/ArticleModal";
import coverPrimaire from "@/assets/cover-primaire.png";
import coverPrepaCanada from "@/assets/cover-prepa-canada.png";
import coverIta from "@/assets/cover-ita.png";

const fallbackFeatured: Article = {
  date: "5 Fév 2026",
  title: "La vie au campus ECIN : immersion totale",
  excerpt: "Découvrez le quotidien de nos étudiants dans un environnement bilingue et multiculturel au cœur de Yaoundé.",
  tag: "Campus",
  image: coverPrimaire,
};

const fallbackArticles: Article[] = [
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
  const [active, setActive] = useState<Article | null>(null);

  const { data: dbArticles } = useQuery({
    queryKey: ["blog-landing"],
    queryFn: async () => {
      const { data } = await supabase
        .from("blog_articles")
        .select("*")
        .eq("is_published", true)
        .or(`published_at.is.null,published_at.lte.${new Date().toISOString()}`)
        .order("created_at", { ascending: false })
        .limit(3);
      return data || [];
    },
  });

  const mappedDb: Article[] = (dbArticles || []).map((a: any) => ({
    id: a.id,
    date: new Date(a.published_at || a.created_at || "").toLocaleDateString("fr-FR", { day: "numeric", month: "short", year: "numeric" }),
    title: a.title,
    excerpt: a.excerpt || "",
    content: a.content || "",
    tag: a.tag || "Actualité",
    image: a.image_url || coverPrimaire,
  }));

  const combined = [...mappedDb, fallbackFeatured, ...fallbackArticles];
  const featured = combined[0];
  const articles = combined.slice(1, 3);

  const handleReserve = (e: React.MouseEvent, a: Article) => {
    e.stopPropagation();
    openInscription({ flow: "general", context: `Réservation: ${a.title}` });
  };

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
            onClick={() => setActive(featured)}
            className="lg:col-span-3 group bg-card rounded-xl border border-border overflow-hidden hover:shadow-lg transition-shadow flex flex-col cursor-pointer"
          >
            <div className="aspect-video w-full bg-secondary overflow-hidden">
              <img src={featured.image} alt={featured.title} loading="lazy" className="w-full h-full object-contain" />
            </div>
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
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <span className="text-primary text-sm font-semibold hover:underline">Lire l'article →</span>
                <button
                  type="button"
                  onClick={(e) => handleReserve(e, featured)}
                  className="ml-auto inline-flex items-center justify-center rounded-full bg-primary px-4 py-2 text-xs font-bold text-primary-foreground hover:opacity-90"
                >
                  Réserver
                </button>
              </div>
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
                onClick={() => setActive(a)}
                className="group bg-card rounded-xl border border-border overflow-hidden hover:shadow-lg transition-shadow flex-1 cursor-pointer"
              >
                <div className="aspect-video w-full bg-secondary overflow-hidden">
                  <img src={a.image} alt={a.title} loading="lazy" className="w-full h-full object-contain" />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xs font-bold text-primary bg-accent px-2 py-0.5 rounded">{a.tag}</span>
                    <span className="text-xs text-muted-foreground">{a.date}</span>
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">{a.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">{a.excerpt}</p>
                  <button
                    type="button"
                    onClick={(e) => handleReserve(e, a)}
                    className="inline-flex items-center justify-center rounded-full bg-primary px-4 py-2 text-xs font-bold text-primary-foreground hover:opacity-90"
                  >
                    Réserver
                  </button>
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

      <ArticleModal article={active} onClose={() => setActive(null)} />
    </section>
  );
};

export default BlogSection;
