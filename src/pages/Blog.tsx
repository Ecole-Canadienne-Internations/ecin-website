import { useState } from "react";
import PageLayout from "@/components/PageLayout";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { openInscription } from "@/lib/inscription";
import ArticleModal, { type Article } from "@/components/ArticleModal";

const Blog = () => {
  const [active, setActive] = useState<Article | null>(null);

  const { data: articles, isLoading } = useQuery({
    queryKey: ["blog-all"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blog_articles")
        .select("*")
        .eq("is_published", true)
        .or(`published_at.is.null,published_at.lte.${new Date().toISOString()}`)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data || [];
    },
  });

  const handleReserve = (e: React.MouseEvent, a: Article) => {
    e.stopPropagation();
    openInscription({ flow: "general", context: `Réservation: ${a.title}` });
  };

  return (
    <PageLayout>
      <section className="py-16 md:py-24 bg-background">
        <div className="container max-w-5xl">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-3xl md:text-5xl font-extrabold text-foreground mb-4">Actualités & Blog</h1>
            <p className="text-muted-foreground text-lg mb-12">Tous les articles, événements et nouvelles de l'ECIN.</p>
          </motion.div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-card border border-border rounded-xl p-6 animate-pulse h-48" />
              ))}
            </div>
          ) : articles && articles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {articles.map((article: any) => {
                const a: Article = {
                  id: article.id,
                  title: article.title,
                  date: new Date(article.published_at || article.created_at || "").toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" }),
                  tag: article.tag || "Actualité",
                  excerpt: article.excerpt || "",
                  content: article.content || "",
                  image: article.image_url || undefined,
                };
                return (
                  <motion.article
                    key={article.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    onClick={() => setActive(a)}
                    className="group bg-card rounded-xl border border-border overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                  >
                    {a.image && (
                      <div className="aspect-video w-full bg-secondary">
                        <img src={a.image} alt={a.title} loading="lazy" className="w-full h-full object-contain" />
                      </div>
                    )}
                    <div className="p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-xs font-bold text-primary bg-accent px-2.5 py-1 rounded">{a.tag}</span>
                        <span className="text-xs text-muted-foreground">{a.date}</span>
                      </div>
                      <h2 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">{a.title}</h2>
                      {a.excerpt && <p className="text-sm text-muted-foreground leading-relaxed mb-4">{a.excerpt}</p>}
                      <button
                        type="button"
                        onClick={(e) => handleReserve(e, a)}
                        className="inline-flex items-center justify-center rounded-full bg-primary px-4 py-2 text-xs font-bold text-primary-foreground hover:opacity-90"
                      >
                        Réserver
                      </button>
                    </div>
                  </motion.article>
                );
              })}
            </div>
          ) : (
            <p className="text-muted-foreground text-center py-16">Aucun article publié pour le moment. Restez connectés !</p>
          )}
        </div>
      </section>
      <ArticleModal article={active} onClose={() => setActive(null)} />
    </PageLayout>
  );
};

export default Blog;
